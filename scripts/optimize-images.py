"""One-off asset optimizer: resizes oversized PNGs and writes WebP siblings.

Run with a Python that has Pillow: python scripts/optimize-images.py
Originals are left untouched; components import the generated .webp files.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

# (source, target, width, quality) — target width is ~1.1–2x the CSS slot.
JOBS = [
    ("src/assets/hero-bg.png", "public/hero-bg.webp", 1920, 80),
    ("src/assets/icons/sec6/invoice-bg.png", "src/assets/icons/sec6/invoice-bg.webp", 1600, 80),
    ("src/assets/icons/sec6/donut-bg.png", "src/assets/icons/sec6/donut-bg.webp", 1200, 80),
    ("src/assets/icons/sec7/card1.png", "src/assets/icons/sec7/card1.webp", 1035, 80),
    ("src/assets/icons/sec7/card2.png", "src/assets/icons/sec7/card2.webp", 1000, 80),
    ("src/assets/icons/sec7/card3.png", "src/assets/icons/sec7/card3.webp", 1036, 80),
    ("src/assets/icons/sec7/card4.png", "src/assets/icons/sec7/card4.webp", 1035, 80),
    ("src/assets/icons/footer/footer-img.png", "src/assets/icons/footer/footer-img.webp", 2000, 78),
    ("src/assets/icons/sec2/iphone-frame.png", "src/assets/icons/sec2/iphone-frame.webp", 540, 82),
    ("src/assets/icons/object.png", "src/assets/icons/object.webp", 96, 88),
    ("src/assets/icons/sec4/dot-matrix.png", "src/assets/icons/sec4/dot-matrix.webp", 756, 82),
]

for src, dst, width, quality in JOBS:
    src_path, dst_path = ROOT / src, ROOT / dst
    im = Image.open(src_path)
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if has_alpha else "RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst_path, "WEBP", quality=quality, method=6)
    before = src_path.stat().st_size / 1024
    after = dst_path.stat().st_size / 1024
    print(f"{dst}: {before:7.1f} KB -> {after:6.1f} KB ({im.width}x{im.height})")
