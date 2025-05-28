# 📁 .gitignore 檔案說明

這個專案包含多個 `.gitignore` 檔案來確保不必要的檔案不會被版本控制系統追蹤。

## 📂 檔案結構

```
├── .gitignore              # 根目錄 - 全域規則
├── server/.gitignore       # 後端專案 - Express + TypeScript
├── client/.gitignore       # 前端專案 - React + Vite
└── GITIGNORE.md           # 說明文件 (本檔案)
```

## 🔍 各檔案說明

### 根目錄 `.gitignore`
- **用途**: 涵蓋整個專案的全域規則
- **包含**: 
  - Node.js 相關檔案
  - 環境變數檔案
  - 日誌檔案
  - IDE 設定檔
  - 作業系統產生的檔案
  - 安全相關檔案 (私鑰、憑證等)
  - 建置和部署相關檔案

### Server `.gitignore`
- **用途**: 專門針對 Express + TypeScript 後端
- **包含**:
  - TypeScript 編譯輸出
  - 伺服器日誌
  - 資料庫檔案
  - PM2 設定檔
  - Docker 相關檔案

### Client `.gitignore`
- **用途**: 專門針對 React + Vite 前端
- **包含**:
  - Vite 建置輸出
  - React 開發快取
  - Storybook 輸出
  - ESLint 快取

## 🚫 被忽略的重要檔案類型

### 🔐 安全檔案
```
.env                    # 環境變數
*.key                   # 私鑰
*.pem                   # 憑證
*.p12, *.pfx           # 憑證檔案
```

### 📦 依賴和建置
```
node_modules/          # NPM 依賴
dist/                  # 建置輸出
build/                 # 編譯輸出
*.tsbuildinfo         # TypeScript 快取
```

### 📝 日誌和快取
```
logs/                  # 日誌目錄
*.log                  # 日誌檔案
.cache/                # 快取目錄
.eslintcache          # ESLint 快取
```

### 💻 IDE 和編輯器
```
.vscode/              # VSCode 設定 (部分保留)
.idea/                # IntelliJ IDEA
*.swp, *.swo         # Vim 暫存檔
```

### 🖥️ 作業系統
```
.DS_Store             # macOS
Thumbs.db             # Windows
*~                    # Linux 備份檔
```

## ✅ 保留的檔案

某些重要的設定檔會被保留：

### VSCode 設定 (部分保留)
```
!.vscode/settings.json     # 專案設定
!.vscode/tasks.json        # 任務設定
!.vscode/launch.json       # 除錯設定
!.vscode/extensions.json   # 推薦擴充功能
```

## 🔧 自訂規則

如果需要新增自訂規則：

1. **全域規則**: 加入根目錄的 `.gitignore`
2. **後端專用**: 加入 `server/.gitignore`
3. **前端專用**: 加入 `client/.gitignore`

## 📋 檢查被忽略的檔案

```bash
# 檢查哪些檔案被忽略
git status --ignored

# 強制加入被忽略的檔案 (不建議)
git add -f <filename>

# 檢查特定檔案是否被忽略
git check-ignore <filename>
```

## ⚠️ 注意事項

1. **環境變數**: 絕對不要提交 `.env` 檔案到版本控制
2. **憑證和私鑰**: 確保所有安全相關檔案都被忽略
3. **日誌檔案**: 避免提交大型日誌檔案
4. **依賴目錄**: `node_modules/` 應該總是被忽略
5. **建置輸出**: 編譯後的檔案不應該被版本控制

## 🔄 更新 .gitignore

當更新 `.gitignore` 後，如果想要移除已經被追蹤的檔案：

```bash
# 移除快取中的檔案 (但保留本地檔案)
git rm --cached <filename>

# 重新套用 .gitignore 規則
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
``` 