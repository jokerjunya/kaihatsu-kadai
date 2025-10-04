import { User, AppState, STORAGE_KEYS } from '@/types/theme';
import { getTotalQuadrantTasks } from '@/utils/themeData';

// テーマベースのローカルストレージ管理クラス
class ThemeStorageManager {
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

  // テーマ進捗の管理
  static getThemeProgress(): { [themeId: string]: { [quadrant: string]: boolean } } {
    const progressData = this.safeGetItem(STORAGE_KEYS.THEME_PROGRESS);
    if (!progressData) return {};
    
    try {
      return JSON.parse(progressData);
    } catch (error) {
      console.error('テーマ進捗データの解析エラー:', error);
      return {};
    }
  }

  static setThemeProgress(progress: { [themeId: string]: { [quadrant: string]: boolean } }): boolean {
    return this.safeSetItem(STORAGE_KEYS.THEME_PROGRESS, JSON.stringify(progress));
  }

  // 特定レベルの完了状態を更新
  static completeQuadrant(themeId: string, quadrant: string): boolean {
    const currentProgress = this.getThemeProgress();
    
    if (!currentProgress[themeId]) {
      currentProgress[themeId] = {};
    }
    
    currentProgress[themeId][quadrant] = true;
    
    // ユーザーの完了タスクリストも更新
    const user = this.getCurrentUser();
    if (user) {
      const quadrantTaskId = `${themeId}-${quadrant}`;
      if (!user.completedTasks.includes(quadrantTaskId)) {
        user.completedTasks.push(quadrantTaskId);
        this.setCurrentUser(user);
      }
    }
    
    return this.setThemeProgress(currentProgress);
  }

  // 特定レベルを未完了状態に戻す
  static uncompleteQuadrant(themeId: string, quadrant: string): boolean {
    try {
      const currentProgress = this.getThemeProgress();
      
      if (currentProgress[themeId]) {
        currentProgress[themeId][quadrant] = false;
      }
      
      // ユーザーの完了タスクリストからも削除
      const user = this.getCurrentUser();
      if (user) {
        const quadrantTaskId = `${themeId}-${quadrant}`;
        const index = user.completedTasks.indexOf(quadrantTaskId);
        if (index > -1) {
          user.completedTasks.splice(index, 1);
          this.setCurrentUser(user);
        }
      }
      
      // 完了履歴からも削除
      this.removeFromCompletedHistory(themeId, quadrant);
      
      return this.setThemeProgress(currentProgress);
    } catch (error) {
      console.error('未完了処理エラー:', error);
      return false;
    }
  }

  // 完了履歴から特定のレベルを削除する
  private static removeFromCompletedHistory(themeId: string, quadrant: string): void {
    try {
      const completedData = this.safeGetItem(STORAGE_KEYS.COMPLETED_QUADRANTS);
      if (!completedData) return;
      
      const completed = JSON.parse(completedData);
      const filteredCompleted = completed.filter((item: any) => 
        !(item.themeId === themeId && item.quadrant === quadrant)
      );
      
      this.safeSetItem(STORAGE_KEYS.COMPLETED_QUADRANTS, JSON.stringify(filteredCompleted));
    } catch (error) {
      console.error('完了履歴削除エラー:', error);
    }
  }

  // 特定レベルの完了状態を確認
  static isQuadrantCompleted(themeId: string, quadrant: string): boolean {
    const progress = this.getThemeProgress();
    return progress[themeId]?.[quadrant] || false;
  }

  // テーマの完了レベル数を取得
  static getThemeCompletedCount(themeId: string): number {
    const progress = this.getThemeProgress();
    const themeProgress = progress[themeId];
    if (!themeProgress) return 0;
    
    return Object.values(themeProgress).filter(completed => completed).length;
  }

  // 全体の完了レベル数を取得
  static getTotalCompletedCount(): number {
    const progress = this.getThemeProgress();
    let total = 0;
    
    Object.values(progress).forEach(themeProgress => {
      total += Object.values(themeProgress).filter(completed => completed).length;
    });
    
    return total;
  }

  // 全体の達成率を取得（パーセンテージ）
  static getTotalCompletionRate(): number {
    const completed = this.getTotalCompletedCount();
    const total = getTotalQuadrantTasks();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  // 最近完了したレベルタスクを取得（履歴用）
  static getRecentCompletedTasks(limit: number = 10): Array<{
    themeId: string;
    quadrant: string;
    completedAt: string;
  }> {
    const completedData = this.safeGetItem(STORAGE_KEYS.COMPLETED_QUADRANTS);
    if (!completedData) return [];
    
    try {
      const completed = JSON.parse(completedData);
      return completed
        .sort((a: any, b: any) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('完了履歴データの解析エラー:', error);
      return [];
    }
  }

  // 完了履歴に追加
  static addCompletedTaskToHistory(themeId: string, quadrant: string): boolean {
    const currentHistory = this.getRecentCompletedTasks(100); // 最大100件保持
    const newEntry = {
      themeId,
      quadrant,
      completedAt: new Date().toISOString()
    };
    
    // 既に存在する場合は更新しない
    const exists = currentHistory.some(
      entry => entry.themeId === themeId && entry.quadrant === quadrant
    );
    
    if (!exists) {
      currentHistory.unshift(newEntry);
      return this.safeSetItem(
        STORAGE_KEYS.COMPLETED_QUADRANTS, 
        JSON.stringify(currentHistory.slice(0, 100))
      );
    }
    
    return true;
  }

  // アプリケーション状態の初期化
  static initializeAppState(): AppState {
    return {
      currentUser: this.getCurrentUser(),
      selectedTheme: null,
      themeProgress: this.getThemeProgress()
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

  // 既存データからの移行（一度だけ実行）
  static migrateFromOldData(): boolean {
    try {
      // 既存のローカルストレージから移行
      const oldUser = localStorage.getItem('kadai_current_user');
      if (oldUser && !this.getCurrentUser()) {
        const userData = JSON.parse(oldUser);
        this.setCurrentUser({
          id: userData.id,
          completedTasks: userData.completedTasks || []
        });
      }
      return true;
    } catch (error) {
      console.error('データ移行エラー:', error);
      return false;
    }
  }
}

export default ThemeStorageManager;
