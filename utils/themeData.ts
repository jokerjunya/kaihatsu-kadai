import { Theme, QuadrantTask, TaskHint } from '@/types/theme';
import { getTaskHint } from './hintData';

// 9課題テーマのサンプルデータ
export const themes: Theme[] = [
  // 🎮 ゲーム/遊び系
  {
    id: 'bill-splitter',
    title: '割り勘アプリ（傾斜機能付き）',
    description: '公平で柔軟な割り勘計算！グループでの支払いがスマートに',
    category: 'games',
    icon: '💰',
    quadrants: {
      'bottom-left': {
        id: 'bill-splitter-bl',
        title: '名前登録・均等割の結果表示',
        description: '名前を登録し、人数と合計金額を入力すると均等割の結果を表示する。',
        isCompleted: false,
        hint: getTaskHint('bill-splitter-bl')
      },
      'top-left': {
        id: 'bill-splitter-tl',
        title: '負担割合の調整機能',
        description: '人によって負担割合を変えられる（幹事割引や飲まなかった人は少なめなど）。',
        isCompleted: false,
        hint: getTaskHint('bill-splitter-tl')
      },
      'bottom-right': {
        id: 'bill-splitter-br',
        title: '計算結果の保存・共有機能',
        description: '計算結果を保存して、共有リンクやコードで他の人に知らせられる。',
        isCompleted: false,
        hint: getTaskHint('bill-splitter-br')
      },
      'top-right': {
        id: 'bill-splitter-tr',
        title: '複数イベントの履歴管理',
        description: '複数イベントを登録し、割り勘履歴をまとめて一覧化する。',
        isCompleted: false,
        hint: getTaskHint('bill-splitter-tr')
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
        title: '2人交互対戦・石ひっくり返し',
        description: '2人で交互に石を置いて遊べる盤面。石をひっくり返す処理を含む。',
        isCompleted: false,
        hint: getTaskHint('othello-game-bl')
      },
      'top-left': {
        id: 'othello-game-tl',
        title: '1人用AI対戦機能',
        description: '1人でも遊べるように、相手の動きを追加する。',
        isCompleted: false,
        hint: getTaskHint('othello-game-tl')
      },
      'bottom-right': {
        id: 'othello-game-br',
        title: '対局結果の保存・一覧表示',
        description: '対局の結果を保存し、勝敗やスコアを一覧表示できる。',
        isCompleted: false,
        hint: getTaskHint('othello-game-br')
      },
      'top-right': {
        id: 'othello-game-tr',
        title: 'ネット対戦機能',
        description: '遠隔の相手とネット越しに2人で対戦できる。',
        isCompleted: false,
        hint: getTaskHint('othello-game-tr')
      }
    }
  },

  // 🔧 ツール/RPA系
  {
    id: 'file-organizer',
    title: 'ファイル整理ツール',
    description: '散らかったファイルを自動整理！デスクトップがスッキリ片付く',
    category: 'tools-rpa',
    icon: '📁',
    quadrants: {
      'bottom-left': {
        id: 'file-organizer-bl',
        title: 'ファイル種類別自動分類',
        description: 'フォルダ内のファイルを種類ごとに自動で分類する。',
        isCompleted: false,
        hint: getTaskHint('file-organizer-bl')
      },
      'top-left': {
        id: 'file-organizer-tl',
        title: 'サイズ・日付による分類条件',
        description: '分類条件に大きさや作成日を加えられるようにする。',
        isCompleted: false,
        hint: getTaskHint('file-organizer-tl')
      },
      'bottom-right': {
        id: 'file-organizer-br',
        title: '外部サービス連携',
        description: '整理したファイルを外のサービスに送れるようにする。',
        isCompleted: false,
        hint: getTaskHint('file-organizer-br')
      },
      'top-right': {
        id: 'file-organizer-tr',
        title: '複数場所での同期機能',
        description: '複数の場所で同じルールを使い、整理結果を同期できる。',
        isCompleted: false,
        hint: getTaskHint('file-organizer-tr')
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
        title: 'タスクの追加・削除・完了チェック',
        description: 'タスクを追加・削除できるリスト。完了したものにはチェックを付けられる。',
        isCompleted: false,
        hint: getTaskHint('calendar-todo-bl')
      },
      'top-left': {
        id: 'calendar-todo-tl',
        title: '期限・優先度設定・並べ替え',
        description: 'タスクに期限や優先度を設定でき、並べ替えや強調表示もできる。',
        isCompleted: false,
        hint: getTaskHint('calendar-todo-tl')
      },
      'bottom-right': {
        id: 'calendar-todo-br',
        title: '予定表連携・スケジュール統合',
        description: 'タスクが予定表に登録され、スケジュールとつながる。',
        isCompleted: false,
        hint: getTaskHint('calendar-todo-br')
      },
      'top-right': {
        id: 'calendar-todo-tr',
        title: '習慣タスク・通知機能',
        description: '習慣タスクを登録し、連続達成数を表示。通知でリマインドもできる。',
        isCompleted: false,
        hint: getTaskHint('calendar-todo-tr')
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
        title: '指定サイト検索・結果一覧表示',
        description: 'ボタンを押すと指定サイトで検索を実行し、結果を一覧で表示する。',
        isCompleted: false,
        hint: getTaskHint('web-scraping-rpa-bl')
      },
      'top-left': {
        id: 'web-scraping-rpa-tl',
        title: '複数要素の抽出・別々表示',
        description: '結果の中からタイトルや内容など、複数の要素を取り出して別々に表示する。',
        isCompleted: false,
        hint: getTaskHint('web-scraping-rpa-tl')
      },
      'bottom-right': {
        id: 'web-scraping-rpa-br',
        title: '複数サイト・複数検索語の実行',
        description: '複数のサイトで複数の検索語を実行し、結果をまとめて一覧表示する。',
        isCompleted: false,
        hint: getTaskHint('web-scraping-rpa-br')
      },
      'top-right': {
        id: 'web-scraping-rpa-tr',
        title: '要約ページ生成機能',
        description: '取得した情報をもとに、要点をまとめたページ（要約ビュー）を生成する。',
        isCompleted: false,
        hint: getTaskHint('web-scraping-rpa-tr')
      }
    }
  },

  // 📊 情報系
  {
    id: 'weather-app',
    title: '天気アプリ',
    description: '毎日の天気を美しく、便利に確認できるパーソナル気象アプリ',
    category: 'information',
    icon: '🌤️',
    quadrants: {
      'bottom-left': {
        id: 'weather-app-bl',
        title: 'ダミー今日の天気表示',
        description: 'ダミーの「今日の天気」を画面に表示する。',
        isCompleted: false,
        hint: getTaskHint('weather-app-bl')
      },
      'top-left': {
        id: 'weather-app-tl',
        title: '時間ごと気温推移表示',
        description: 'ダミーの気温推移を時間ごとに表示し、1日の流れを見せる。',
        isCompleted: false,
        hint: getTaskHint('weather-app-tl')
      },
      'bottom-right': {
        id: 'weather-app-br',
        title: '場所入力・実際の天気取得',
        description: '場所を入力すると、その場所の実際の天気が表示される。',
        isCompleted: false,
        hint: getTaskHint('weather-app-br')
      },
      'top-right': {
        id: 'weather-app-tr',
        title: '履歴・週間予報・注意喚起',
        description: '過去の天気を履歴に残し、週間予報や注意喚起も表示する。',
        isCompleted: false,
        hint: getTaskHint('weather-app-tr')
      }
    }
  },
  {
    id: 'news-viewer',
    title: 'ニュースビューア',
    description: '最新ニュースをスマートに読める、自分だけの情報ハブを作ろう',
    category: 'information',
    icon: '📰',
    quadrants: {
      'bottom-left': {
        id: 'news-viewer-bl',
        title: 'ダミー記事3件・更新ボタン',
        description: 'ダミーの記事3件をタイトル・要約・リンク付きで表示。更新ボタンで切り替えられる。',
        isCompleted: false,
        hint: getTaskHint('news-viewer-bl')
      },
      'top-left': {
        id: 'news-viewer-tl',
        title: 'お気に入り・あとで読むリスト',
        description: '記事をお気に入りに追加して「あとで読むリスト」にまとめられる。',
        isCompleted: false,
        hint: getTaskHint('news-viewer-tl')
      },
      'bottom-right': {
        id: 'news-viewer-br',
        title: '検索キーワード・実際の記事取得',
        description: '検索キーワードを入力すると、実際のウェブ上の記事が取得され一覧表示される。',
        isCompleted: false,
        hint: getTaskHint('news-viewer-br')
      },
      'top-right': {
        id: 'news-viewer-tr',
        title: '記事保存・履歴・まとめ読み',
        description: '記事を保存して履歴に残し、まとめて読む画面で再確認できる。',
        isCompleted: false,
        hint: getTaskHint('news-viewer-tr')
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
        title: '数値を表に表示',
        description: '数値を表に表示する（売上、コストなど）。',
        isCompleted: false,
        hint: getTaskHint('manager-dashboard-bl')
      },
      'top-left': {
        id: 'manager-dashboard-tl',
        title: '指標ごとグラフ切り替え',
        description: '指標ごとにグラフに切り替えて表示できる。',
        isCompleted: false,
        hint: getTaskHint('manager-dashboard-tl')
      },
      'bottom-right': {
        id: 'manager-dashboard-br',
        title: '複数数値表の読込・比較',
        description: '複数の数値表を読み込み、同じ指標を比較できる。',
        isCompleted: false,
        hint: getTaskHint('manager-dashboard-br')
      },
      'top-right': {
        id: 'manager-dashboard-tr',
        title: 'ダッシュボード配置・全体更新',
        description: '複数の指標をまとめて配置したダッシュボードを作り、更新で全体が最新になる。',
        isCompleted: false,
        hint: getTaskHint('manager-dashboard-tr')
      }
    }
  },
  {
    id: 'excel-automation',
    title: 'Excel読み取り＋自動処理（ラスボス）',
    description: 'Excel作業を完全自動化！データ処理の新しいスタンダード',
    category: 'tools-rpa',
    icon: '📊',
    quadrants: {
      'bottom-left': {
        id: 'excel-automation-bl',
        title: '表データ読込・画面一覧表示',
        description: '表のデータを読み込み、そのまま画面に一覧表示できる。',
        isCompleted: false,
        hint: getTaskHint('excel-automation-bl')
      },
      'top-left': {
        id: 'excel-automation-tl',
        title: '条件付き色付け・集計処理',
        description: '条件を決めて色付けや集計を行い、要点を強調した一覧にする。',
        isCompleted: false,
        hint: getTaskHint('excel-automation-tl')
      },
      'bottom-right': {
        id: 'excel-automation-br',
        title: '複数表読込・突き合わせ',
        description: '複数の表を読み込み、共通項目で突き合わせて結果を出す。',
        isCompleted: false,
        hint: getTaskHint('excel-automation-br')
      },
      'top-right': {
        id: 'excel-automation-tr',
        title: 'ダッシュボード化・更新再描画',
        description: '突き合わせ結果をカードやグラフでダッシュボードにまとめ、更新で再描画される。',
        isCompleted: false,
        hint: getTaskHint('excel-automation-tr')
      }
    }
  }
];;

