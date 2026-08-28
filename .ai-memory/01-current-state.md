# 當前狀態

## 最後更新：2026-08-21（已包含 CSS mobile 修復）

## 項目概述

鑄家工藝係一間香港室內裝修公司，我哋幫佢建立咗一個免費嘅靜態網站，託管喺 Cloudflare Pages。

## 網站 URLs

| 項目 | URL |
|------|-----|
| **網站** | https://castinghomecraft-site.pages.dev/ |
| **後台** | https://castinghomecraft-site.pages.dev/admin.html |
| **GitHub** | https://github.com/desskwok/castinghomecraft-site |
| **舊網站** | https://www.castinghomecraft.dpdns.org/ |

## 帳號資訊

| 項目 | 內容 |
|------|------|
| **GitHub 用戶名** | desskwok |
| **GitHub Token** | [已儲存在本地，唔會上傳到 GitHub] |
| **Cloudflare Account ID** | 934e78ef2dc64f8e529c044119d13641 |

## 已完成功能

### 網站頁面
- ✅ 首頁（index.html）— Logo + 文字、服務介紹、數據展示
- ✅ 服務項目（services.html）— 5大服務詳情
- ✅ 精選作品（portfolio.html）— 動態載入 JSON
- ✅ 案例詳細（case.html）— 前後對比分組 + Lightbox + 封面圖
- ✅ 聯絡我們（contact.html）— WhatsApp 表單

### 後台管理系統
- ✅ Tab 切換（全屋翻新 / 維修 / 加新 / 編輯）
- ✅ 加案例 / 編輯案例 / 刪除案例
- ✅ 拖拽排圖（SortableJS）
- ✅ 前後對比標記（🔴工程前 / 🟢工程後）
- ✅ 圖片分組顯示（按標題）
- ✅ 圖片上傳（GitHub API）+ 自動壓縮（1200px, 80%）
- ✅ 進度條顯示壓縮 + 上傳狀態
- ✅ 封面圖片上傳
- ✅ GitHub Token 自動儲存
- ✅ 重新載入按鈕

### 案例詳細頁功能
- ✅ 前後對比滑動器（冇對比時顯示封面圖）
- ✅ 圖片按標題分組顯示
- ✅ Lightbox 放大功能（點擊圖片全螢幕）
- ✅ 鍵盤導航（← → 切換，ESC 關閉）

### 設計特色
- ✅ Logo 圖片 + 文字（Header/Footer，金色 #e8b931）
- ✅ 響應式設計（手機/電腦）
- ✅ Favicon + OG Image

### 案例數據結構
```json
{
  "id": "案例ID",
  "title": "標題",
  "location": "地區",
  "type": "工程類型",
  "thumbnail": "封面圖片URL",
  "description": "介紹",
  "before_images": [{"url": "...", "caption": ""}],
  "after_images": [{"url": "...", "caption": ""}],
  "images": [{"url": "...", "caption": ""}]
}
```

## 待辦事項

- [ ] 考慮買自訂域名（castinghomecraft.com）
- [ ] 提交 Google Search Console
- [ ] 加 Google Analytics

## Debug 經驗

| 問題 | 原因 | 解決 |
|------|------|------|
| 圖片手機睇唔到 | Google Sites CORS 限制 | 下載到本地 images/ |
| 後台 Tab 切換唔 work | alert() 引號未關閉 | 修復引號 |
| 案例頁停喺「載入中」 | escaped backticks | 改用正常 backticks |
| JSON 編碼損壞 | PowerShell BOM 問題 | 用 edit 工具 |
| Git push 被拒絕 | 遠端有新變更 | 先 pull --rebase |
| Git SSL 錯誤 | Windows schannel | 用 openssl backend |
| Logo 搞壞 HTML | PowerShell replace 損壞編碼 | 用 edit 工具 |
| Lightbox 冇效 | `<\/script>` 喺 template literal | 用 data attributes |
| Hamburger menu 冇顯示 | 768px breakpoint 冇加 display: block | 加 .menu-toggle { display: block } |
| Menu overlay 透明 + link 被遮住 | .nav-links 冇 z-index | 加 z-index: 9999 + background: #fff |

## Mobile CSS 修復（css/style.css）

```css
/* 768px media query 入面 */
.menu-toggle { display: block; }
.nav-links { z-index: 9999 !important; background: #ffffff !important; }
.nav-links.open { display: flex !important; }
body { overflow-x: hidden; }
.portfolio-grid, .services-grid { grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr)); }
.cta-section { margin: 0; }
section { padding: 60px 0; }
.portfolio-img { height: 180px; }
```
