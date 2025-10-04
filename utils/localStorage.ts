import { User, Task, AppState, STORAGE_KEYS } from '@/types';

// ローカルストレージの安全な読み書きユーティリティ
class LocalStorageManager {
  // データを安全に取得する
  private static safeGetItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`LocalStorage読み取りエラー: ${key}`, error);
      return null;
    }
  }

  // データを安全に保存する
  private static safeSetItem(key: string, value: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`LocalStorage書き込みエラー: ${key}`, error);
      return false;
    }
  }

  // ユーザー情報の管理
  static getCurrentUser(): User | null {
    const userData = this.safeGetItem(STORAGE_KEYS.CURRENT_USER);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData) as User;
    } catch (error) {
      console.error('ユーザーデータの解析エラー:', error);
      return null;
    }
  }

  static setCurrentUser(user: User): boolean {
    return this.safeSetItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  static removeCurrentUser(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return true;
    } catch (error) {
      console.error('ユーザーデータの削除エラー:', error);
      return false;
    }
  }

  // 課題進捗の管理
  static getTaskProgress(): { [taskId: string]: { selectedDifficulty: 'S' | 'A'; isCompleted: boolean } } {
    const progressData = this.safeGetItem(STORAGE_KEYS.TASK_PROGRESS);
    if (!progressData) return {};
    
    try {
      return JSON.parse(progressData);
    } catch (error) {
      console.error('課題進捗データの解析エラー:', error);
      return {};
    }
  }

  static setTaskProgress(taskId: string, difficulty: 'S' | 'A', isCompleted: boolean = false): boolean {
    const currentProgress = this.getTaskProgress();
    currentProgress[taskId] = { selectedDifficulty: difficulty, isCompleted };
    
    return this.safeSetItem(STORAGE_KEYS.TASK_PROGRESS, JSON.stringify(currentProgress));
  }

  static completeTask(taskId: string): boolean {
    const currentProgress = this.getTaskProgress();
    if (currentProgress[taskId]) {
      currentProgress[taskId].isCompleted = true;
      return this.safeSetItem(STORAGE_KEYS.TASK_PROGRESS, JSON.stringify(currentProgress));
    }
    return false;
  }

  // 完了済み課題の管理
  static getCompletedTasks(userId: string): string[] {
    const user = this.getCurrentUser();
    if (!user || user.id !== userId) return [];
    return user.completedTasks;
  }

  static addCompletedTask(userId: string, taskId: string): boolean {
    const user = this.getCurrentUser();
    if (!user || user.id !== userId) return false;
    
    if (!user.completedTasks.includes(taskId)) {
      user.completedTasks.push(taskId);
      return this.setCurrentUser(user);
    }
    return true;
  }

  // アプリケーション状態の初期化
  static initializeAppState(): AppState {
    return {
      currentUser: this.getCurrentUser(),
      selectedCategory: null,
      taskProgress: this.getTaskProgress()
    };
  }

  // 全データをクリアする（デバッグ用）
  static clearAllData(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('全データ削除エラー:', error);
      return false;
    }
  }
}

export default LocalStorageManager;
