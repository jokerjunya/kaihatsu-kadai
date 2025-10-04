// 新しいテーマベースのデータ構造定義

// ヒントシステム用の型定義
export interface TaskHint {
  detailed: string; // 詳細な実装指針
  tips: string[]; // 実装のコツ（3-5項目）
  resources: string[]; // 参考リソース（3-5項目）
}

// 段階的難易度システム用の新しい型定義
export interface TaskTier {
  level: 'S' | 'A' | 'B'; // S: 抽象（最高難度）、A: 中、B: 低（最具体）
  summary: string; // 現在レベルの短い要約テキスト
  uxHints: string[]; // UX/UIヒント（3点以内）
  techHints: string[]; // 技術ヒント（3点以内）
  acceptance: string[]; // 受け入れ条件（Done判定の最小要件）
}

export interface EnhancedQuadrantTask {
  id: string;
  title: string;
  description: string; // 基本説明（後方互換性のため保持）
  tiers: TaskTier[]; // 段階的難易度データ
  isCompleted: boolean;
}

export interface Theme {
  id: string;
  title: string;
  description: string; // やりたくなる一文
  category: 'information' | 'tools-rpa' | 'games';
  icon: string;
  quadrants: {
    'bottom-left': QuadrantTask;
    'top-left': QuadrantTask;
    'bottom-right': QuadrantTask;
    'top-right': QuadrantTask;
  };
}

export interface QuadrantTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  hint?: TaskHint; // オプショナルなヒント情報
}

// 既存の型定義も維持（下位互換性のため）
export interface User {
  id: string;
  completedTasks: string[]; // これは now quadrant task IDs
}

// アプリケーションの状態管理用型定義（更新）
export interface AppState {
  currentUser: User | null;
  selectedTheme: string | null;
  themeProgress: {
    [themeId: string]: {
      [quadrant: string]: boolean; // completed status
    }
  };
}

// アプリケーションのアクション型定義（更新）
export type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SELECT_THEME'; payload: string | null }
  | { type: 'COMPLETE_QUADRANT'; payload: { themeId: string; quadrant: string } }
  | { type: 'LOGOUT' };

// ローカルストレージのキー定数
export const STORAGE_KEYS = {
  CURRENT_USER: 'kadai_current_user',
  THEME_PROGRESS: 'kadai_theme_progress',
  COMPLETED_QUADRANTS: 'kadai_completed_quadrants',
} as const;

// 4レベルの定義（更新）
export const QUADRANT_CONFIG = {
  'bottom-left': {
    name: 'レベル1',
    description: 'シンプルで自己完結型の実装',
    position: { row: 2, col: 1 },
    color: 'yellow',
    fullName: '内部単純 × 外部依存なし'
  },
  'top-left': {
    name: 'レベル2',
    description: '複雑だが自己完結型の実装',
    position: { row: 1, col: 1 },
    color: 'purple',
    fullName: '内部複雑 × 外部依存なし'
  },
  'bottom-right': {
    name: 'レベル3',
    description: 'シンプルだが外部連携が必要な実装',
    position: { row: 2, col: 2 },
    color: 'blue',
    fullName: '内部単純 × 外部依存あり'
  },
  'top-right': {
    name: 'レベル4',
    description: '複雑で外部連携も必要な実装',
    position: { row: 1, col: 2 },
    color: 'gray',
    fullName: '内部複雑 × 外部依存あり'
  }
} as const;;

// カテゴリの表示設定
export const CATEGORY_CONFIG = {
  'information': {
    name: '📊 情報系',
    description: 'データを取得・表示・分析するアプリケーション',
    color: 'blue'
  },
  'tools-rpa': {
    name: '📂 ツール／RPA系', 
    description: '作業を自動化・効率化するツール',
    color: 'green'
  },
  'games': {
    name: '🎮 ゲーム／遊び系',
    description: '楽しみながら学べるインタラクティブアプリ',
    color: 'purple'
  }
} as const;