// テーマIDからテーマを取得する関数
export const getThemeById = (themeId: string): Theme | null => {
  try {
    if (!themeId || typeof themeId !== 'string') {
      console.warn('無効なテーマID:', themeId);
      return null;
    }
    
    const theme = themes.find(theme => theme.id === themeId);
    if (!theme) {
      console.warn('テーマが見つかりません:', themeId);
      return null;
    }
    
    return theme;
  } catch (error) {
    console.error('テーマ取得エラー:', error);
    return null;
  }
};

// カテゴリ別にテーマを取得する関数
export const getThemesByCategory = (category: 'information' | 'tools-rpa' | 'games'): Theme[] => {
  return themes.filter(theme => theme.category === category);
};

// 特定のレベルタスクを取得する関数
export const getQuadrantTask = (themeId: string, quadrant: string): QuadrantTask | null => {
  try {
    if (!themeId || !quadrant) {
      console.warn('無効なパラメータ:', { themeId, quadrant });
      return null;
    }
    
    const theme = getThemeById(themeId);
    if (!theme) {
      return null; // getThemeByIdで既にログ出力済み
    }
    
    const quadrantTask = theme.quadrants[quadrant as keyof typeof theme.quadrants];
    if (!quadrantTask) {
      console.warn('象限タスクが見つかりません:', { themeId, quadrant });
      return null;
    }
    
    return quadrantTask;
  } catch (error) {
    console.error('象限タスク取得エラー:', error);
    return null;
  }
};

