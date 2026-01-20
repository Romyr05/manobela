import { MetricId } from '@/types/metrics';
import { AlertCircle, Eye, LucideIcon, Navigation, Smartphone, User } from 'lucide-react-native';

export interface MetricConfig {
  icon: LucideIcon;
  label: string;
  getWarningState: (data: any) => boolean;
  getFillRatio?: (data: any) => number | undefined;
}

/** Display configuration for each metric */
export const METRIC_DISPLAY_CONFIGS: Record<MetricId, MetricConfig> = {
  eye_closure: {
    icon: Eye,
    label: 'Eyes',
    getWarningState: (data) => data?.ear_alert === true,
    getFillRatio: (data) =>
      data?.perclos != null ? Math.max(0, Math.min(1, data.perclos)) : undefined,
  },
  yawn: {
    icon: AlertCircle,
    label: 'Yawn',
    getWarningState: (data) => data?.yawning === true,
    getFillRatio: (data) =>
      data?.yawn_count != null ? Math.max(0, Math.min(1, data.yawn_count / 5)) : undefined,
  },
  head_pose: {
    icon: User,
    label: 'Head',
    getWarningState: (data) =>
      Boolean(data?.head_pose_alert || data?.yaw_alert || data?.pitch_alert || data?.roll_alert),
    getFillRatio: (data) => {
      if (!data) return undefined;
      const avg = (data.yaw_sustained + data.pitch_sustained + data.roll_sustained) / 3;
      return Math.max(0, Math.min(1, avg / 30));
    },
  },
  gaze: {
    icon: Navigation,
    label: 'Gaze',
    getWarningState: (data) => data?.gaze_on_road === false,
  },
  phone_usage: {
    icon: Smartphone,
    label: 'Phone',
    getWarningState: (data) => Boolean(data?.phone_usage && data.phone_usage > 0),
    getFillRatio: (data) =>
      data?.phone_detected_frames != null
        ? Math.max(0, Math.min(1, data.phone_detected_frames / 50))
        : undefined,
  },
} as const;
