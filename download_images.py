import json
import os
import urllib.request
import ssl

# Disable SSL verification
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

json_path = "data/portfolio.json"
image_dir = "images"

os.makedirs(image_dir, exist_ok=True)

with open(json_path, 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

count = 0
downloaded = {}

for case_type in ['renovation', 'maintenance']:
    for case in data.get(case_type, []):
        all_images = []
        for img in case.get('before_images', []):
            url = img.get('url', '') if isinstance(img, dict) else img
            if url: all_images.append(url)
        for img in case.get('after_images', []):
            url = img.get('url', '') if isinstance(img, dict) else img
            if url: all_images.append(url)
        for img in case.get('images', []):
            url = img.get('url', '') if isinstance(img, dict) else img
            if url: all_images.append(url)
        
        for url in all_images:
            if url.startswith('http') and url not in downloaded:
                filename = f"{case['id']}_{count}.jpg"
                filepath = os.path.join(image_dir, filename)
                
                try:
                    print(f"Downloading: {filename}")
                    req = urllib.request.Request(url, headers={
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Referer': 'https://www.google.com/',
                        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
                    })
                    with urllib.request.urlopen(req, context=ctx) as response:
                        with open(filepath, 'wb') as f:
                            f.write(response.read())
                    
                    size = os.path.getsize(filepath)
                    print(f"  Size: {size/1024:.1f} KB")
                    
                    if size > 10000:
                        # Replace URL in JSON
                        for arr_name in ['before_images', 'after_images', 'images']:
                            for i, img in enumerate(case.get(arr_name, [])):
                                img_url = img.get('url', '') if isinstance(img, dict) else img
                                if img_url == url:
                                    if isinstance(img, dict):
                                        case[arr_name][i]['url'] = f"{image_dir}/{filename}"
                                    else:
                                        case[arr_name][i] = f"{image_dir}/{filename}"
                        downloaded[url] = filename
                        count += 1
                    else:
                        print(f"  FAILED: Too small, skipping")
                        os.remove(filepath)
                except Exception as e:
                    print(f"  ERROR: {e}")

# Save updated JSON
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\nDone! Downloaded {count} images.")
