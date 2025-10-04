import { Theme, QuadrantTask, TaskHint } from '@/types/theme';
import { getTaskHint } from './hintData';

// 9課題テーマのサンプルデータ（最終版・指定順序）
export const themes: Theme[] = [
  // 1. 割り勘アプリ（傾斜機能付き）
  {
    id: 'bill-splitter',
    title: '割り勘アプリ（傾斜機能付き）',
    description: '公平で柔軟な割り勘計算！グループでの支払いがスマートに',
    category: 'games',
    icon: '💰',
    quadrants: {
      'bottom-left': {
        id: 'bill-splitter-bl',
        title: 'レベル1',
        description: '名前を登録し、人数と合計金額を入力すると均等割の結果を表示する。',
        isCompleted: false,
        hint: getTaskHint('bill-splitter-bl')
      },
      'top-left': {
        id: 'bill-splitter-tl',
        title: 'レベル2',
        description: '人によって負担割合を変えられる（幹事割引や飲まなかった人は少なめなど）。',
        isCompleted: false,
        hint: getTaskHint('bill-splitter-tl')
      },
      'bottom-right': {
        id: 'bill-splitter-br',
        title: 'レベル3',
        description: '計算結果を保存して、共有リンクやコードで他の人に知らせられる。',
        isCompleted: false,
        hint: getTaskHint('bill-splitter-br')
      },
      'top-right': {
        id: 'bill-splitter-tr',
        title: 'レベル4',
        description: '複数イベントを登録し、割り勘履歴をまとめて一覧化する。',
        isCompleted: false,
        hint: getTaskHint('bill-splitter-tr')
      }
    }
  },

  // 2. オセロ（リバーシ）
  {
    id: 'othello-game',
    title: 'オセロ（リバーシ）',
    description: '戦略と直感の対決！美しいUIで楽しむ本格オセロゲーム',
    category: 'games',
    icon: '⚫',
    quadrants: {
      'bottom-left': {
        id: 'othello-game-bl',
        title: 'レベル1',
        description: '2人で交互に石を置いて遊べる盤面。石をひっくり返す処理を含む。',
        isCompleted: false,
        hint: getTaskHint('othello-game-bl')
      },
      'top-left': {
        id: 'othello-game-tl',
        title: 'レベル2',
        description: '1人でも遊べるように、相手の動きを追加する。',
        isCompleted: false,
        hint: getTaskHint('othello-game-tl')
      },
      'bottom-right': {
        id: 'othello-game-br',
        title: 'レベル3',
        description: '対局の結果を保存し、勝敗やスコアを一覧表示できる。',
        isCompleted: false,
        hint: getTaskHint('othello-game-br')
      },
      'top-right': {
        id: 'othello-game-tr',
        title: 'レベル4',
        description: '遠隔の相手とネット越しに2人で対戦できる。',
        isCompleted: false,
        hint: getTaskHint('othello-game-tr')
      }
    }
  },

  // 3. ファイル整理ツール
  {
    id: 'file-organizer',
    title: 'ファイル整理ツール',
    description: '散らかったファイルを自動整理！効率的なデジタル整理術',
    category: 'tools-rpa',
    icon: '📁',
    quadrants: {
      'bottom-left': {
        id: 'file-organizer-bl',
        title: 'レベル1',
        description: 'フォルダ内のファイルを種類ごとに自動で分類する。',
        isCompleted: false,
        hint: getTaskHint('file-organizer-bl')
      },
      'top-left': {
        id: 'file-organizer-tl',
        title: 'レベル2',
        description: '分類条件に大きさや作成日を加えられるようにする。',
        isCompleted: false,
        hint: getTaskHint('file-organizer-tl')
      },
      'bottom-right': {
        id: 'file-organizer-br',
        title: 'レベル3',
        description: '整理したファイルを外のサービスに送れるようにする。',
        isCompleted: false,
        hint: getTaskHint('file-organizer-br')
      },
      'top-right': {
        id: 'file-organizer-tr',
        title: 'レベル4',
        description: '複数の場所で同じルールを使い、整理結果を同期できる。',
        isCompleted: false,
        hint: getTaskHint('file-organizer-tr')
      }
    }
  },

  // 4. カレンダー連携ToDo
  {
    id: 'calendar-todo',
    title: 'カレンダー連携ToDo',
    description: 'スケジュールと一体化！時間を味方につけるタスク管理',
    category: 'tools-rpa',
    icon: '📅',
    quadrants: {
      'bottom-left': {
        id: 'calendar-todo-bl',
        title: 'レベル1',
        description: 'タスクを追加・削除できるリスト。完了したものにはチェックを付けられる。',
        isCompleted: false,
        hint: getTaskHint('calendar-todo-bl')
      },
      'top-left': {
        id: 'calendar-todo-tl',
        title: 'レベル2',
        description: 'タスクに期限や優先度を設定でき、並べ替えや強調表示もできる。',
        isCompleted: false,
        hint: getTaskHint('calendar-todo-tl')
      },
      'bottom-right': {
        id: 'calendar-todo-br',
        title: 'レベル3',
        description: 'タスクが予定表に登録され、スケジュールとつながる。',
        isCompleted: false,
        hint: getTaskHint('calendar-todo-br')
      },
      'top-right': {
        id: 'calendar-todo-tr',
        title: 'レベル4',
        description: '習慣タスクを登録し、連続達成数を表示。通知でリマインドもできる。',
        isCompleted: false,
        hint: getTaskHint('calendar-todo-tr')
      }
    }
  },

  // 5. WebスクレイピングRPA
  {
    id: 'web-scraping-rpa',
    title: 'WebスクレイピングRPA',
    description: 'ウェブを自動操縦！情報収集の新しいカタチ',
    category: 'tools-rpa',
    icon: '🤖',
    quadrants: {
      'bottom-left': {
        id: 'web-scraping-rpa-bl',
        title: 'レベル1',
        description: 'ボタンを押すと指定サイトで検索を実行し、結果を一覧で表示する。',
        isCompleted: false,
        hint: getTaskHint('web-scraping-rpa-bl')
      },
      'top-left': {
        id: 'web-scraping-rpa-tl',
        title: 'レベル2',
        description: '結果の中からタイトルや内容など、複数の要素を取り出して別々に表示する。',
        isCompleted: false,
        hint: getTaskHint('web-scraping-rpa-tl')
      },
      'bottom-right': {
        id: 'web-scraping-rpa-br',
        title: 'レベル3',
        description: '複数のサイトで複数の検索語を実行し、結果をまとめて一覧表示する。💡ワンポイント：ブラウザ操作には Playwright / Puppeteer が活用できる。',
        isCompleted: false,
        hint: getTaskHint('web-scraping-rpa-br')
      },
      'top-right': {
        id: 'web-scraping-rpa-tr',
        title: 'レベル4',
        description: '取得した情報をもとに、要点をまとめたページ（要約ビュー）を生成する。',
        isCompleted: false,
        hint: getTaskHint('web-scraping-rpa-tr')
      }
    }
  },

  // 6. 天気アプリ
  {
    id: 'weather-app',
    title: '天気アプリ',
    description: '今日の空模様から未来を読む！美しい天気予報アプリ',
    category: 'information',
    icon: '☀️',
    quadrants: {
      'bottom-left': {
        id: 'weather-app-bl',
        title: 'レベル1',
        description: 'ダミーの「今日の天気」を画面に表示する。',
        isCompleted: false,
        hint: getTaskHint('weather-app-bl')
      },
      'top-left': {
        id: 'weather-app-tl',
        title: 'レベル2',
        description: 'ダミーの気温推移を時間ごとに表示し、1日の流れを見せる。',
        isCompleted: false,
        hint: getTaskHint('weather-app-tl')
      },
      'bottom-right': {
        id: 'weather-app-br',
        title: 'レベル3',
        description: '場所を入力すると、その場所の実際の天気が表示される。',
        isCompleted: false,
        hint: getTaskHint('weather-app-br')
      },
      'top-right': {
        id: 'weather-app-tr',
        title: 'レベル4',
        description: '過去の天気を履歴に残し、週間予報や注意喚起も表示する。',
        isCompleted: false,
        hint: getTaskHint('weather-app-tr')
      }
    }
  },

  // 7. ニュースビューア
  {
    id: 'news-viewer',
    title: 'ニュースビューア',
    description: '世界の今を手のひらに！カスタマイズ可能なニュースリーダー',
    category: 'information',
    icon: '📰',
    quadrants: {
      'bottom-left': {
        id: 'news-viewer-bl',
        title: 'レベル1',
        description: 'ダミーの記事3件をタイトル・要約・リンク付きで表示。更新ボタンで切り替えられる。',
        isCompleted: false,
        hint: getTaskHint('news-viewer-bl')
      },
      'top-left': {
        id: 'news-viewer-tl',
        title: 'レベル2',
        description: '記事をお気に入りに追加して「あとで読むリスト」にまとめられる。',
        isCompleted: false,
        hint: getTaskHint('news-viewer-tl')
      },
      'bottom-right': {
        id: 'news-viewer-br',
        title: 'レベル3',
        description: '検索キーワードを入力すると、実際のウェブ上の記事が取得され一覧表示される。',
        isCompleted: false,
        hint: getTaskHint('news-viewer-br')
      },
      'top-right': {
        id: 'news-viewer-tr',
        title: 'レベル4',
        description: '記事を保存して履歴に残し、まとめて読む画面で再確認できる。',
        isCompleted: false,
        hint: getTaskHint('news-viewer-tr')
      }
    }
  },

  // 8. 経営者ダッシュボード
  {
    id: 'manager-dashboard',
    title: '経営者ダッシュボード',
    description: 'データで経営を可視化！意思決定を支援するビジネスツール',
    category: 'information',
    icon: '📊',
    quadrants: {
      'bottom-left': {
        id: 'manager-dashboard-bl',
        title: 'レベル1',
        description: '数値を表に表示する（売上、コストなど）。',
        isCompleted: false,
        hint: getTaskHint('manager-dashboard-bl')
      },
      'top-left': {
        id: 'manager-dashboard-tl',
        title: 'レベル2',
        description: '指標ごとにグラフに切り替えて表示できる。',
        isCompleted: false,
        hint: getTaskHint('manager-dashboard-tl')
      },
      'bottom-right': {
        id: 'manager-dashboard-br',
        title: 'レベル3',
        description: '複数の数値表を読み込み、同じ指標を比較できる。',
        isCompleted: false,
        hint: getTaskHint('manager-dashboard-br')
      },
      'top-right': {
        id: 'manager-dashboard-tr',
        title: 'レベル4',
        description: '複数の指標をまとめて配置したダッシュボードを作り、更新で全体が最新になる。',
        isCompleted: false,
        hint: getTaskHint('manager-dashboard-tr')
      }
    }
  },

  // 9. Excel読み取り＋自動処理（ラスボス）
  {
    id: 'excel-automation',
    title: 'Excel読み取り＋自動処理（ラスボス）',
    description: 'データの魔法使い！Excelを超えた自動処理システム',
    category: 'tools-rpa',
    icon: '📈',
    quadrants: {
      'bottom-left': {
        id: 'excel-automation-bl',
        title: 'レベル1',
        description: '表のデータを読み込み、そのまま画面に一覧表示できる。',
        isCompleted: false,
        hint: getTaskHint('excel-automation-bl')
      },
      'top-left': {
        id: 'excel-automation-tl',
        title: 'レベル2',
        description: '条件を決めて色付けや集計を行い、要点を強調した一覧にする。',
        isCompleted: false,
        hint: getTaskHint('excel-automation-tl')
      },
      'bottom-right': {
        id: 'excel-automation-br',
        title: 'レベル3',
        description: '複数の表を読み込み、共通項目で突き合わせて結果を出す。',
        isCompleted: false,
        hint: getTaskHint('excel-automation-br')
      },
      'top-right': {
        id: 'excel-automation-tr',
        title: 'レベル4',
        description: '突き合わせ結果をカードやグラフでダッシュボードにまとめ、更新で再描画される。',
        isCompleted: false,
        hint: getTaskHint('excel-automation-tr')
      }
    }
  }
];;

// カテゴリ別にテーマを取得する関数
export const getThemesByCategory = (category: 'information' | 'tools-rpa' | 'games'): Theme[] => {
  return themes.filter(theme => theme.category === category);
};

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
