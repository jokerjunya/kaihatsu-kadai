// 段階的難易度システムの状態管理ユーティリティ

export type TaskLevel = 'S' | 'A' | 'B';

const STORAGE_KEY_PREFIX = 'kadai_task_level_';
const COMPLETION_KEY_PREFIX = 'kadai_task_completion_';

export class TaskLevelManager {
  // 指定されたタスクの現在レベルを取得
  static getCurrentLevel(taskId: string): TaskLevel {
    if (typeof window === 'undefined') return 'S';
    
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${taskId}`);
    return (stored as TaskLevel) || 'S';
  }

  // 指定されたタスクの現在レベルを保存
  static setCurrentLevel(taskId: string, level: TaskLevel): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${taskId}`, level);
  }

  // 指定されたタスクの指定レベルの完了状態を取得
  static isLevelCompleted(taskId: string, level: TaskLevel): boolean {
    if (typeof window === 'undefined') return false;
    
    const stored = localStorage.getItem(`${COMPLETION_KEY_PREFIX}${taskId}_${level}`);
    return stored === 'true';
  }

  // 指定されたタスクの指定レベルを完了としてマーク
  static markLevelCompleted(taskId: string, level: TaskLevel): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(`${COMPLETION_KEY_PREFIX}${taskId}_${level}`, 'true');
    
    // 完了履歴も記録
    this.addCompletionHistory(taskId, level);
  }

  // 完了履歴を追加
  private static addCompletionHistory(taskId: string, level: TaskLevel): void {
    if (typeof window === 'undefined') return;
    
    const historyKey = 'kadai_completion_history';
    const existing = localStorage.getItem(historyKey);
    const history = existing ? JSON.parse(existing) : [];
    
    const newEntry = {
      taskId,
      level,
      completedAt: Date.now()
    };
    
    history.unshift(newEntry);
    
    // 最新50件のみ保持
    const trimmedHistory = history.slice(0, 50);
    localStorage.setItem(historyKey, JSON.stringify(trimmedHistory));
  }

  // 完了履歴を取得
  static getCompletionHistory(limit: number = 10): Array<{taskId: string, level: TaskLevel, completedAt: number}> {
    if (typeof window === 'undefined') return [];
    
    const historyKey = 'kadai_completion_history';
    const stored = localStorage.getItem(historyKey);
    const history = stored ? JSON.parse(stored) : [];
    
    return history.slice(0, limit);
  }

  // 指定されたタスクの全レベル完了状況を取得
  static getTaskProgress(taskId: string): {S: boolean, A: boolean, B: boolean} {
    return {
      S: this.isLevelCompleted(taskId, 'S'),
      A: this.isLevelCompleted(taskId, 'A'),
      B: this.isLevelCompleted(taskId, 'B')
    };
  }

  // 全タスクの完了数を取得
  static getTotalCompletedCount(): number {
    if (typeof window === 'undefined') return 0;
    
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(COMPLETION_KEY_PREFIX) && localStorage.getItem(key) === 'true') {
        count++;
      }
    }
    return count;
  }

  // レベル切り替えロジック
  static getNextLevel(currentLevel: TaskLevel): TaskLevel | null {
    switch (currentLevel) {
      case 'S': return 'A';
      case 'A': return 'B';
      case 'B': return null;
      default: return null;
    }
  }

  static getPreviousLevel(currentLevel: TaskLevel): TaskLevel | null {
    switch (currentLevel) {
      case 'S': return null;
      case 'A': return 'S';
      case 'B': return 'A';
      default: return null;
    }
  }
}

export default TaskLevelManager;
