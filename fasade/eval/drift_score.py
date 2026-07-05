#!/usr/bin/env python3
"""Geometry-drift scorer for Fasade renders.

Compares the structural content (edge maps) of an original photo and a
render. Color changes barely move the score; moved walls, windows, rooflines
or invented objects do. Score is the Pearson correlation of blurred Sobel
edge maps, in [0..1] for practical purposes (identical structure ~= 1.0).

What this score IS: a relative ranking signal. Within one source photo it
reliably orders renders from most to least structure-preserving, and it
cleanly separates repaints from level 4 reimaginings (bucket 2 validation:
held demo repaints 0.77-0.85, drifted real repaints 0.29-0.55, reimagined
0.24, unrelated photos 0.11).

What it is NOT: an absolute pass/fail certificate. On real photos,
vegetation texture and contrast flips (dark house -> white house) depress
the score even when geometry holds. Certification today = overlay.py ghost
images + a human eye; automated certification needs house-region masking
(segmentation, bucket 3).

Usage:
  python3 drift_score.py original.jpg render.png [more_renders...]
"""

import sys

import numpy as np
from PIL import Image, ImageOps

WORK_WIDTH = 512
BLUR_PASSES = 3  # box-blur passes over edge maps; tolerance for ~px shifts


def load_gray(path: str) -> np.ndarray:
    im = Image.open(path).convert("L")
    im = ImageOps.exif_transpose(im)
    h = int(im.height * WORK_WIDTH / im.width)
    im = im.resize((WORK_WIDTH, h))
    return np.asarray(im, dtype=np.float64) / 255.0


def sobel_edges(gray: np.ndarray) -> np.ndarray:
    gx = np.zeros_like(gray)
    gy = np.zeros_like(gray)
    gx[:, 1:-1] = gray[:, 2:] - gray[:, :-2]
    gy[1:-1, :] = gray[2:, :] - gray[:-2, :]
    mag = np.hypot(gx, gy)
    top = np.percentile(mag, 99)
    if top > 0:
        mag = np.clip(mag / top, 0, 1)
    return mag


def box_blur(a: np.ndarray, passes: int = BLUR_PASSES) -> np.ndarray:
    for _ in range(passes):
        p = np.pad(a, 1, mode="edge")
        a = (
            p[:-2, :-2] + p[:-2, 1:-1] + p[:-2, 2:]
            + p[1:-1, :-2] + p[1:-1, 1:-1] + p[1:-1, 2:]
            + p[2:, :-2] + p[2:, 1:-1] + p[2:, 2:]
        ) / 9.0
    return a


EDGE_PERCENTILE = 90  # keep the strongest 10% of edges as "structure"


def drift_score(original_path: str, render_path: str) -> float:
    """Dice overlap of binarized edge positions.

    A repaint changes edge STRENGTH everywhere (dark-on-sky is a strong edge,
    white-on-sky a weak one), so correlating raw magnitudes punishes legitimate
    color changes. Binarizing at a per-image percentile keeps only WHERE the
    strongest structure sits — which is what geometry drift actually moves.
    """
    a = load_gray(original_path)
    b = load_gray(render_path)
    if a.shape != b.shape:  # renders may differ a few px in aspect
        b_img = Image.fromarray((b * 255).astype(np.uint8)).resize(
            (a.shape[1], a.shape[0])
        )
        b = np.asarray(b_img, dtype=np.float64) / 255.0
    ea = sobel_edges(a)
    eb = sobel_edges(b)
    ba = box_blur((ea >= np.percentile(ea, EDGE_PERCENTILE)).astype(np.float64))
    bb = box_blur((eb >= np.percentile(eb, EDGE_PERCENTILE)).astype(np.float64))
    inter = np.minimum(ba, bb).sum()
    total = ba.sum() + bb.sum()
    if total == 0:
        return 0.0
    return float(2 * inter / total)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    orig = sys.argv[1]
    for render in sys.argv[2:]:
        print(f"{drift_score(orig, render):.3f}  {render}")
