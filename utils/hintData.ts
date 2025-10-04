import { TaskHint } from '@/types/theme';

// 全レベル用のヒントデータ
export const sampleHints: { [taskId: string]: TaskHint } = {
  // ニュースビューア
  'news-viewer-bl': {
    detailed: 'ハードコードされたサンプル記事を3件、リスト形式で表示する基本的なニュース表示機能を実装します。HTMLの構造化とCSSスタイリングが重要なポイントです。',
    tips: [
      'article要素を使って記事の構造を明確にする',
      'タイトル、概要、日付を含む記事カードをデザインする',
      'レスポンシブデザインでモバイルでも読みやすくする',
      'ダミーデータは配列で管理して、map関数で表示する'
    ],
    resources: [
      'HTML5 Semantic Elements - article, header, timeタグの使い方',
      'CSS Flexbox/Grid - カードレイアウトの作成',
      'JavaScript Array.map() - データの反復表示',
      'CSS Media Queries - レスポンシブデザイン'
    ]
  },
  'news-viewer-tl': {
    detailed: 'ローカルストレージを使った記事のお気に入り機能と、カテゴリ別整理機能を実装します。データの永続化とユーザーインターフェースの設計が重要です。',
    tips: [
      'LocalStorageでお気に入り記事のIDを配列で管理する',
      'ハートアイコンやスターアイコンで視覚的に分かりやすくする',
      'お気に入り状態の切り替えをスムーズにアニメーション化する',
      'カテゴリ別にフィルタリング機能を実装する'
    ],
    resources: [
      'LocalStorage API - ブラウザでのデータ保存',
      'CSS Transitions - スムーズなアニメーション',
      'JavaScript Filter - データのフィルタリング',
      'Font Awesome - アイコンライブラリ'
    ]
  },
  'news-viewer-br': {
    detailed: 'News APIなどを使用して、キーワード検索で実際のニュース記事を取得・表示する機能を実装します。API連携とエラーハンドリングが重要なポイントです。',
    tips: [
      'News APIのAPIキーを環境変数で管理する',
      'fetch関数でAPIからデータを取得する',
      'ローディング状態とエラー状態のUIを用意する',
      '検索フォームでキーワード検索機能を実装する'
    ],
    resources: [
      'News API - 無料のニュースデータAPI',
      'Fetch API - HTTP通信の実装',
      'Environment Variables - APIキーの安全な管理',
      'Error Handling - エラー処理のベストプラクティス'
    ]
  },
  'news-viewer-tr': {
    detailed: 'オフライン対応の記事保存機能と、複数記事を効率的に読めるリーダーモードを実装します。ユーザビリティとパフォーマンスを両立した設計が求められます。',
    tips: [
      '記事データの効率的な保存形式を設計する（タイトル、本文、メタデータ）',
      'オフライン時でも快適に読めるキャッシュ機能を実装する',
      '読みやすさを重視したリーダーモードのスタイリングを行う',
      '記事の検索・フィルタリング機能で大量の記事を管理しやすくする',
      'ユーザーの読書進捗を保存して継続的な体験を提供する'
    ],
    resources: [
      'IndexedDB - 大量の記事データの保存に適している',
      'Service Worker - オフライン機能の実装',
      'Readability.js - 記事の本文抽出ライブラリ',
      'Fuse.js - 高速な記事検索機能',
      'CSS Grid/Flexbox - 記事一覧の美しいレイアウト'
    ]
  },

  // 天気アプリ
  'weather-app-bl': {
    detailed: 'サンプルデータを使用した基本的な天気情報のテキスト表示機能を実装します。データ構造の設計とシンプルなUIの作成が重要です。',
    tips: [
      '天気データのオブジェクト構造を設計する（温度、湿度、天気状況）',
      'テキストベースでシンプルに情報を表示する',
      '単位（℃、%）を適切に表示する',
      '現在時刻を表示して情報の鮮度を示す'
    ],
    resources: [
      'JavaScript Objects - データ構造の設計',
      'Date API - 現在時刻の取得と表示',
      'CSS Typography - 読みやすいテキストデザイン',
      'HTML Structure - 情報の階層化'
    ]
  },
  'weather-app-tl': {
    detailed: '天気アイコン、温度グラフ、降水確率などの視覚的な天気表示機能を実装します。データの可視化とユーザビリティが重要なポイントです。',
    tips: [
      '天気状況に応じたアイコンを用意する（晴れ、雨、曇りなど）',
      'Chart.jsなどでシンプルな温度グラフを作成する',
      '色を使って視覚的に情報を分かりやすくする',
      'アニメーションを追加して動的な表現にする'
    ],
    resources: [
      'Chart.js - グラフ作成ライブラリ',
      'Weather Icons - 天気アイコンセット',
      'CSS Animations - 要素のアニメーション',
      'Color Theory - 効果的な色の使い方'
    ]
  },
  'weather-app-br': {
    detailed: 'OpenWeatherMap等のAPIを使用したリアルタイム天気データの取得・表示機能を実装します。外部API連携とデータ処理が重要です。',
    tips: [
      'OpenWeatherMap APIのAPIキーを取得して設定する',
      'ユーザーの位置情報を取得して地域の天気を表示する',
      'API応答データを適切にパースして表示用に変換する',
      'API呼び出しの頻度制限に注意する'
    ],
    resources: [
      'OpenWeatherMap API - 無料の天気データAPI',
      'Geolocation API - ユーザーの位置情報取得',
      'JSON Parsing - APIデータの処理',
      'Rate Limiting - API呼び出し制限の管理'
    ]
  },
  'weather-app-tr': {
    detailed: '天気履歴の保存機能と週間予報表示を含む本格的な天気アプリを実装します。データの永続化、API連携、ユーザーインターフェースの設計が重要なポイントになります。',
    tips: [
      'ローカルストレージやIndexedDBを使用してユーザーの天気履歴を保存する',
      '外部天気APIの取得データを適切に処理し、エラーハンドリングを実装する',
      'レスポンシブデザインでモバイルでも使いやすいUIを心がける',
      'ユーザーの位置情報を取得して自動で地域の天気を表示する',
      '週間予報をグラフやカードで視覚的に分かりやすく表示する'
    ],
    resources: [
      'OpenWeatherMap API - 無料で使える天気データAPI',
      'Chart.js - 天気データのグラフ表示に便利',
      'Geolocation API - ユーザーの現在位置を取得',
      'LocalStorage API - ブラウザでのデータ保存',
      'Tailwind CSS - レスポンシブなUIデザイン'
    ]
  }
};

// ヒントデータを取得する関数
export const getTaskHint = (taskId: string): TaskHint | undefined => {
  return sampleHints[taskId] || undefined;
};
