import { Theme } from '@/types/theme';
import { getTaskHint } from './hintData';

// 10課題テーマのサンプルデータ
export const themes: Theme[] = [
  // 📊 情報系
  {
    id: 'news-viewer',
    title: 'ニュースビューア',
    description: '最新ニュースをスマートに読める、自分だけの情報ハブを作ろう',
    category: 'information',
    icon: '📰',
    quadrants: {
      'bottom-left': {
        id: 'news-viewer-bl',
        title: 'ダミー記事を3件表示',
        description: 'ハードコードされたサンプル記事を3件、リスト形式で表示する基本的なニュース表示機能',
        isCompleted: false,
        hint: getTaskHint('news-viewer-bl')
      },
      'top-left': {
        id: 'news-viewer-tl',
        title: 'お気に入り登録／リスト化',
        description: 'ローカルストレージを使った記事のお気に入り機能と、カテゴリ別整理機能を実装',
        isCompleted: false,
        hint: getTaskHint('news-viewer-tl')
      },
      'bottom-right': {
        id: 'news-viewer-br',
        title: 'APIキーで検索して記事一覧を取得',
        description: 'News APIなどを使用して、キーワード検索で実際のニュース記事を取得・表示',
        isCompleted: false,
        hint: getTaskHint('news-viewer-br')
      },
      'top-right': {
        id: 'news-viewer-tr',
        title: '保存機能＋検索結果をまとめて読む（本格ビューア）',
        description: 'オフライン読書のための記事保存機能と、複数記事を効率的に読めるリーダーモード',
        isCompleted: false,
        hint: getTaskHint('news-viewer-tr')
      }
    }
  },
  {
    id: 'weather-app',
    title: '天気アプリ',
    description: '毎日の天気を美しく、便利に確認できるパーソナル気象アプリ',
    category: 'information',
    icon: '🌤️',
    quadrants: {
      'bottom-left': {
        id: 'weather-app-bl',
        title: '固定の「今日の天気」をテキスト表示',
        description: 'サンプルデータを使用した基本的な天気情報のテキスト表示機能',
        isCompleted: false,
        hint: getTaskHint('weather-app-bl')
      },
      'top-left': {
        id: 'weather-app-tl',
        title: 'グラフ化・アイコンで表現',
        description: '天気アイコン、温度グラフ、降水確率などの視覚的な天気表示機能',
        isCompleted: false,
        hint: getTaskHint('weather-app-tl')
      },
      'bottom-right': {
        id: 'weather-app-br',
        title: '外部天気APIで現在の天気を取得',
        description: 'OpenWeatherMap等のAPIを使用したリアルタイム天気データの取得・表示',
        isCompleted: false,
        hint: getTaskHint('weather-app-br')
      },
      'top-right': {
        id: 'weather-app-tr',
        title: '保存・履歴管理・予報表示',
        description: '天気履歴の保存、週間予報、アラート機能を備えた総合天気アプリ',
        isCompleted: false,
        hint: getTaskHint('weather-app-tr')
      }
    }
  },
  {
    id: 'manager-dashboard',
    title: '経営者ダッシュボード',
    description: 'ビジネス指標を一目で把握！データドリブンな意思決定を支援',
    category: 'information',
    icon: '📈',
    quadrants: {
      'bottom-left': {
        id: 'manager-dashboard-bl',
        title: 'Excelにある数値を表で表示',
        description: 'CSV/Excel形式の売上データを読み込んで基本的な表形式で表示',
        isCompleted: false
      },
      'top-left': {
        id: 'manager-dashboard-tl',
        title: 'グラフ化（売上・コスト等）',
        description: 'Chart.jsなどを使用した売上推移、コスト分析などの可視化機能',
        isCompleted: false
      },
      'bottom-right': {
        id: 'manager-dashboard-br',
        title: '別のExcelを読み込んで比較（複数データ源）',
        description: '複数のExcelファイルを読み込んで部門別、期間別の比較分析機能',
        isCompleted: false
      },
      'top-right': {
        id: 'manager-dashboard-tr',
        title: '統合ダッシュボード化（指標の組み合わせ／自動更新）',
        description: 'KPI指標の統合表示、自動データ更新、アラート機能を備えた本格ダッシュボード',
        isCompleted: false
      }
    }
  },

  // 📂 ツール／RPA系
  {
    id: 'file-organizer',
    title: 'ファイル整理ツール',
    description: '散らかったファイルを自動整理！デスクトップがスッキリ片付く',
    category: 'tools-rpa',
    icon: '📁',
    quadrants: {
      'bottom-left': {
        id: 'file-organizer-bl',
        title: '拡張子ごとにフォルダ分け',
        description: 'ファイルの拡張子を判定して、対応するフォルダに移動する基本的な整理機能',
        isCompleted: false
      },
      'top-left': {
        id: 'file-organizer-tl',
        title: '条件分岐ルール（サイズや日付で整理）',
        description: 'ファイルサイズ、作成日時、更新日時などの条件に基づく高度な整理ルール',
        isCompleted: false
      },
      'bottom-right': {
        id: 'file-organizer-br',
        title: 'クラウドストレージにアップロード',
        description: 'Google Drive、Dropbox等のクラウドストレージAPI連携による自動アップロード',
        isCompleted: false
      },
      'top-right': {
        id: 'file-organizer-tr',
        title: '複数端末で自動同期',
        description: '複数デバイス間でのファイル同期、競合解決、バックアップ機能',
        isCompleted: false
      }
    }
  },
  {
    id: 'email-sorter',
    title: 'メール仕分けシミュレーター',
    description: 'メールの山を瞬時に整理！AIアシスタントのような仕分け体験',
    category: 'tools-rpa',
    icon: '📧',
    quadrants: {
      'bottom-left': {
        id: 'email-sorter-bl',
        title: '件名に応じてローカルでフォルダ分け',
        description: 'サンプルメールデータを件名のキーワードで分類する基本的な仕分け機能',
        isCompleted: false
      },
      'top-left': {
        id: 'email-sorter-tl',
        title: '複数条件で仕分けルール',
        description: '送信者、件名、本文、添付ファイルなど複数条件を組み合わせた高度な仕分けルール',
        isCompleted: false
      },
      'bottom-right': {
        id: 'email-sorter-br',
        title: 'IMAPで実際のメールを取得して仕分け',
        description: 'IMAP接続による実際のメールボックスからのメール取得と自動仕分け',
        isCompleted: false
      },
      'top-right': {
        id: 'email-sorter-tr',
        title: 'AIで自動学習・仕分け改善',
        description: '機械学習を活用したメール分類の自動学習と精度向上機能',
        isCompleted: false
      }
    }
  },
  {
    id: 'calendar-todo',
    title: 'カレンダー連携ToDo',
    description: 'タスクと予定を一元管理！時間を味方につける生産性アプリ',
    category: 'tools-rpa',
    icon: '📅',
    quadrants: {
      'bottom-left': {
        id: 'calendar-todo-bl',
        title: 'タスク追加・削除（ローカル保存）',
        description: 'ローカルストレージを使用した基本的なToDo管理機能',
        isCompleted: false
      },
      'top-left': {
        id: 'calendar-todo-tl',
        title: '期限・優先度付きのタスク管理',
        description: '締切日、優先度、カテゴリ分けなどの高度なタスク管理機能',
        isCompleted: false
      },
      'bottom-right': {
        id: 'calendar-todo-br',
        title: 'Googleカレンダー同期',
        description: 'Google Calendar APIを使用したタスクと予定の双方向同期機能',
        isCompleted: false
      },
      'top-right': {
        id: 'calendar-todo-tr',
        title: '習慣トラッキング・通知機能',
        description: '習慣化サポート、リマインダー通知、進捗分析機能',
        isCompleted: false
      }
    }
  },
  {
    id: 'web-scraping-rpa',
    title: 'WebスクレイピングRPA',
    description: 'Webの情報を自動収集！手作業を劇的に効率化するボット',
    category: 'tools-rpa',
    icon: '🕷️',
    quadrants: {
      'bottom-left': {
        id: 'web-scraping-rpa-bl',
        title: 'ダミーHTMLから特定文字列を抜き出す',
        description: 'サンプルHTMLファイルから基本的なDOM操作で情報を抽出',
        isCompleted: false
      },
      'top-left': {
        id: 'web-scraping-rpa-tl',
        title: '複数ページを回遊して情報抽出',
        description: 'ページネーション対応、リンク辿り、複雑なDOM構造への対応',
        isCompleted: false
      },
      'bottom-right': {
        id: 'web-scraping-rpa-br',
        title: '外部サイトから最新情報をスクレイピング',
        description: '実際のWebサイトからのリアルタイム情報取得（レート制限対応）',
        isCompleted: false
      },
      'top-right': {
        id: 'web-scraping-rpa-tr',
        title: '抽出データをExcelに転記＆保存',
        description: 'スケジュール実行、データ蓄積、Excel出力、エラーハンドリング機能',
        isCompleted: false
      }
    }
  },
  {
    id: 'excel-automation',
    title: 'Excel読み取り＋自動処理',
    description: 'Excel作業を完全自動化！データ処理の新しいスタンダード',
    category: 'tools-rpa',
    icon: '📊',
    quadrants: {
      'bottom-left': {
        id: 'excel-automation-bl',
        title: 'Excelファイルを読み込んで表を画面に出す',
        description: 'Excel/CSVファイルの読み込みと基本的なテーブル表示機能',
        isCompleted: false
      },
      'top-left': {
        id: 'excel-automation-tl',
        title: '条件付きで色付け／集計処理',
        description: '条件付き書式、ピボットテーブル風の集计、統計処理機能',
        isCompleted: false
      },
      'bottom-right': {
        id: 'excel-automation-br',
        title: '複数ファイルを読み込んで突合せ',
        description: '複数Excel間でのVLOOKUP風のデータ結合、差分検出機能',
        isCompleted: false
      },
      'top-right': {
        id: 'excel-automation-tr',
        title: '結果を外部システムに自動送信',
        description: 'API連携、メール送信、FTP転送などの外部システム連携機能',
        isCompleted: false
      }
    }
  },

  // 🎮 ゲーム／遊び系
  {
    id: 'bill-splitter',
    title: '割り勘アプリ（傾斜機能付き）',
    description: '公平で柔軟な割り勘計算！グループでの支払いがスマートに',
    category: 'games',
    icon: '💰',
    quadrants: {
      'bottom-left': {
        id: 'bill-splitter-bl',
        title: '均等割り計算',
        description: '基本的な人数均等割り計算と個人別支払額表示機能',
        isCompleted: false
      },
      'top-left': {
        id: 'bill-splitter-tl',
        title: '傾斜（幹事割／割合調整）',
        description: '幹事割増し、個人別割合調整、飲み物無しの人への配慮機能',
        isCompleted: false
      },
      'bottom-right': {
        id: 'bill-splitter-br',
        title: '結果をシェアできる（外部保存API）',
        description: 'SNSシェア、QRコード生成、短縮URL作成による結果共有機能',
        isCompleted: false
      },
      'top-right': {
        id: 'bill-splitter-tr',
        title: '複数イベントをまとめて管理',
        description: '旅行全体の支払い管理、立替精算、グループ全体の収支管理機能',
        isCompleted: false
      }
    }
  },
  {
    id: 'othello-game',
    title: 'オセロ（リバーシ）',
    description: '戦略と直感の対決！美しいUIで楽しむ本格オセロゲーム',
    category: 'games',
    icon: '⚫',
    quadrants: {
      'bottom-left': {
        id: 'othello-game-bl',
        title: 'ローカル対戦（2人）',
        description: 'オセロルールに基づく基本的な2人対戦機能と勝敗判定',
        isCompleted: false
      },
      'top-left': {
        id: 'othello-game-tl',
        title: 'AI対戦ロジック追加',
        description: 'ミニマックス法などを使用したAI思考エンジンと難易度調整',
        isCompleted: false
      },
      'bottom-right': {
        id: 'othello-game-br',
        title: 'オンラインランキング保存',
        description: 'プレイヤー戦績のクラウド保存、ランキング表示、統計機能',
        isCompleted: false
      },
      'top-right': {
        id: 'othello-game-tr',
        title: 'マルチプレイ対応',
        description: 'WebSocketを使用したリアルタイム対戦、観戦機能、チャット機能',
        isCompleted: false
      }
    }
  }
];

// テーマIDからテーマを取得する関数
export const getThemeById = (themeId: string): Theme | undefined => {
  return themes.find(theme => theme.id === themeId);
};

// カテゴリ別にテーマを取得する関数
export const getThemesByCategory = (category: 'information' | 'tools-rpa' | 'games'): Theme[] => {
  return themes.filter(theme => theme.category === category);
};

// 特定のレベルタスクを取得する関数
export const getQuadrantTask = (themeId: string, quadrant: string): any => {
  const theme = getThemeById(themeId);
  if (!theme) return null;
  return theme.quadrants[quadrant as keyof typeof theme.quadrants];
};

// 全レベルタスクの総数を取得
export const getTotalQuadrantTasks = (): number => {
  return themes.length * 4; // 10 themes × 4 levels = 40 tasks
};
