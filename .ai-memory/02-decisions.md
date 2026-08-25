# 技術決定

## 架構選擇

### 為什麼用 Cloudflare Pages？
- **免費** — 靜態網站完全免費
- **快速** — 全球 CDN，載入速度快
- **自動部署** — 推送到 GitHub 自動部署
- **簡單** — 唔需要伺服器管理

### 為什麼用 JSON 而唔係資料庫？
- 靜態網站冇後端
- JSON 簡單直接，易於維護
- GitHub API 可以直接更新 JSON

### 為什麼用 GitHub API 而唔係其他？
- 用戶已經有 GitHub 帳號
- API 免費，額度足夠
- 可以直接喺後台操作

## 圖片處理決策

### 為什麼要壓縮圖片？
- 手機相片通常 3-5MB，太大
- Cloudflare Pages 有大小限制
- 壓縮後 200-400KB，載入快

### 壓縮參數選擇
- **最大寬度**: 1200px — 足夠顯示，唔會太大
- **JPEG 品質**: 80% — 人眼幾乎睇唔出分別
- **封面圖片**: 800px — 縮圖用

### 為什麼用 GitHub raw URL？
- 圖片上傳到 GitHub 後，Cloudflare 需要 1 分鐘部署
- 用 raw URL 可以即時顯示
- 儲存時移除 raw_url，保持 JSON 乾淨

## 前後對比決策

### 為什麼用 CSS clip-path 而唔係第三方庫？
- 唔需要額外依賴
- 純 CSS 實現，性能好
- 手機兼容性好

## Debug 經驗

### Q: 圖片手機睇唔到？
- **原因**: Google Sites 圖片有 CORS 限制
- **解決**: 下載圖片到本地 images/ 資料夾

### Q: 後台 Tab 切換唔 work？
- **原因**: JavaScript 語法錯誤（alert() 引號未關閉）
- **解決**: 修復引號，改用非阻塞通知

### Q: 案例詳細頁停喺「載入中」？
- **原因**: JavaScript escaped backticks `\``
- **解決**: 改用正常 backticks `` ` ``

### Q: JSON 編碼損壞？
- **原因**: PowerShell ConvertFrom-Json 處理唔到 BOM
- **解決**: 用 `utf-8-sig` 編碼讀取

### Q: Git push 被拒絕？
- **原因**: 遠端有新變更（用戶用後台更新）
- **解決**: 先 pull --rebase，再 push

### Q: Git SSL 錯誤 SEC_E_NO_CREDENTIALS？
- **原因**: Windows schannel SSL 配置問題
- **解決**: 用 `-c http.sslBackend=openssl` 參數
