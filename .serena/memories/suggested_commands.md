# 推奨コマンド集

## 🚀 開発コマンド
```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# Netlify用ビルド
npm run build:netlify
```

## 🔍 品質チェック
```bash
# ESLint実行
npm run lint

# TypeScript型チェック
npm run type-check
```

## 📁 Windows用システムコマンド
```cmd
# ディレクトリ一覧
dir

# ファイル検索
findstr /s /i "pattern" *.ts

# ディレクトリ移動
cd path\to\directory

# ファイル内容表示
type filename.txt
```

## 🔧 Git操作
```bash
# 変更をステージング
git add .

# コミット
git commit -m "message"

# プッシュ
git push origin main

# 状態確認
git status
```

## 🐛 デバッグ用
```javascript
// ローカルストレージ全クリア
ThemeStorageManager.clearAllData();

// Firebase接続確認
console.log('Firebase initialized:', app);
```