#!/usr/bin/env python3
"""Generate SynSync brand favicons/app icons from a dark tile + amber waveform.

Matches public/favicon.svg: dark gradient tile, 5 amber vertical bars forming a
resonant waveform. Amber #FFB000 on #0B0C15..#11132a. Output to public/.
"""
from PIL import Image, ImageDraw
import os

AMBER = (255, 176, 0, 255)
DARK_TOP = (17, 19, 42, 255)
DARK_BOTTOM = (11, 12, 21, 255)

# bar geometry relative to a 512 base (mirrors favicon.svg)
BARS = [(176, 216, 80), (232, 156, 200), (288, 116, 280), (344, 156, 200), (400, 216, 80)]
BAR_W = 28
RADIUS = 104

HERE = os.path.dirname(os.path.abspath(__file__))


def bg_gradient(size):
    img = Image.new('RGBA', (size, size))
    px = img.load()
    for y in range(size):
        t = y / (size - 1) if size > 1 else 0
        r = int(DARK_TOP[0] + (DARK_BOTTOM[0] - DARK_TOP[0]) * t)
        g = int(DARK_TOP[1] + (DARK_BOTTOM[1] - DARK_TOP[1]) * t)
        b = int(DARK_TOP[2] + (DARK_BOTTOM[2] - DARK_TOP[2]) * t)
        for x in range(size):
            px[x, y] = (r, g, b, 255)
    return img


def rounded(img, radius):
    mask = Image.new('L', img.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, img.size[0] - 1, img.size[1] - 1], radius=radius, fill=255)
    out = Image.new('RGBA', img.size, (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


def make_icon(size):
    s = 512
    img = bg_gradient(s)
    d = ImageDraw.Draw(img)
    bw = round(BAR_W * size / s)
    for (bx, by, bh) in BARS:
        x0 = round(bx * size / s)
        y0 = round(by * size / s)
        h = round(bh * size / s)
        # ensure min 1px visible
        r = max(1, bw // 2)
        d.rounded_rectangle([x0, y0, x0 + bw - 1, y0 + h - 1], radius=r, fill=AMBER)
    return rounded(img, round(RADIUS * size / s))


def main():
    targets = {
        'favicon-16x16.png': 16,
        'favicon-32x32.png': 32,
        'favicon-192x192.png': 192,
        'favicon-512x512.png': 512,
        'apple-touch-icon.png': 180,
    }
    for name, size in targets.items():
        path = os.path.join(HERE, name)
        make_icon(size).save(path)
        print('wrote', path, size)


if __name__ == '__main__':
    main()