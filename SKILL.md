---
name: developer
description: 開發工具專用記憶系統，適用於任何 AI Agent，每次對話開始讀取 .ai-memory/ 狀態，完成後更新記憶並 commit
---

## 對話開始（必須做）

1. **立即讀取 `.ai-memory/` 狀態**
   - `00-start-here.md` - 了解項目基本、當前問題
   - `01-current-state.md` - 上次做到邊、待解決問題
   - `02-decisions.md` - 技術選擇、Debug 經驗

2. **根據狀態判斷是否用 SubAgent**
   - 獨立任務 → 可用 SubAgent 並行
   - 複雜/整合任務 → 自己做的士

## 對話結束（必須做）

1. **更新 `01-current-state.md`**
2. **在 `03-session-logs/` 新增對話記錄**
3. **立即 Git Commit**

## 4層記憶結構

```
.ai-memory/
├── 00-start-here.md      # 入口（必讀）
├── 01-current-state.md   # 當前狀態
├── 02-decisions.md       # 關鍵決定
├── 03-session-logs/     # 對話記錄
└── 04-snippets.md       # 代碼片段
```

## SubAgent 使用原則

**核心原則：subagent 係幫手做「已知點做」嘅嘢，唔係幫手諗點做。**

| 任務類型 | 適合程度 |
|----------|----------|
| 獨立檔案/模組 | ✅ 適合 |
| 簡單測試並行 | ✅ 適合 |
| 需要整合的任務 | ❌ 不適合 |
| 「建立→整合→修bug」流程 | ❌ 不適合 |

**方針：有懷疑就自己嚟**

**實踐做法：派 SubAgent 前要先話俾佢知「請先閱讀 `.ai-memory/02-decisions.md`」**

**用完後必須更新記憶：**
- 若有新發現/新經驗 → 更新 `02-decisions.md`
- 若有成功模式 → 記錄喺 `04-snippets.md`

```javascript
// SubAgent 並行示例
task({ description: "Task 1", prompt: "...", subagent_type: "explore" });
task({ description: "Task 2", prompt: "...", subagent_type: "explore" });
```

## 開發流程

1. 分析問題 - 理解需求、確定影響範圍、評估風險
2. 小步前進 - 每個改動都測試、通過後立即 commit
3. 記錄決定 - 記錄在 02-decisions.md
4. 更新狀態 - 01-current-state.md 始終最新

## Debug 流程

1. 重現問題 - 用 Puppeteer 或瀏覽器 Console
2. 隔離問題 - 是 UI/API/緩存問題？
3. 修復 + 測試
4. Commit
5. **更新記憶 → 若有新發現，寫入 `02-decisions.md` 的 Debug 經驗表**

## 自動測試（Puppeteer）

### 測試流程
1. **Headless 測試** - 用 Puppeteer 自動跑
2. **完全正確** → 才到手動確認（截圖 + 目測）
3. **失敗** → 修復 → 重跑 headless → 再確認

### 測試準則
- ✅ 功能正常運作
- ✅ 無 console error
- ✅ 截圖確認 UI

### 流程
1. 寫測試 script → `node runner.js --test xxx.js`
2. 失敗 → 修復
3. 成功 → commit → 更新 `.ai-memory/`

### SubAgent 測試
- 多個獨立工具可並行
- 例：task("測試 reminder") + task("測試 case")

### 圖像處理（Vision API）
- 使用 `vision-cli.js` 分析截圖
- 圖片需 < 15KB，否則 timeout
- 用 `tool.screenshotSmall()` 影細圖

```javascript
// 影細圖用於 Vision 分析
await tool.screenshotSmall('vision.png');
```

```bash
# 分析截圖
node vision-cli.js vision.png "確認UI是否正常"
```

### 圖像處理
- 圖像相關功能 → 需調用外部 API/模型（我無內置圖像處理）

## Commit Message 格式

```
feat: 新功能
fix: 修復 bug
docs: 文檔更新
refactor: 重構
test: 測試相關
style: 格式調整
```

---

## ⚡ 速查

### Git
```bash
git add . && git commit -m "feat: 描述"  # 提交
git log --oneline      # 睇歷史
git status             # 睇狀態
```

### 常用命令
```bash
npm install            # 安裝
npm test               # 測試
node runner.js --test my-test.js  # 指定測試
node runner.js --headless          # 無頭模式
```

---

*詳見：`.ai-memory/` 目錄下嘅完整文檔*