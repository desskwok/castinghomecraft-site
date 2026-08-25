import os
import json
from PIL import Image
import io
import base64

image_dir = "images"
json_path = "data/portfolio.json"

# Get all jpg files in images folder
files = [f for f in os.listdir(image_dir) if f.endswith('.jpg')]
print(f"Found {len(files)} images to compress")

for filename in files:
    filepath = os.path.join(image_dir, filename)
    orig_size = os.path.getsize(filepath)
    
    if orig_size < 500000:  # Skip if already small (< 500KB)
        print(f"  Skipping {filename} (already small: {orig_size/1024:.0f}KB)")
        continue
    
    try:
        img = Image.open(filepath)
        width, height = img.size
        
        # Resize if larger than 1200px
        max_width = 1200
        if width > max_width:
            ratio = max_width / width
            height = int(height * ratio)
            width = max_width
            img = img.resize((width, height), Image.LANCZOS)
        
        # Save as JPEG with 80% quality
        img.save(filepath, 'JPEG', quality=80, optimize=True)
        
        new_size = os.path.getsize(filepath)
        print(f"  Compressed {filename}: {orig_size/1024:.0f}KB → {new_size/1024:.0f}KB")
    except Exception as e:
        print(f"  Error compressing {filename}: {e}")

print("\nDone!")
