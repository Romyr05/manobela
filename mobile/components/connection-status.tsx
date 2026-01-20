import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SessionState } from '@/hooks/useMonitoringSession';

interface ConnectionStatusProps {
  sessionState: SessionState;
  clientId: string | null;
  error: string | null;
}

export const ConnectionStatus = ({ sessionState, clientId, error }: ConnectionStatusProps) => {
  const [showFullId, setShowFullId] = useState(false);

  const statusColor = (() => {
    if (sessionState === 'active') return 'text-green-600';
    if (sessionState === 'starting' || sessionState === 'stopping') return 'text-yellow-600';
    if (error) return 'text-red-600';
    return 'text-muted-foreground';
  })();

  return (
    <>
      <View className="mb-2">
        <Text className={`text-xs ${statusColor}`}>Status: {sessionState}</Text>
        <Text className="text-xs text-muted-foreground">
          Client ID: {clientId ?? 'Not connected'}
        </Text>
        <Text className="text-xs text-muted-foreground">
          WebRTC: {connectionStatus} | Transport: {transportStatus}
        </Text>
      </View>

      {error && (
        <View className="mb-2">
          <Text className="text-xs text-destructive">{error}</Text>
        </View>
      )}
    </>
  );
};
