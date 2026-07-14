#!/usr/bin/env python3
"""
Organize raw catalog images:
 1. Move originals to design-assets/catalog-raw/
 2. Copy base images to src/assets/catalog/<product>/base.<ext>
 3. Crop 2x2 variant grids into 4 quadrant files with descriptive names
"""

import os
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent.parent

RAW_DIR = ROOT / "design-assets" / "catalog-raw"
CATALOG_DIR = ROOT / "src" / "assets" / "catalog"

# Map raw filenames → product subfolder + base extension
BASES = {
    "1 plaque main.png":       ("plaque-single", "png"),
    "2 plaques main.png":      ("plaque-double", "png"),
    "3 plaque main.png":       ("plaque-triple", "png"),
    "wall plaque main.jpg":    ("wall-plate",    "jpg"),
    "menu foldout main.png":   ("table-tent",    "png"),
    "coaster reviews main.jpeg": ("coaster-review", "jpeg"),
    "coaster menu main.jpeg":    ("coaster-menu",   "jpeg"),
}

# Map raw filenames → (product subfolder, [(TL, TR, BL, BR) color names])
VARIANTS = {
    "1 plaque variants.jpeg": ("plaque-single", ["terra", "charcoal", "ocean", "sage"]),
    "2 plaques variants.jpeg": ("plaque-double", ["chalk", "midnight", "natural", "forest"]),
    "3 plaque variants 1.jpeg": ("plaque-triple", ["cool", "warm", "earth", "dark"]),
    "3 plaques variants 2.jpeg": ("plaque-triple", ["muted", "mediterranean", "warmwood", "cobalt"]),
    "wall plaque variants.jpeg": ("wall-plate", ["terra", "charcoal", "ocean", "sage"]),
    "menu foldout variants.jpeg": ("table-tent", ["chalk", "midnight", "terra", "sage"]),
}

def crop_quadrants(img: Image.Image):
    """Return [TL, TR, BL, BR] crops of a 2x2 grid image."""
    w, h = img.size
    hw, hh = w // 2, h // 2
    return [
        img.crop((0,  0,  hw, hh)),   # top-left
        img.crop((hw, 0,  w,  hh)),   # top-right
        img.crop((0,  hh, hw, h)),    # bottom-left
        img.crop((hw, hh, w,  h)),    # bottom-right
    ]

# ------------------------------------------------------------------
# 1. Create directories
# ------------------------------------------------------------------
RAW_DIR.mkdir(parents=True, exist_ok=True)
CATALOG_DIR.mkdir(parents=True, exist_ok=True)

# ------------------------------------------------------------------
# 2. Move originals to design-assets/catalog-raw/
# ------------------------------------------------------------------
all_raw = list(BASES.keys()) + list(VARIANTS.keys())
for fname in all_raw:
    src = ROOT / fname
    dst = RAW_DIR / fname
    if src.exists() and not dst.exists():
        shutil.move(str(src), str(dst))
        print(f"moved  {fname} → design-assets/catalog-raw/")
    elif dst.exists():
        print(f"skip   {fname} (already in raw/)")
    else:
        print(f"WARN   {fname} not found at repo root")

# ------------------------------------------------------------------
# 3. Copy base images
# ------------------------------------------------------------------
for fname, (product, ext) in BASES.items():
    src = RAW_DIR / fname
    product_dir = CATALOG_DIR / product
    product_dir.mkdir(exist_ok=True)
    dst = product_dir / f"base.{ext}"
    if not dst.exists():
        shutil.copy2(str(src), str(dst))
        print(f"base   {product}/base.{ext}")
    else:
        print(f"skip   {product}/base.{ext} (exists)")

# ------------------------------------------------------------------
# 4. Crop variant grids
# ------------------------------------------------------------------
for fname, (product, names) in VARIANTS.items():
    src = RAW_DIR / fname
    product_dir = CATALOG_DIR / product
    product_dir.mkdir(exist_ok=True)

    img = Image.open(src)
    quads = crop_quadrants(img)

    ext = src.suffix  # .jpeg or .png
    for quad, name in zip(quads, names):
        dst = product_dir / f"{name}{ext}"
        if not dst.exists():
            quad.save(str(dst))
            print(f"crop   {product}/{name}{ext}  ({quad.size[0]}×{quad.size[1]})")
        else:
            print(f"skip   {product}/{name}{ext} (exists)")

print("\nDone.")
