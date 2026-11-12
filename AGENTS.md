# AGENTS.md — OS 小講義

## 1. 專案目的
這是一個「作業系統（Operating System）」課程筆記網站。
目標：依照同一套規則，把每一章投影片轉成結構一致、適合複習的網頁講義，
並讓各章之間的邏輯關聯能被 AI 明確讀取。
讀者是準備期中考的大學生，重視「考點、公式、比較表、小例題」。

## 2. 技術限制
- 純靜態：HTML + CSS + 少量原生 JavaScript。
- 禁止 npm、框架、打包工具、外部 CDN、追蹤碼。
- 數學式用純文字或 <code>，例如 U = C / (C + I)，不要引入 LaTeX 函式庫。
- 必須能直接部署在 GitHub Pages（所有路徑使用相對路徑）。

## 3. 目錄與命名
- 講義放 `lessons/`，檔名：`os-{兩位數章次}-{英文短名}.html`
  - 章次對應課程章節：01 Introduction、02 OS Structure、03 Processes、04 Threads、05 CPU Scheduling。
  - 範例：`os-04-threads.html`
- 全小寫、用 `-`，不可有空白或中文。
- 原始教材放 `sources/`，AI 只能讀取，不可修改或刪除。
- 圖片放 `assets/img/`，檔名同講義 id，例如 `os-03-process-states.svg`。
- 樣式只能改 `assets/style.css`，頁面內禁止行內 `<style>`。

## 4. 新增講義的標準流程（依序完成）
1. 先讀 `sources/` 中對應的檔案，不可憑空編造課程內容。
2. 複製 `lessons/_template.html` 成新檔名。
3. 依第 5 節的章節順序撰寫。
4. 在 `data/lessons.json` 把該筆 `status` 改為 `published`（若不存在則新增），
   並填寫 `prerequisites`、`related`、`concepts`。
5. 把本章的核心概念登錄到 `data/concepts.json`（見第 11 節）。
6. 更新相鄰講義的「上一篇／下一篇」與「相關單元」連結。
7. 更新 `llms.txt` 的學習路徑。
8. 回報：新增或修改了哪些檔案，哪些內容是從哪份來源整理的。

## 5. 講義章節順序（固定）
1. `<h1>` 章名，下方 `<p class="meta">` 標示來源與章次
2. 學習目標（3 點以內）
3. 直覺說明（生活比喻，不超過 3 段）
4. 核心概念
   - 專有名詞第一次出現要附英文，如「行程（process）」
   - 比較類內容一定要用 `<table>`（如 Process vs Program）
   - 公式放在 `<div class="formula">`
5. 程式或範例
   - C 程式放 `<pre><code class="lang-c">`，必須能編譯，附預期輸出
   - 計算類主題（如排程）要附完整算式
6. 考試重點：用 `<div class="callout">` 條列 3～5 個常考點
7. 常見錯誤（至少 2 點）
8. 練習題 2～4 題，答案放 `<details>`
9. 相關單元：用 `<ul class="rel">` 列出先備與延伸單元，每個連結加 `data-rel`
10. 頁尾導覽：上一篇／回首頁／下一篇

`<article class="lesson">` 必須帶有 `data-id`、`data-prereq`、`data-leads-to` 三個屬性。

## 6. data/lessons.json 格式
```json
{
  "id": "os-05-cpu-scheduling",
  "title": "Ch5 CPU 排程",
  "chapter": 5,
  "category": "os",
  "summary": "FCFS、SJF、RR 與等待時間計算",
  "difficulty": 3,
  "status": "published",
  "file": "lessons/os-05-cpu-scheduling.html",
  "prerequisites": ["os-03-processes", "os-04-threads"],
  "related": ["os-06-synchronization"],
  "concepts": ["preemptive-scheduling", "dispatcher", "waiting-time"]
}
```
- `status` 只能是 `published` 或 `planned`。
- `planned` 的項目首頁會顯示為「即將推出」且不可點擊。
- 陣列依 `chapter` 由小到大排序；`summary` 不超過 40 字；`difficulty` 為 1～3。
- `prerequisites`、`related` 內只能填已存在於 lessons.json 的 `id`。
- `concepts` 內只能填已登錄於 concepts.json 的概念 `id`。

## 7. 風格規範
- 語言：繁體中文（台灣用語），英文術語保留原文。
- 標點：中文句子一律使用全形標點（，。：；！？、（）「」）；程式碼與英文術語內部維持半形。
- 語氣：清楚、精簡，條列優先，避免長段落。
- 色彩：主色 `#2563eb`、背景 `#f8fafc`、文字 `#1e293b`、重點框 `#fef3c7`。
- 版面：內容最大寬度 800px，需支援手機（RWD）。
- 程式碼：縮排 4 空格，變數 snake_case。

## 8. 內容正確性規則
- 數字與公式必須與 `sources/` 一致；自行補充的例題須自己驗算。
- 老師投影片沒提到的延伸內容，要標示「補充」。
- 不確定的內容寫「待確認」，不要猜。

## 9. AI 禁止事項
- 不刪除或改名既有講義。
- 不修改 `sources/` 內任何檔案。
- 不擅自改 AGENTS.md，除非使用者明確要求。
- 不加入與課程無關的內容。
- 不使用「如前所述」「見上文」這類模糊參照，必須寫出章節與概念名稱。

## 10. 完成檢查清單
- [ ] 檔名符合規則
- [ ] 章節順序正確（含「考試重點」與「相關單元」）
- [ ] lessons.json 合法且 status 正確
- [ ] prerequisites／related 的 id 都存在
- [ ] concepts.json 已登錄本章概念
- [ ] llms.txt 已更新
- [ ] 首頁卡片可進入該頁
- [ ] 上一篇／下一篇連結正確
- [ ] C 程式可編譯
- [ ] 中文標點皆為全形
- [ ] 手機寬度版面正常

## 11. 單元關聯規則
- `data/concepts.json` 以「概念」為節點，以「關係」為邊。
- 每個概念必須有 `id`、`name`、`defined_in`（定義它的章節 id）、`used_in`（使用它的章節 id 陣列）。
- 關係類型只能使用以下五種：
  - `prerequisite_of`：先備知識
  - `causes`：因果
  - `contrasts_with`：對比
  - `extends`：延伸
  - `example_of`：範例
- 引用其他章的概念時，要用連結並加上 `data-rel`，值必須是上述五種之一。
- 若關聯對象的章節尚未發布（planned），只寫文字，不放連結。
- 新增章節後，要同步檢查 `README.md` 內的 Mermaid 學習路徑圖。
