import numpy as np


def euclidean_dist(a: tuple[float, float], b: tuple[float, float]) -> float:
    """
    Compute Euclidean distance between two points.

    Args:
        a: First point as (x, y) tuple
        b: Second point as (x, y) tuple

    Returns:
        Euclidean distance between points
    """
    return float(np.linalg.norm(np.array(a) - np.array(b)))
