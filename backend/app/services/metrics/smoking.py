import math
from collections import deque
from typing import Sequence

from app.services.face_landmarks import OUTER_LIP
from app.services.metrics.base_metric import BaseMetric, MetricOutputBase
from app.services.metrics.frame_context import FrameContext
from app.services.object_detector import CIGARETTE_CLASS_ID, ObjectDetection


class SmokingMetricOutput(MetricOutputBase):
    smoking_detected: bool
    near_mouth: bool
    motion_active: bool
    actively_smoking: bool
    near_mouth_frames: int
    motion_frames: int


class SmokingMetric(BaseMetric):
    """
    Detects active smoking by combining:
      1) cigarette detection,
      2) proximity to mouth landmarks,
      3) sustained motion near the mouth (to avoid static false positives).

    Tuned for ~30 FPS. Adjust *_frames thresholds if FPS changes.
    """

    def __init__(
        self,
        conf: float = 0.3,
        near_distance: float = 0.08,
        enter_frames: int = 10,  # ~0.33s at 30 FPS
        exit_frames: int = 5,
        motion_threshold: float = 0.01,
        motion_window: int = 15,  # ~0.5s
        motion_min_frames: int = 5,
    ):
        self.conf = conf
        self.near_distance = near_distance
        self.enter_frames = enter_frames
        self.exit_frames = exit_frames
        self.motion_threshold = motion_threshold
        self.motion_window = motion_window
        self.motion_min_frames = motion_min_frames

        self._near_counter = 0
        self._far_counter = 0
        self._motion_flags: deque[bool] = deque(maxlen=motion_window)
        self._last_center: tuple[float, float] | None = None

    def update(self, context: FrameContext) -> SmokingMetricOutput:
        detections = context.object_detections or []
        landmarks = context.face_landmarks or []

        cigarette = self._best_cigarette(detections)
        mouth_center = self._mouth_center(landmarks)

        # If we lack either detection or landmarks, decay state.
        if not cigarette or not mouth_center:
            self._reset_counters()
            return {
                "smoking_detected": False,
                "near_mouth": False,
                "motion_active": False,
                "actively_smoking": False,
                "near_mouth_frames": 0,
                "motion_frames": 0,
            }

        cig_center = self._bbox_center(cigarette.bbox)
        distance = self._l2(cig_center, mouth_center)

        near = distance < self.near_distance
        if near:
            self._near_counter += 1
            self._far_counter = 0
        else:
            self._far_counter += 1
            if self._far_counter >= self.exit_frames:
                self._near_counter = 0

        # Motion tracking
        motion = False
        if self._last_center is not None:
            velocity = self._l2(cig_center, self._last_center)
            motion = velocity > self.motion_threshold
        self._last_center = cig_center

        self._motion_flags.append(motion)
        motion_frames = sum(self._motion_flags)
        motion_active = motion_frames >= self.motion_min_frames

        near_mouth_state = self._near_counter >= self.enter_frames
        actively_smoking = near_mouth_state and motion_active

        return {
            "smoking_detected": True,
            "near_mouth": near_mouth_state,
            "motion_active": motion_active,
            "actively_smoking": actively_smoking,
            "near_mouth_frames": self._near_counter,
            "motion_frames": motion_frames,
        }

    def reset(self):
        self._reset_counters()

    def _reset_counters(self):
        self._near_counter = 0
        self._far_counter = 0
        self._motion_flags.clear()
        self._last_center = None

    @staticmethod
    def _best_cigarette(detections: Sequence[ObjectDetection]) -> ObjectDetection | None:
        candidates = [d for d in detections if d.class_id == CIGARETTE_CLASS_ID]
        if not candidates:
            return None
        return max(candidates, key=lambda d: d.conf)

    @staticmethod
    def _mouth_center(landmarks: Sequence[tuple[float, float]]) -> tuple[float, float] | None:
        if not landmarks:
            return None
        xs = []
        ys = []
        for idx in OUTER_LIP:
            if idx < len(landmarks):
                x, y = landmarks[idx]
                xs.append(x)
                ys.append(y)
        if not xs or not ys:
            return None
        return (sum(xs) / len(xs), sum(ys) / len(ys))

    @staticmethod
    def _bbox_center(bbox: Sequence[float]) -> tuple[float, float]:
        x1, y1, x2, y2 = bbox
        return ((x1 + x2) / 2, (y1 + y2) / 2)

    @staticmethod
    def _l2(p1: tuple[float, float], p2: tuple[float, float]) -> float:
        return math.hypot(p1[0] - p2[0], p1[1] - p2[1])

