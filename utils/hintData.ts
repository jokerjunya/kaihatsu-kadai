import { TaskHint } from '@/types/theme';

// 全レベル用のヒントデータ
const sampleHints: { [taskId: string]: TaskHint } = {
  // 割り勘アプリ（傾斜機能付き）
  'bill-splitter-bl': {
    detailed: '名前を登録し、人数と合計金額を入力すると均等割の結果を表示する。',
    tips: [
      '名前と金額を対応付けて一覧表示するとわかりやすい'
    ],
    resources: [
      'JavaScript基本文法 - 配列とオブジェクトの操作',
      'HTML Forms - 入力フォームの作成',
      'CSS Layout - 結果表示のスタイリング'
    ]
  },
  'bill-splitter-tl': {
    detailed: '人によって負担割合を変えられる（幹事割引や飲まなかった人は少なめなど）。',
    tips: [
      '割合の指定方法を考えると体験が変わる（スライダーや数値入力など）'
    ],
    resources: [
      'HTML Range Input - スライダーUI',
      'JavaScript Events - 入力値の動的更新',
      'CSS Styling - インタラクティブなUI'
    ]
  },
  'bill-splitter-br': {
    detailed: '計算結果を保存して、共有リンクやコードで他の人に知らせられる。',
    tips: [
      '共有にどんな情報を含めるか（名前、金額、日付など）を設計してみる'
    ],
    resources: [
      'LocalStorage API - データの永続化',
      'URL Parameters - 共有リンクの生成',
      'QR Code Library - 共有コードの作成'
    ]
  },
  'bill-splitter-tr': {
    detailed: '複数イベントを登録し、割り勘履歴をまとめて一覧化する。',
    tips: [
      '履歴を並べ替えたり検索したりできると管理しやすい'
    ],
    resources: [
      'Array Methods - データの並び替えと検索',
      'Date Handling - 日付の管理と表示',
      'Database Design - 履歴データの構造設計'
    ]
  },

  // オセロ（リバーシ）
  'othello-game-bl': {
    detailed: '2人で交互に石を置いて遊べる盤面。石をひっくり返す処理を含む。',
    tips: [
      '盤面をどう表現するか、手番をどう見せるかを先に決めると進めやすい'
    ],
    resources: [
      '2D Array - 盤面データの管理',
      'CSS Grid - オセロ盤のレイアウト',
      'Game Logic - ひっくり返し処理のアルゴリズム'
    ]
  },
  'othello-game-tl': {
    detailed: '1人でも遊べるように、相手の動きを追加する。',
    tips: [
      '相手がどんな基準で手を選ぶかを一つだけ定めればAIらしくなる'
    ],
    resources: [
      'AI Algorithm - 基本的な思考ロジック',
      'Random Selection - ランダムな手の選択',
      'Game State - 盤面評価の基礎'
    ]
  },
  'othello-game-br': {
    detailed: '対局の結果を保存し、勝敗やスコアを一覧表示できる。',
    tips: [
      'ランキングに載せる情報（勝率、連勝数など）を工夫すると面白い'
    ],
    resources: [
      'LocalStorage - 戦績データの保存',
      'Statistics - 勝率や統計の計算',
      'Data Visualization - 戦績の可視化'
    ]
  },
  'othello-game-tr': {
    detailed: '遠隔の相手とネット越しに2人で対戦できる。',
    tips: [
      '順番や終了条件をどう共有するかが設計のポイント'
    ],
    resources: [
      'WebSocket - リアルタイム通信',
      'State Synchronization - ゲーム状態の同期',
      'Network Programming - ネットワーク対戦の実装'
    ]
  },

  // ファイル整理ツール
  'file-organizer-bl': {
    detailed: 'フォルダ内のファイルを種類ごとに自動で分類する。',
    tips: [
      'どんな種類で分けるか（画像、文書、音声など）をあらかじめ決めておくと整理しやすい'
    ],
    resources: [
      'File API - ファイル情報の取得',
      'File Extensions - 拡張子による分類',
      'Directory Operations - フォルダ操作'
    ]
  },
  'file-organizer-tl': {
    detailed: '分類条件に大きさや作成日を加えられるようにする。',
    tips: [
      '複数条件が重なった場合にどちらを優先するかを定義すると混乱が減る'
    ],
    resources: [
      'File Properties - ファイルサイズと日付の取得',
      'Conditional Logic - 複数条件の処理',
      'Rule Engine - 分類ルールの設計'
    ]
  },
  'file-organizer-br': {
    detailed: '整理したファイルを外のサービスに送れるようにする。',
    tips: [
      '送信済みと未送信をどう区別して見せるかを工夫すると便利'
    ],
    resources: [
      'Cloud Storage API - 外部サービス連携',
      'File Upload - ファイルのアップロード',
      'Status Management - 送信状態の管理'
    ]
  },
  'file-organizer-tr': {
    detailed: '複数の場所で同じルールを使い、整理結果を同期できる。',
    tips: [
      '同期のタイミング（手動更新か自動更新か）を考えると現実的になる'
    ],
    resources: [
      'Synchronization - データ同期の実装',
      'Cloud Database - 設定の共有',
      'Conflict Resolution - 同期競合の解決'
    ]
  },

  // カレンダー連携ToDo
  'calendar-todo-bl': {
    detailed: 'タスクを追加・削除できるリスト。完了したものにはチェックを付けられる。',
    tips: [
      '完了したタスクを残すか非表示にするか、ルールを決めると設計が進む'
    ],
    resources: [
      'HTML Forms - タスク入力フォーム',
      'JavaScript Arrays - タスクリストの管理',
      'CSS Styling - チェックボックスのデザイン'
    ]
  },
  'calendar-todo-tl': {
    detailed: 'タスクに期限や優先度を設定でき、並べ替えや強調表示もできる。',
    tips: [
      '期限が近いものをどう目立たせるかを工夫すると使いやすい'
    ],
    resources: [
      'Date Handling - 期限の管理',
      'Sorting Algorithms - タスクの並び替え',
      'CSS Highlighting - 優先度の視覚化'
    ]
  },
  'calendar-todo-br': {
    detailed: 'タスクが予定表に登録され、スケジュールとつながる。',
    tips: [
      'タスクを「終日予定」とするか「時間付き予定」とするかを考えるとよい'
    ],
    resources: [
      'Calendar API - 予定表との連携',
      'Date/Time Conversion - 日時データの変換',
      'API Integration - 外部サービス連携'
    ]
  },
  'calendar-todo-tr': {
    detailed: '習慣タスクを登録し、連続達成数を表示。通知でリマインドもできる。',
    tips: [
      '達成感を見せる方法（数字、バッジ、アイコンなど）を選ぶと楽しくなる'
    ],
    resources: [
      'Notification API - ブラウザ通知',
      'Streak Tracking - 連続達成の記録',
      'Gamification - 達成感の演出'
    ]
  },

  // WebスクレイピングRPA
  'web-scraping-rpa-bl': {
    detailed: 'ボタンを押すと指定サイトで検索を実行し、結果を一覧で表示する。',
    tips: [
      '検索→結果表示の流れを一貫して表現することを意識するとよい'
    ],
    resources: [
      'Fetch API - HTTP通信',
      'DOM Parsing - HTML解析',
      'CSS Selectors - 要素の選択'
    ]
  },
  'web-scraping-rpa-tl': {
    detailed: '結果の中からタイトルや内容など、複数の要素を取り出して別々に表示する。',
    tips: [
      'どの要素をどこに配置するかの"地図"を先に決めると整理しやすい'
    ],
    resources: [
      'querySelector - 特定要素の抽出',
      'Data Extraction - 構造化データの作成',
      'Layout Design - 抽出結果の表示'
    ]
  },
  'web-scraping-rpa-br': {
    detailed: '複数のサイトで複数の検索語を実行し、結果をまとめて一覧表示する。',
    tips: [
      'どの組み合わせが成功／失敗したかがわかる仕組みを加えると便利',
      'ブラウザ操作には **Playwright / Puppeteer** が活用できる'
    ],
    resources: [
      'Playwright/Puppeteer - ブラウザ自動化',
      'Promise.all - 並列処理',
      'Error Handling - エラー状態の管理'
    ]
  },
  'web-scraping-rpa-tr': {
    detailed: '取得した情報をもとに、要点をまとめたページ（要約ビュー）を生成する。',
    tips: [
      '要約ページに含める項目（タイトル、抜粋、日付など）を先にテンプレ化すると良い'
    ],
    resources: [
      'Template Engine - ページ生成',
      'Text Processing - 要約作成',
      'Data Aggregation - 情報の統合'
    ]
  },

  // 天気アプリ
  'weather-app-bl': {
    detailed: 'ダミーの「今日の天気」を画面に表示する。',
    tips: [
      '文字や記号で十分。見やすい工夫を加えると体験が変わる'
    ],
    resources: [
      'HTML Structure - 天気情報の表示',
      'CSS Styling - 見やすいデザイン',
      'Weather Icons - 天気アイコンの利用'
    ]
  },
  'weather-app-tl': {
    detailed: 'ダミーの気温推移を時間ごとに表示し、1日の流れを見せる。',
    tips: [
      '朝・昼・夜などに区切るだけでも理解しやすい'
    ],
    resources: [
      'Chart.js - グラフ表示',
      'Time Series - 時系列データの表現',
      'Data Visualization - 気温推移の可視化'
    ]
  },
  'weather-app-br': {
    detailed: '場所を入力すると、その場所の実際の天気が表示される。',
    tips: [
      '入力が間違っていた場合にどう扱うかを決めると堅牢になる'
    ],
    resources: [
      'Weather API - 天気データの取得',
      'Geolocation - 位置情報の活用',
      'Input Validation - 入力値の検証'
    ]
  },
  'weather-app-tr': {
    detailed: '過去の天気を履歴に残し、週間予報や注意喚起も表示する。',
    tips: [
      '注意喚起の条件を自由に設定すると工夫の余地が広がる'
    ],
    resources: [
      'Data Storage - 履歴データの保存',
      'Weather Alerts - 注意喚起システム',
      'Forecast Display - 予報表示'
    ]
  },

  // ニュースビューア
  'news-viewer-bl': {
    detailed: 'ダミーの記事3件をタイトル・要約・リンク付きで表示。更新ボタンで切り替えられる。',
    tips: [
      '記事を複数用意し、順番や表示方法を変えると「動いている感」が出る'
    ],
    resources: [
      'HTML Structure - 記事カードの作成',
      'JavaScript Arrays - 記事データの管理',
      'CSS Layout - 記事一覧のデザイン'
    ]
  },
  'news-viewer-tl': {
    detailed: '記事をお気に入りに追加して「あとで読むリスト」にまとめられる。',
    tips: [
      'お気に入りの場所をどこに置くか（モーダル、別ページなど）を考えるとよい'
    ],
    resources: [
      'LocalStorage - お気に入りの保存',
      'UI Components - モーダルやリストの実装',
      'State Management - お気に入り状態の管理'
    ]
  },
  'news-viewer-br': {
    detailed: '検索キーワードを入力すると、実際のウェブ上の記事が取得され一覧表示される。',
    tips: [
      '取得中の状態や失敗時の表示を工夫すると安心感がある'
    ],
    resources: [
      'News API - ニュースデータの取得',
      'Search Implementation - 検索機能の実装',
      'Loading States - ローディング表示'
    ]
  },
  'news-viewer-tr': {
    detailed: '記事を保存して履歴に残し、まとめて読む画面で再確認できる。',
    tips: [
      '履歴の整理（新しい順、カテゴリ別など）を考えると使いやすい'
    ],
    resources: [
      'Data Persistence - 記事の永続化',
      'Reading History - 履歴管理',
      'Article Organization - 記事の整理機能'
    ]
  },

  // 経営者ダッシュボード
  'manager-dashboard-bl': {
    detailed: '数値を表に表示する（売上、コストなど）。',
    tips: [
      'どの指標を並べると役立つかを最初に決めると良い'
    ],
    resources: [
      'HTML Tables - データの表形式表示',
      'CSS Styling - 見やすいテーブルデザイン',
      'Data Formatting - 数値の書式設定'
    ]
  },
  'manager-dashboard-tl': {
    detailed: '指標ごとにグラフに切り替えて表示できる。',
    tips: [
      '切り替えのUIをどうするか（タブやセレクトなど）を考えると印象が変わる'
    ],
    resources: [
      'Chart.js - グラフライブラリ',
      'UI Components - タブやセレクトボックス',
      'Data Visualization - データの可視化'
    ]
  },
  'manager-dashboard-br': {
    detailed: '複数の数値表を読み込み、同じ指標を比較できる。',
    tips: [
      '比較を横並びにするか、重ねて表示するかを先に決めると設計しやすい'
    ],
    resources: [
      'File Reading - 複数ファイルの読み込み',
      'Data Comparison - データ比較の実装',
      'Comparative Visualization - 比較表示'
    ]
  },
  'manager-dashboard-tr': {
    detailed: '複数の指標をまとめて配置したダッシュボードを作り、更新で全体が最新になる。',
    tips: [
      '最小構成（主要指標だけ）から始めると作りやすい'
    ],
    resources: [
      'Dashboard Layout - ダッシュボードの設計',
      'Real-time Updates - リアルタイム更新',
      'Component Architecture - コンポーネント設計'
    ]
  },

  // Excel読み取り＋自動処理（ラスボス）
  'excel-automation-bl': {
    detailed: '表のデータを読み込み、そのまま画面に一覧表示できる。',
    tips: [
      '列や行の意味（数値、文字、日付）をきちんと分けて扱う'
    ],
    resources: [
      'SheetJS - Excel読み取りライブラリ',
      'File API - ファイルの読み込み',
      'Table Display - 表形式での表示'
    ]
  },
  'excel-automation-tl': {
    detailed: '条件を決めて色付けや集計を行い、要点を強調した一覧にする。',
    tips: [
      'どの条件で強調するか（閾値や範囲）を定義してから実装する'
    ],
    resources: [
      'Conditional Formatting - 条件付き書式',
      'Data Aggregation - データ集計',
      'Visual Highlighting - 視覚的強調'
    ]
  },
  'excel-automation-br': {
    detailed: '複数の表を読み込み、共通項目で突き合わせて結果を出す。',
    tips: [
      '突き合わせるキー（商品IDや日付など）を決めるのが第一歩'
    ],
    resources: [
      'Data Joining - データの結合',
      'Key Matching - キー項目の照合',
      'VLOOKUP Logic - 検索・照合ロジック'
    ]
  },
  'excel-automation-tr': {
    detailed: '突き合わせ結果をカードやグラフでダッシュボードにまとめ、更新で再描画される。',
    tips: [
      'カードに何を表示するか、どんなグラフを置くかを自分で設計することが大事'
    ],
    resources: [
      'Dashboard Design - ダッシュボード設計',
      'Chart Integration - グラフの統合',
      'Auto-refresh - 自動更新機能'
    ]
  }
};

// ヒントデータを取得する関数
export const getTaskHint = (taskId: string): TaskHint | undefined => {
  try {
    if (!taskId || typeof taskId !== 'string') {
      console.warn('無効なタスクID:', taskId);
      return undefined;
    }
    
    const hint = sampleHints[taskId];
    if (!hint) {
      console.warn('ヒントが見つかりません:', taskId);
      return undefined;
    }
    
    return hint;
  } catch (error) {
    console.error('ヒント取得エラー:', error);
    return undefined;
  }
};
