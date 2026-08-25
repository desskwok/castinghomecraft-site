# 代碼片段

## 圖片壓縮（Canvas API）

```javascript
function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(blob || file);
        }, 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
```

## GitHub API 上傳圖片

```javascript
async function uploadToGitHub(filename, base64, token) {
  const repo = 'desskwok/castinghomecraft-site';
  const path = `images/${filename}`;
  
  const resp = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      message: `Upload image: ${filename}`,
      content: base64
    })
  });
  
  return resp.ok;
}
```

## 拖拽排序（SortableJS）

```javascript
Sortable.create(grid, {
  group: 'images',
  animation: 150,
  ghostClass: 'sortable-ghost',
  onEnd: function(evt) {
    // Handle item movement
  }
});
```

## 前後對比滑動器（CSS clip-path）

```javascript
function updateSlider(x) {
  const rect = slider.getBoundingClientRect();
  let pos = (x - rect.left) / rect.width;
  pos = Math.max(0, Math.min(1, pos));
  
  const percent = pos * 100;
  beforeImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  line.style.left = `${percent}%`;
  handle.style.left = `${percent}%`;
}
```

## Git Push（解決 SSL 問題）

```bash
# 方法 1：用 openssl backend
git -c http.sslBackend=openssl push origin main

# 方法 2：設定環境變數
export GIT_SSL_NO_VERIFY=1
git push origin main
```

## JSON 編碼修復

```powershell
# 修復 BOM 問題
$content = [System.IO.File]::ReadAllText("file.json")
[System.IO.File]::WriteAllText("file.json", $content, [System.Text.UTF8Encoding]::new($false))
```
