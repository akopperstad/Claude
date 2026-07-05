#!/usr/bin/env python3
"""Ghost-overlay generator — the human drift check.

Blends original and render at 50%. An aligned edit reads as a crisp photo
with a color-shifted house; geometry drift reads instantly as ghosting
(doubled rooflines, chimneys, window frames). This exposed a reframed
render in bucket 2 that both automated metrics missed.

Usage:
  python3 overlay.py original.jpg render.png out.jpg
"""

import sys

from PIL import Image, ImageOps

WIDTH = 1100


def overlay(original_path: str, render_path: str, out_path: str) -> None:
    a = ImageOps.exif_transpose(Image.open(original_path).convert("RGB"))
    b = ImageOps.exif_transpose(Image.open(render_path).convert("RGB"))
    h = int(a.height * WIDTH / a.width)
    a = a.resize((WIDTH, h))
    b = b.resize((WIDTH, h))
    Image.blend(a, b, 0.5).save(out_path, quality=88)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    overlay(sys.argv[1], sys.argv[2], sys.argv[3])
