import { AlertConfig, AlertPriority } from '@/types/alerts';
import { MetricsOutput } from '@/types/metrics';

export const ALERT_CONFIGS: AlertConfig[] = [
  {
    id: 'no_face',
    message: 'No face detected',
    priority: AlertPriority.CRITICAL,
    cooldownMs: 10000,
    condition: (m: MetricsOutput) => !m.face_detected,
  },
  {
    id: 'eye_closure_perclos',
    message: 'Your eyes are closing frequently',
    priority: AlertPriority.HIGH,
    cooldownMs: 15000,
    condition: (m: MetricsOutput) => !!m.eye_closure?.perclos_alert,
  },
  {
    id: 'eye_closure',
    message: `Keep your eyes open`,
    priority: AlertPriority.HIGH,
    cooldownMs: 15000,
    condition: (m: MetricsOutput) => !!m.eye_closure?.eye_closed_sustained,
  },
  {
    id: 'yawn',
    message: 'Sleepy, huh?',
    priority: AlertPriority.LOW,
    cooldownMs: 20000,
    condition: (m: MetricsOutput) => !!m.yawn?.yawning,
  },
  {
    id: 'yawn_count',
    message: 'You yawned too much, maybe you need a break?',
    priority: AlertPriority.LOW,
    cooldownMs: 20000,
    condition: (m: MetricsOutput) => {
      const yawnCount = m.yawn?.yawn_count;

      return Number.isInteger(yawnCount) && yawnCount > 0 && yawnCount % 3 === 0;
    },
  },
  {
    id: 'head_pose',
    message: 'Keep your head facing forward',
    priority: AlertPriority.MEDIUM,
    cooldownMs: 12000,
    condition: (m: MetricsOutput) =>
      !!m.head_pose?.yaw_alert || !!m.head_pose?.pitch_alert || !!m.head_pose?.roll_alert,
  },
  {
    id: 'gaze_off_road',
    message: 'Keep your eyes on the road',
    priority: AlertPriority.MEDIUM,
    cooldownMs: 10000,
    condition: (m: MetricsOutput) => !!m.gaze?.gaze_alert,
  },
  {
    id: 'phone_usage',
    message: 'Put down your phone',
    priority: AlertPriority.CRITICAL,
    cooldownMs: 10000,
    condition: (m: MetricsOutput) => !!m.phone_usage?.phone_usage,
  },
];
