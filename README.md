# Kadai - 4レベル課題管理アプリ

Next.js 15 + TypeScript + Tailwind CSS + Cloud Firestoreで構築された実践的な課題管理アプリケーションです。

## 🚀 **主要機能**

### 📊 **4レベル構造の課題管理**
- **レベル1**: 内部単純 × 外部依存なし（シンプルで自己完結型）
- **レベル2**: 内部複雑 × 外部依存なし（複雑だが自己完結型）
- **レベル3**: 内部単純 × 外部依存あり（シンプルだが外部連携が必要）
- **レベル4**: 内部複雑 × 外部依存あり（複雑で外部連携も必要）

### 🎯 **10テーマの課題システム**
#### 📊 情報系
- ニュースビューア
- 天気アプリ
- 経営者ダッシュボード

#### 📂 ツール/RPA系
- ファイル整理ツール
- メール仕分けシミュレーター
- カレンダー連携ToDo
- WebスクレイピングRPA
- Excel読み取り＋自動処理

#### 🎮 ゲーム/遊び系
- 割り勘アプリ（傾斜機能付き）
- オセロ（リバーシ）

### 💡 **ヒントシステム**
各レベルに以下の情報を提供：
- 詳細な実装指針
- 実装のコツ（3-5項目）
- 参考リソース（3-5項目）

### ☁️ **Cloud Firestore連携**
- ユーザー進捗の永続化
- リアルタイム同期
- ローカルストレージからの自動移行
- オフライン対応（フォールバック機能）

## 🛠 **技術スタック**

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v3.4.17
- **データベース**: Cloud Firestore
- **状態管理**: React Hooks + ローカルストレージ
- **デザインシステム**: Happy Hues カラーパレット

## 📁 **プロジェクト構造**

```
kadai/
├── app/                    # Next.js App Router
│   ├── dashboard/         # ダッシュボードページ
│   ├── theme/[id]/       # テーマ詳細ページ
│   └── globals.css       # グローバルスタイル
├── components/           # 再利用可能なコンポーネント
│   ├── ThemeCard.tsx    # テーマカード
│   └── HintPopup.tsx    # ヒントポップアップ
├── lib/                 # 外部ライブラリ設定
│   └── firebase.ts      # Firebase設定
├── types/               # TypeScript型定義
│   ├── theme.ts         # テーマ関連の型
│   └── firestore.ts     # Firestore関連の型
├── utils/               # ユーティリティ関数
│   ├── themeStorage.ts  # ローカルストレージ管理
│   ├── firestoreManager.ts # Firestore操作
│   ├── themeData.ts     # テーマデータ
│   └── hintData.ts      # ヒントデータ
└── tailwind.config.ts   # Tailwind設定
```

## 🔧 **セットアップ**

### 1. 依存関係のインストール
```bash
npm install
```

### 2. Firebase設定
`lib/firebase.ts`でFirebase設定が完了済みです。

### 3. 開発サーバー起動
```bash
npm run dev
```

### 4. 本番ビルド
```bash
npm run build
npm start
```

## 📊 **データ構造**

### Firestore Collection: `userProgress`
```typescript
interface FirestoreUserProgress {
  id: string;                    // ユーザーID
  completedTasks: CompletedTask[]; // 完了済みタスク
  lastLogin: Date;               // 最終ログイン時刻
  createdAt: Date;               // 作成日時
  updatedAt: Date;               // 更新日時
}

interface CompletedTask {
  taskId: string;        // "news-viewer-bl"
  themeId: string;       // "news-viewer"
  level: string;         // "bottom-left"
  levelName: string;     // "レベル1"
  completedAt: Date;     // 完了日時
}
```

## 🎨 **デザインシステム**

### カラーパレット（Happy Hues #14）
- **Background**: `#fffffe`
- **Foreground**: `#2d334a`
- **Primary**: `#272343`
- **Accent**: `#ffd803`
- **Muted**: `#bae8e8`

### レベル別カラー
- **レベル1**: Yellow（シンプル・自己完結）
- **レベル2**: Purple（複雑・自己完結）
- **レベル3**: Blue（シンプル・外部連携）
- **レベル4**: Gray（複雑・外部連携）

## 🔄 **データ同期フロー**

1. **初回ログイン**
   - ローカルストレージのデータをFirestoreに移行
   - 新規ユーザーの場合はFirestoreに新規作成

2. **既存ユーザーログイン**
   - Firestoreからローカルストレージに同期
   - 最終ログイン時刻を更新

3. **タスク完了時**
   - Firestoreとローカルストレージの両方を更新
   - Firestore更新失敗時はローカルストレージにフォールバック

## 🚀 **デプロイ**

### Vercel（推奨）
```bash
# Vercel CLIを使用
npx vercel

# または GitHub連携でのデプロイ
```

### Netlify
```bash
# ビルドコマンド
npm run build

# 出力ディレクトリ
out
```

## 📝 **開発ガイド**

### 新しいテーマの追加
1. `utils/themeData.ts`にテーマデータを追加
2. `utils/hintData.ts`にヒントデータを追加
3. 必要に応じてアイコンやカテゴリを調整

### 新しいレベルの追加
1. `types/theme.ts`の`QUADRANT_CONFIG`を更新
2. UI コンポーネントでの表示ロジックを調整

## 🐛 **トラブルシューティング**

### Firestore接続エラー
- Firebase設定が正しいか確認
- Firestoreルールが適切に設定されているか確認

### ローカルストレージデータの不整合
```javascript
// デバッグ用：全データクリア
ThemeStorageManager.clearAllData();
```

## 📄 **ライセンス**

MIT License

## 🤝 **コントリビューション**

プルリクエストやイシューの報告を歓迎します！

---

**Happy Coding! 🎉**