import {
  ICECandidateMessage,
  MessageType,
  SDPMessage,
  SignalingMessage,
  SignalingTransport,
  TransportStatus,
} from '@/types/webrtc';
import { useCallback, useRef, useState } from 'react';
import { MediaStream, RTCPeerConnection } from 'react-native-webrtc';
import { WebSocketTransport } from '@/services/signaling/web-socket-transport';

const DEFAULT_RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
  ],
};

interface UseWebRTCProps {
  url: string;
  stream: MediaStream | null;
  rtcConfig?: RTCConfiguration;
}

interface UseWebRTCReturn {
  transportStatus: TransportStatus;
  connectionStatus: RTCPeerConnectionState;
  clientId: string | null;
  error: string | null;
  startConnection: () => void;
  cleanup: () => void;
  sendMessage: (msg: SignalingMessage) => void;
  onMessage: (handler: (msg: SignalingMessage) => void) => void;
}

export const useWebRTC = ({
  url,
  stream,
  rtcConfig = DEFAULT_RTC_CONFIG,
}: UseWebRTCProps): UseWebRTCReturn => {
  const [clientId, setClientId] = useState<string | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<RTCPeerConnectionState>('new');
  const transportRef = useRef<SignalingTransport | null>(null);
  const messageHandlers = useRef<((msg: SignalingMessage) => void)[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback((msg: SignalingMessage) => {
    try {
      transportRef.current?.send(msg);
    } catch (err: any) {
      setError(err.message || 'Failed to send signaling message');
    }
  }, []);

  const onMessage = useCallback((handler: (msg: SignalingMessage) => void) => {
    messageHandlers.current.push(handler);
  }, []);

  const handleSignalingMessage = useCallback(async (msg: SignalingMessage) => {
    try {
      if (msg.type === MessageType.WELCOME) {
        setClientId(msg.client_id);
        console.log('Received client ID:', msg.client_id);
      } else if (msg.type === MessageType.ANSWER) {
        const pc = pcRef.current;
        if (!pc) {
          console.error('No peer connection available for answer');
          return;
        }

        const sdpMsg = msg as SDPMessage;
        console.log('Received answer, setting remote description');

        await pc.setRemoteDescription({
          type: sdpMsg.sdpType as RTCSdpType,
          sdp: sdpMsg.sdp,
        });

        console.log('Remote description set successfully');
      } else if (msg.type === MessageType.ICE_CANDIDATE) {
        const pc = pcRef.current;
        if (!pc) {
          console.error('No peer connection available for ICE candidate');
          return;
        }

        const iceMsg = msg as ICECandidateMessage;
        if (iceMsg.candidate) {
          await pc.addIceCandidate({
            candidate: iceMsg.candidate.candidate,
            sdpMid: iceMsg.candidate.sdpMid,
            sdpMLineIndex: iceMsg.candidate.sdpMLineIndex,
          });
          console.log('Added ICE candidate');
        }
      }
    } catch (err: any) {
      console.error('Error handling signaling message:', err);
      setError(`Signaling error: ${err.message}`);
    }

    messageHandlers.current.forEach((cb) => cb(msg));
  }, []);

  const initTransport = useCallback(async () => {
    const transport = new WebSocketTransport(url);
    transport.onMessage(handleSignalingMessage);
    transportRef.current = transport;
    await transport.connect();
    console.log('WebSocket transport connected');
    return transport;
  }, [url, handleSignalingMessage]);

  const initPeerConnection = useCallback((): RTCPeerConnection => {
    const pc = new RTCPeerConnection(rtcConfig);

    // @ts-ignore
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Generated ICE candidate:', event.candidate.candidate);
        const msg: ICECandidateMessage = {
          type: MessageType.ICE_CANDIDATE,
          candidate: {
            candidate: event.candidate.toJSON().candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          },
        };
        sendMessage(msg);
      } else {
        console.log('ICE gathering complete');
      }
    };

    // @ts-ignore
    pc.onconnectionstatechange = () => {
      console.log('Connection state changed to:', pc.connectionState);
      setConnectionStatus(pc.connectionState);

      if (pc.connectionState === 'failed') {
        setError('WebRTC connection failed');
      }
    };

    // @ts-ignore
    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState);
    };

    // @ts-ignore
    pc.onicegatheringstatechange = () => {
      console.log('ICE gathering state:', pc.iceGatheringState);
    };

    pcRef.current = pc;
    return pc;
  }, [sendMessage, rtcConfig]);

  const startConnection = useCallback(async () => {
    try {
      if (!stream) {
        setError('No media stream available');
        return;
      }

      setError('');
      setConnectionStatus('connecting');
      console.log('Starting WebRTC connection...');

      await initTransport();

      const pc = initPeerConnection();

      stream.getTracks().forEach((track) => {
        console.log(`Adding ${track.kind} track to peer connection`);
        pc.addTrack(track, stream);
      });

      console.log('Creating offer...');
      const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });

      await pc.setLocalDescription(offer);
      console.log('Local description set, sending offer...');

      const msg: SDPMessage = {
        type: MessageType.OFFER,
        sdp: offer.sdp!,
        sdpType: offer.type,
      };
      sendMessage(msg);

      console.log('Offer sent, waiting for answer...');
    } catch (err: any) {
      console.error('Connection error:', err);
      setError(`Connection error: ${err.message}`);
      setConnectionStatus('failed');
    }
  }, [stream, initPeerConnection, initTransport, sendMessage]);

  const cleanup = useCallback(() => {
    console.log('Cleaning up WebRTC connection...');

    transportRef.current?.disconnect();
    transportRef.current = null;

    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    setConnectionStatus('closed');
    setClientId(null);
    setError('');
  }, []);

  const transportStatus: TransportStatus = transportRef.current?.status ?? 'closed';

  return {
    transportStatus,
    connectionStatus,
    clientId,
    error,
    startConnection,
    cleanup,
    sendMessage,
    onMessage,
  };
};
