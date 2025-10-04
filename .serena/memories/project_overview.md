# Kadai - 4レベル課題管理アプリ プロジェクト概要

## 🎯 プロジェクト目的
Next.js 15 + TypeScript + Tailwind CSS + Cloud Firestoreで構築された実践的な課題管理アプリケーション。
9つのテーマと4つのレベル（計36課題）で構成された学習システム。

## 🛠 技術スタック
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v3.4.17
- **データベース**: Cloud Firestore
- **状態管理**: React Hooks + ローカルストレージ
- **デザインシステム**: Happy Hues カラーパレット

## 📁 主要ディレクトリ構造
- `app/`: Next.js App Router (dashboard, theme/[id])
- `components/`: 再利用可能コンポーネント (ThemeCard, HintPopup)
- `lib/`: 外部ライブラリ設定 (firebase.ts)
- `types/`: TypeScript型定義 (theme.ts, firestore.ts)
- `utils/`: ユーティリティ関数 (themeStorage.ts, firestoreManager.ts, themeData.ts, hintData.ts)

## 🎨 4レベル構造
- **レベル1**: 内部単純 × 外部依存なし（シンプルで自己完結型）
- **レベル2**: 内部複雑 × 外部依存なし（複雑だが自己完結型）
- **レベル3**: 内部単純 × 外部依存あり（シンプルだが外部連携が必要）
- **レベル4**: 内部複雑 × 外部依存あり（複雑で外部連携も必要）

## 📊 9つのテーマ
1. 割り勘アプリ（傾斜機能付き）
2. オセロ（リバーシ）
3. ファイル整理ツール
4. カレンダー連携ToDo
5. WebスクレイピングRPA
6. 天気アプリ
7. ニュースビューア
8. 経営者ダッシュボード
9. Excel読み取り＋自動処理