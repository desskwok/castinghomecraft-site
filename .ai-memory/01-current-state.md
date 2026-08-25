# 當前狀態

## 最後更新：2026-08-21

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
- ✅ 首頁（index.html）— 服務介紹、數據展示
- ✅ 服務項目（services.html）— 5大服務詳情
- ✅ 精選作品（portfolio.html）— 動態載入 JSON
- ✅ 案例詳細（case.html）— 前後對比分組顯示
- ✅ 聯絡我們（contact.html）— WhatsApp 表單

### 後台管理系統
- ✅ Tab 切換（全屋翻新 / 維修 / 加新 / 編輯）
- ✅ 加案例 / 編輯案例 / 刪除案例
- ✅ 拖拽排圖（SortableJS）
- ✅ 前後對比標記（🔴工程前 / 🟢工程後）
- ✅ 圖片分組顯示（按標題）
- ✅ 圖片上傳（GitHub API）
- ✅ 自動壓縮（Canvas API，1200px，80% quality）
- ✅ 進度條（壓縮 + 上傳）
- ✅ GitHub Token 自動儲存

### 技術特性
- ✅ 響應式設計（手機/電腦）
- ✅ SEO 友善
- ✅ 自動部署（Cloudflare Pages）

## 待辦事項

- [ ] 加更多案例數據
- [ ] 綁定自訂域名（castinghomecraft.dpdns.org）
- [ ] 提交 Google Search Console
- [ ] 加 Google Analytics
- [ ] 加 Google Map 到聯絡頁

## 已知問題

1. **Google Sites 圖片 CORS 限制** — 舊網站嘅圖片唔可以直接嵌入，需要下載到本地
2. **GitHub Token 安全** — Token 喺前端暴露，唔安全（但係免費方案嘅限制）
3. **部署延遲** — Cloudflare Pages 部署需要約 1 分鐘
