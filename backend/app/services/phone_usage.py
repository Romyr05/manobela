from collections import deque

from app.core.config import settings
from app.services.metrics.base_metric import BaseMetric, MetricOutputBase
from app.services.metrics.frame_context import FrameContext

PHONE_CLASS_ID = 67  # COCO


class PhoneUsageMetricOutput(MetricOutputBase):
    phone_usage: bool
    phone_usage_rate: float


class PhoneUsageMetric(BaseMetric):
    """
    Metric to detect phone usage.
    It counts the number of frames with a detected phone within a rolling window.
    """

    def __init__(self, conf=0.3, window_sec=3, threshold=0.5):
        """
        Args:
            conf: Confidence threshold for phone detection.
            window_sec: Rolling window duration in seconds.
            threshold: Phone usage rate threshold to trigger alert.
        """
        self.conf = conf
        self.window_size = max(1, int(window_sec * settings.target_fps))
        self.threshold = threshold
        self._history = deque(maxlen=self.window_size)

    def update(self, context: FrameContext) -> PhoneUsageMetricOutput:
        obj_detections = context.object_detections

        phone_detected = any(
            d.conf >= self.conf and (d.class_id == PHONE_CLASS_ID)
            for d in obj_detections or []
        )

        self._history.append(phone_detected)

        phone_usage_rate = (
            sum(self._history) / len(self._history) if self._history else 0.0
        )

        return {
            "phone_usage": phone_detected,
            "phone_usage_rate": phone_usage_rate,
        }

    def reset(self):
        self._history.clear()
