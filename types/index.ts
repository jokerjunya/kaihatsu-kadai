// ユーザー情報の型定義
export interface User {
  id: string;
  completedTasks: string[];
}

// 課題の型定義
export interface Task {
  id: string;
  categoryId: string;
  title: string;
  difficultySLevel: string; // 抽象的な課題内容
  difficultyALevel: string; // 具体的な課題内容
}

// カテゴリの型定義
export interface Category {
  id: string;
  name: string;
  description: string;
  quadrant: 'bottom-left' | 'top-left' | 'bottom-right' | 'top-right';
}

// アプリケーションの状態管理用型定義
export interface AppState {
  currentUser: User | null;
  selectedCategory: string | null;
  taskProgress: {
    [taskId: string]: {
      selectedDifficulty: 'S' | 'A';
      isCompleted: boolean;
    }
  };
}

// アプリケーションのアクション型定義
export type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SELECT_CATEGORY'; payload: string | null }
  | { type: 'START_TASK'; payload: { taskId: string; difficulty: 'S' | 'A' } }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'LOGOUT' };

// ローカルストレージのキー定数
export const STORAGE_KEYS = {
  CURRENT_USER: 'kadai_current_user',
  TASK_PROGRESS: 'kadai_task_progress',
  COMPLETED_TASKS: 'kadai_completed_tasks',
} as const;

// 4レベルの定義
export const QUADRANT_CONFIG = {
  'bottom-left': {
    name: '内部単純 × 外部依存なし',
    description: 'シンプルで自己完結型の課題',
    position: { row: 2, col: 1 }
  },
  'top-left': {
    name: '内部複雑 × 外部依存なし',
    description: '複雑だが自己完結型の課題',
    position: { row: 1, col: 1 }
  },
  'bottom-right': {
    name: '内部単純 × 外部依存あり',
    description: 'シンプルだが外部連携が必要な課題',
    position: { row: 2, col: 2 }
  },
  'top-right': {
    name: '内部複雑 × 外部依存あり',
    description: '複雑で外部連携も必要な課題',
    position: { row: 1, col: 2 }
  }
} as const;
