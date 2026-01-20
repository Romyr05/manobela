import React, { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { ChevronRight } from 'lucide-react-native';

export type SettingRowProps = {
  icon: typeof ChevronRight;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: ReactNode;
  disabled?: boolean;
};

export function SettingRow({
  icon,
  label,
  value,
  onPress,
  rightElement,
  disabled = false,
}: SettingRowProps) {
  const Icon = icon;
  const baseClassName = 'flex-row items-center justify-between rounded-2xl px-4 py-3';

  const content = (pressed = false) => (
    <View
      className={[
        baseClassName,
        disabled ? 'bg-card opacity-50' : pressed ? 'bg-muted/40' : 'bg-card',
      ].join(' ')}
    >
      <View className="flex-row items-center">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-muted">
          <Icon className="text-foreground" size={18} />
        </View>

        <View>
          <Text className="text-base font-medium text-foreground">{label}</Text>
          {value ? <Text className="text-sm text-muted-foreground">{value}</Text> : null}
        </View>
      </View>

      <View className="flex-row items-center">
        {rightElement}
        {onPress ? (
          <ChevronRight className="ml-2 text-muted-foreground" size={18} />
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return content(false);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
