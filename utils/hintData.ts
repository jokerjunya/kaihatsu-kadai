import { TaskHint } from '@/types/theme';

// 全レベル用のヒントデータ（最終版・指定内容）
const sampleHints: { [taskId: string]: TaskHint } = {
  // 1. 割り勘アプリ（傾斜機能付き）
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

  // 2. オセロ（リバーシ）
  'othello-game-bl': {
    detailed: '2人で交互に石を置いて遊べる盤面。石をひっくり返す処理を含む。',
    tips: [
      '盤面をどう表現するか、手番をどう見せるかを先に決めると進めやすい'
    ],
    resources: [
      '2D Array - 二次元配列での盤面管理',
      'Game Logic - ゲームルールの実装',
      'Event Handling - クリック処理とターン管理'
    ]
  },
  'othello-game-tl': {
    detailed: '1人でも遊べるように、相手の動きを追加する。',
    tips: [
      '相手がどんな基準で手を選ぶかを一つだけ定めればAIらしくなる'
    ],
    resources: [
      'AI Algorithm - 簡単なゲームAI',
      'Minimax Algorithm - ゲーム理論の基礎',
      'Random Selection - ランダム選択の実装'
    ]
  },
  'othello-game-br': {
    detailed: '対局の結果を保存し、勝敗やスコアを一覧表示できる。',
    tips: [
      'ランキングに載せる情報（勝率、連勝数など）を工夫すると面白い'
    ],
    resources: [
      'Data Persistence - 対局結果の保存',
      'Statistics - 勝率や連勝数の計算',
      'Chart Library - 成績のグラフ表示'
    ]
  },
  'othello-game-tr': {
    detailed: '遠隔の相手とネット越しに2人で対戦できる。',
    tips: [
      '順番や終了条件をどう共有するかが設計のポイント'
    ],
    resources: [
      'WebSocket - リアルタイム通信',
      'Firebase Realtime DB - リアルタイムデータベース',
      'Network Error Handling - 通信エラー処理'
    ]
  },

  // 3. ファイル整理ツール
  'file-organizer-bl': {
    detailed: 'フォルダ内のファイルを種類ごとに自動で分類する。',
    tips: [
      'どんな種類で分けるか（画像、文書、音声など）をあらかじめ決めておくと整理しやすい'
    ],
    resources: [
      'File API - ファイル操作の基礎',
      'MIME Types - ファイル形式の判定',
      'Drag and Drop API - ファイルのドラッグ&ドロップ'
    ]
  },
  'file-organizer-tl': {
    detailed: '分類条件に大きさや作成日を加えられるようにする。',
    tips: [
      '複数条件が重なった場合にどちらを優先するかを定義すると混乱が減る'
    ],
    resources: [
      'File Properties - ファイル属性の取得',
      'Date Comparison - 日付の比較処理',
      'Size Formatting - ファイルサイズの表示'
    ]
  },
  'file-organizer-br': {
    detailed: '整理したファイルを外のサービスに送れるようにする。',
    tips: [
      '送信済みと未送信をどう区別して見せるかを工夫すると便利'
    ],
    resources: [
      'Cloud Storage API - クラウドサービス連携',
      'File Upload - ファイルアップロード処理',
      'Progress Indicator - 送信進捗の表示'
    ]
  },
  'file-organizer-tr': {
    detailed: '複数の場所で同じルールを使い、整理結果を同期できる。',
    tips: [
      '同期のタイミング（手動更新か自動更新か）を考えると現実的になる'
    ],
    resources: [
      'Sync Algorithm - データ同期の仕組み',
      'Configuration Management - 設定の管理',
      'Conflict Resolution - 競合解決'
    ]
  },

  // 4. カレンダー連携ToDo
  'calendar-todo-bl': {
    detailed: 'タスクを追加・削除できるリスト。完了したものにはチェックを付けられる。',
    tips: [
      '完了したタスクを残すか非表示にするか、ルールを決めると設計が進む'
    ],
    resources: [
      'CRUD Operations - データの基本操作',
      'Local Storage - タスクデータの保存',
      'Keyboard Events - キーボードショートカット'
    ]
  },
  'calendar-todo-tl': {
    detailed: 'タスクに期限や優先度を設定でき、並べ替えや強調表示もできる。',
    tips: [
      '期限が近いものをどう目立たせるかを工夫すると使いやすい'
    ],
    resources: [
      'Date Handling - 期限の管理と比較',
      'Sorting Algorithm - タスクの並び替え',
      'CSS Styling - 優先度の視覚化'
    ]
  },
  'calendar-todo-br': {
    detailed: 'タスクが予定表に登録され、スケジュールとつながる。',
    tips: [
      'タスクを「終日予定」とするか「時間付き予定」とするかを考えるとよい'
    ],
    resources: [
      'Calendar API - カレンダーサービス連携',
      'Date/Time Picker - 日時選択UI',
      'iCal Format - カレンダーデータ形式'
    ]
  },
  'calendar-todo-tr': {
    detailed: '習慣タスクを登録し、連続達成数を表示。通知でリマインドもできる。',
    tips: [
      '達成感を見せる方法（数字、バッジ、アイコンなど）を選ぶと楽しくなる'
    ],
    resources: [
      'Notification API - ブラウザ通知',
      'Streak Counter - 連続達成の計算',
      'Gamification - ゲーム要素の追加'
    ]
  },

  // 5. WebスクレイピングRPA
  'web-scraping-rpa-bl': {
    detailed: 'ボタンを押すと指定サイトで検索を実行し、結果を一覧で表示する。',
    tips: [
      '検索→結果表示の流れを一貫して表現することを意識するとよい'
    ],
    resources: [
      'Fetch API - HTTP リクエスト',
      'CORS Proxy - クロスオリジン制限の回避',
      'HTML Parsing - HTML の解析'
    ]
  },
  'web-scraping-rpa-tl': {
    detailed: '結果の中からタイトルや内容など、複数の要素を取り出して別々に表示する。',
    tips: [
      'どの要素をどこに配置するかの"地図"を先に決めると整理しやすい'
    ],
    resources: [
      'CSS Selectors - 要素の指定方法',
      'DOM Manipulation - DOM の操作',
      'Error Handling - エラー処理'
    ]
  },
  'web-scraping-rpa-br': {
    detailed: '複数のサイトで複数の検索語を実行し、結果をまとめて一覧表示する。💡ワンポイント：ブラウザ操作には Playwright / Puppeteer が活用できる。',
    tips: [
      'どの組み合わせが成功／失敗したかがわかる仕組みを加えると便利'
    ],
    resources: [
      'Promise.all - 並列処理',
      'Rate Limiting - リクエスト制限',
      'Playwright / Puppeteer - ブラウザ操作'
    ]
  },
  'web-scraping-rpa-tr': {
    detailed: '取得した情報をもとに、要点をまとめたページ（要約ビュー）を生成する。',
    tips: [
      '要約ページに含める項目（タイトル、抜粋、日付など）を先にテンプレ化すると良い'
    ],
    resources: [
      'Template Engine - テンプレート処理',
      'PDF Generation - PDF 出力',
      'Data Aggregation - データの集約'
    ]
  },

  // 6. 天気アプリ
  'weather-app-bl': {
    detailed: 'ダミーの「今日の天気」を画面に表示する。',
    tips: [
      '文字や記号で十分。見やすい工夫を加えると体験が変わる'
    ],
    resources: [
      'Weather Icons - 天気アイコン',
      'CSS Animation - 簡単なアニメーション',
      'Mock Data - ダミーデータの作成'
    ]
  },
  'weather-app-tl': {
    detailed: 'ダミーの気温推移を時間ごとに表示し、1日の流れを見せる。',
    tips: [
      '朝・昼・夜などに区切るだけでも理解しやすい'
    ],
    resources: [
      'Chart.js - グラフライブラリ',
      'Time Formatting - 時刻の表示形式',
      'Data Visualization - データの可視化'
    ]
  },
  'weather-app-br': {
    detailed: '場所を入力すると、その場所の実際の天気が表示される。',
    tips: [
      '入力が間違っていた場合にどう扱うかを決めると堅牢になる'
    ],
    resources: [
      'Weather API - 天気データサービス',
      'Geolocation API - 位置情報の取得',
      'Autocomplete - 入力補完機能'
    ]
  },
  'weather-app-tr': {
    detailed: '過去の天気を履歴に残し、週間予報や注意喚起も表示する。',
    tips: [
      '注意喚起の条件を自由に設定すると工夫の余地が広がる'
    ],
    resources: [
      'Historical Weather Data - 過去の天気データ',
      'Weather Alerts - 気象警報',
      'Push Notifications - プッシュ通知'
    ]
  },

  // 7. ニュースビューア
  'news-viewer-bl': {
    detailed: 'ダミーの記事3件をタイトル・要約・リンク付きで表示。更新ボタンで切り替えられる。',
    tips: [
      '記事を複数用意し、順番や表示方法を変えると「動いている感」が出る'
    ],
    resources: [
      'Card Layout - カード形式のレイアウト',
      'Mock Articles - ダミー記事データ',
      'Responsive Design - レスポンシブ対応'
    ]
  },
  'news-viewer-tl': {
    detailed: '記事をお気に入りに追加して「あとで読むリスト」にまとめられる。',
    tips: [
      'お気に入りの場所をどこに置くか（モーダル、別ページなど）を考えるとよい'
    ],
    resources: [
      'Local Storage - お気に入りデータの保存',
      'Modal Dialog - モーダルウィンドウ',
      'Tagging System - タグ機能'
    ]
  },
  'news-viewer-br': {
    detailed: '検索キーワードを入力すると、実際のウェブ上の記事が取得され一覧表示される。',
    tips: [
      '取得中の状態や失敗時の表示を工夫すると安心感がある'
    ],
    resources: [
      'News API - ニュースデータサービス',
      'Search Interface - 検索UI',
      'Loading States - ローディング状態'
    ]
  },
  'news-viewer-tr': {
    detailed: '記事を保存して履歴に残し、まとめて読む画面で再確認できる。',
    tips: [
      '履歴の整理（新しい順、カテゴリ別など）を考えると使いやすい'
    ],
    resources: [
      'Reading History - 読書履歴の管理',
      'Offline Storage - オフライン保存',
      'Export Functions - データエクスポート'
    ]
  },

  // 8. 経営者ダッシュボード
  'manager-dashboard-bl': {
    detailed: '数値を表に表示する（売上、コストなど）。',
    tips: [
      'どの指標を並べると役立つかを最初に決めると良い'
    ],
    resources: [
      'Table Layout - テーブルレイアウト',
      'Number Formatting - 数値の表示形式',
      'Business Metrics - ビジネス指標'
    ]
  },
  'manager-dashboard-tl': {
    detailed: '指標ごとにグラフに切り替えて表示できる。',
    tips: [
      '切り替えのUIをどうするか（タブやセレクトなど）を考えると印象が変わる'
    ],
    resources: [
      'Chart Library - グラフライブラリ',
      'UI Components - タブやセレクト',
      'Data Filtering - データの絞り込み'
    ]
  },
  'manager-dashboard-br': {
    detailed: '複数の数値表を読み込み、同じ指標を比較できる。',
    tips: [
      '比較を横並びにするか、重ねて表示するかを先に決めると設計しやすい'
    ],
    resources: [
      'Data Comparison - データ比較',
      'Multiple Charts - 複数グラフの表示',
      'Data Normalization - データの正規化'
    ]
  },
  'manager-dashboard-tr': {
    detailed: '複数の指標をまとめて配置したダッシュボードを作り、更新で全体が最新になる。',
    tips: [
      '最小構成（主要指標だけ）から始めると作りやすい'
    ],
    resources: [
      'Dashboard Layout - ダッシュボード設計',
      'Real-time Updates - リアルタイム更新',
      'Widget System - ウィジェット管理'
    ]
  },

  // 9. Excel読み取り＋自動処理
  'excel-automation-bl': {
    detailed: '表のデータを読み込み、そのまま画面に一覧表示できる。',
    tips: [
      '列や行の意味（数値、文字、日付）をきちんと分けて扱う'
    ],
    resources: [
      'File Reader API - ファイル読み込み',
      'Excel Parser - Excel ファイル解析',
      'Data Type Detection - データ型の判定'
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
      'Rule Engine - ルールエンジン'
    ]
  },
  'excel-automation-br': {
    detailed: '複数の表を読み込み、共通項目で突き合わせて結果を出す。',
    tips: [
      '突き合わせるキー（商品IDや日付など）を決めるのが第一歩'
    ],
    resources: [
      'Data Joining - データの結合',
      'Key Matching - キーマッチング',
      'Data Validation - データ検証'
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