// 全レベルタスクの総数を取得
export const getTotalQuadrantTasks = (): number => {
  return themes.length * 4; // 9 themes × 4 levels = 36 tasks
};
// データ検証関数
export const validateThemeData = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  try {
    // テーマの基本検証
    if (!Array.isArray(themes) || themes.length === 0) {
      errors.push('テーマデータが存在しません');
      return { isValid: false, errors };
    }
    
    themes.forEach((theme, index) => {
      // 必須フィールドの検証
      if (!theme.id || typeof theme.id !== 'string') {
        errors.push(`テーマ${index}: IDが無効です`);
      }
      
      if (!theme.title || typeof theme.title !== 'string') {
        errors.push(`テーマ${theme.id}: タイトルが無効です`);
      }
      
      if (!theme.description || typeof theme.description !== 'string') {
        errors.push(`テーマ${theme.id}: 説明が無効です`);
      }
      
      // 象限データの検証
      const requiredQuadrants = ['bottom-left', 'top-left', 'bottom-right', 'top-right'];
      requiredQuadrants.forEach(quadrant => {
        const quadrantData = theme.quadrants[quadrant as keyof typeof theme.quadrants];
        if (!quadrantData) {
          errors.push(`テーマ${theme.id}: 象限${quadrant}が存在しません`);
        } else {
          if (!quadrantData.id || !quadrantData.title || !quadrantData.description) {
            errors.push(`テーマ${theme.id}: 象限${quadrant}の必須フィールドが不足`);
          }
        }
      });
    });
    
    // 重複ID検証
    const ids = themes.map(t => t.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      errors.push(`重複するテーマID: ${duplicateIds.join(', ')}`);
    }
    
  } catch (error) {
    errors.push(`データ検証中にエラー: ${error}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// ヒントデータの検証
export const validateHintData = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  try {
    // 全テーマの全象限のヒントが存在するかチェック
    themes.forEach(theme => {
      Object.entries(theme.quadrants).forEach(([quadrant, task]) => {
        const hint = getTaskHint(task.id);
        if (!hint) {
          errors.push(`ヒントが見つかりません: ${task.id} (${theme.title} - ${quadrant})`);
        } else {
          // ヒントの内容検証
          if (!hint.detailed || hint.detailed.length < 10) {
            errors.push(`ヒントの詳細が不足: ${task.id}`);
          }
          if (!hint.tips || hint.tips.length === 0) {
            errors.push(`ヒントのコツが不足: ${task.id}`);
          }
          if (!hint.resources || hint.resources.length === 0) {
            errors.push(`ヒントのリソースが不足: ${task.id}`);
          }
        }
      });
    });
  } catch (error) {
    errors.push(`ヒント検証中にエラー: ${error}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
// フォールバック用のデフォルトデータ
const defaultTheme: Theme = {
  id: 'default',
  title: 'デフォルトテーマ',
  description: 'システムエラー時のフォールバックテーマです',
  category: 'tools-rpa',
  icon: '⚙️',
  quadrants: {
    'bottom-left': {
      id: 'default-bl',
      title: 'レベル1タスク',
      description: 'デフォルトタスクです',
      isCompleted: false,
      hint: undefined
    },
    'top-left': {
      id: 'default-tl', 
      title: 'レベル2タスク',
      description: 'デフォルトタスクです',
      isCompleted: false,
      hint: undefined
    },
    'bottom-right': {
      id: 'default-br',
      title: 'レベル3タスク',
      description: 'デフォルトタスクです',
      isCompleted: false,
      hint: undefined
    },
    'top-right': {
      id: 'default-tr',
      title: 'レベル4タスク',
      description: 'デフォルトタスクです',
      isCompleted: false,
      hint: undefined
    }
  }
};

const defaultHint: TaskHint = {
  detailed: 'このタスクの詳細情報は現在利用できません。',
  tips: ['管理者にお問い合わせください'],
  resources: ['システム管理者']
};

// 安全なテーマ取得（フォールバック付き）
export const getThemeByIdSafe = (themeId: string): Theme => {
  const theme = getThemeById(themeId);
  return theme || defaultTheme;
};

// 安全なヒント取得（フォールバック付き）
export const getTaskHintSafe = (taskId: string): TaskHint => {
  const hint = getTaskHint(taskId);
  return hint || defaultHint;
};

// 安全な象限タスク取得（フォールバック付き）
export const getQuadrantTaskSafe = (themeId: string, quadrant: string): QuadrantTask => {
  const task = getQuadrantTask(themeId, quadrant);
  if (task) return task;
  
  // フォールバック
  return defaultTheme.quadrants[quadrant as keyof typeof defaultTheme.quadrants] || defaultTheme.quadrants['bottom-left'];
};
// 動的ヒント生成機能
export const generateDynamicHint = (taskId: string, fallbackTitle: string): TaskHint => {
  // 基本的なヒントテンプレート
  const templates = {
    detailed: [
      `${fallbackTitle}を実装する際の詳細な手順を以下に示します。`,
      `この課題では${fallbackTitle}の機能を段階的に構築していきます。`,
      `${fallbackTitle}の開発において重要なポイントを整理しました。`
    ],
    tips: [
      'まずは最小限の機能から始めましょう',
      'ユーザーの使いやすさを考慮して設計しましょう',
      'エラーハンドリングを忘れずに実装しましょう',
      'コードの可読性を保つよう心がけましょう'
    ],
    resources: [
      'MDN Web Docs',
      'React公式ドキュメント',
      'TypeScript公式ガイド',
      'Stack Overflow'
    ]
  };

  return {
    detailed: templates.detailed[Math.floor(Math.random() * templates.detailed.length)],
    tips: templates.tips.slice(0, 3),
    resources: templates.resources.slice(0, 3)
  };
};

// ヒント取得の高度な機能（フォールバック + 動的生成）
export const getAdvancedTaskHint = (taskId: string, taskTitle: string = 'このタスク'): TaskHint => {
  // 既存のヒントを試す
  const existingHint = getTaskHint(taskId);
  if (existingHint) {
    return existingHint;
  }

  // 動的生成を試す
  console.log(`ヒントが見つかりません (${taskId}), 動的生成を実行`);
  return generateDynamicHint(taskId, taskTitle);
};
