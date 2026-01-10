import { useEffect, useState } from 'react';
import { mediaDevices, MediaStream } from 'react-native-webrtc';

interface UseCameraReturn {
  localStream: MediaStream | null;
}

export function useCamera(): UseCameraReturn {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let active = true;

    async function initCamera() {
      try {
        const stream = await mediaDevices.getUserMedia({
          audio: false, // no audio for now
          video: { facingMode: 'user' }, // front camera
        });

        if (active) setLocalStream(stream);
      } catch (err) {
        console.error('Failed to get camera', err);
      }
    }

    initCamera();

    return () => {
      active = false;
      localStream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return { localStream };
}
