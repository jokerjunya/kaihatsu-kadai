# Netlify デプロイ手順

## 1. 事前準備

### Firebase設定の確認
- Firebase Consoleでセキュリティルールが適切に設定されていることを確認
- Firestoreのセキュリティルール: 開発用は `allow read, write: if true;`

### 環境変数の準備
以下の環境変数をNetlifyの管理画面で設定してください：

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 2. Netlifyでのデプロイ設定

### ビルド設定
- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Node version**: `18`

### 自動デプロイ
- GitHubリポジトリと連携
- `main`ブランチへのプッシュで自動デプロイ

## 3. トラブルシューティング

### よくあるエラーと対処法

#### ビルドエラー
```
Error: Cannot find module 'next/font/google'
```
→ Next.js 13以降の機能を使用している場合は、互換性を確認

#### 環境変数エラー
```
Firebase: Error (auth/invalid-api-key)
```
→ Netlifyの環境変数設定を確認

#### Static Export エラー
```
Error: Image Optimization using Next.js' default loader is not compatible with `next export`
```
→ `next.config.ts`で`images.unoptimized: true`を設定済み

#### Firestore接続エラー
```
FirebaseError: Missing or insufficient permissions
```
→ Firestoreセキュリティルールを確認

## 4. パフォーマンス最適化

### 推奨設定
- Netlify Edge Functionsの活用（必要に応じて）
- CDNキャッシュの最適化
- 画像最適化の設定

### モニタリング
- Netlify Analytics
- Firebase Performance Monitoring
- Core Web Vitals の監視

## 5. セキュリティ

### 設定済みのセキュリティヘッダー
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- CSP（Content Security Policy）

### Firebase セキュリティ
- 本番環境では適切なFirestoreセキュリティルールを設定
- APIキーの適切な管理

## 6. デプロイ後の確認項目

- [ ] サイトが正常に表示される
- [ ] Firebase接続が正常
- [ ] ユーザー登録・ログインが機能する
- [ ] データの保存・読み込みが正常
- [ ] 全ページの動作確認
- [ ] モバイル表示の確認
- [ ] パフォーマンススコアの確認
