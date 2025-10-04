import { User, AppState, STORAGE_KEYS } from '@/types/theme';
import { getTotalQuadrantTasks } from '@/utils/themeData';
import FirestoreProgressManager from '@/utils/firestoreManager';

// テーマベースのローカルストレージ管理クラス（Firestore連携対応）
class ThemeStorageManager {
  private static isFirestoreEnabled = true; // Firestore使用フラグ
  
  // ユーザーIDベースのキーを生成
  private static getUserKey(userId: string, baseKey: string): string {
    return `${baseKey}_${userId}`;
  }
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

  // テーマ進捗の管理（ユーザーID別）
  static getThemeProgress(userId?: string): { [themeId: string]: { [quadrant: string]: boolean } } {
    if (!userId) {
      const user = this.getCurrentUser();
      if (!user) return {};
      userId = user.id;
    }
    
    const progressKey = this.getUserKey(userId, STORAGE_KEYS.THEME_PROGRESS);
    const progressData = this.safeGetItem(progressKey);
    if (!progressData) return {};

    try {
      return JSON.parse(progressData);
    } catch (error) {
      console.error('テーマ進捗データの解析エラー:', error);
      return {};
    }
  }

  static setThemeProgress(progress: { [themeId: string]: { [quadrant: string]: boolean } }, userId?: string): boolean {
    if (!userId) {
      const user = this.getCurrentUser();
      if (!user) return false;
      userId = user.id;
    }
    
    const progressKey = this.getUserKey(userId, STORAGE_KEYS.THEME_PROGRESS);
    return this.safeSetItem(progressKey, JSON.stringify(progress));
  }

  // 特定レベルの完了状態を更新
  static async completeQuadrant(themeId: string, quadrant: string): Promise<boolean> {
    const user = this.getCurrentUser();
    if (!user) return false;

    // Firestore連携
    if (this.isFirestoreEnabled) {
      const success = await FirestoreProgressManager.completeLevel(user.id, themeId, quadrant);
      if (!success) {
        console.warn('Firestore更新に失敗、ローカルストレージにフォールバック');
      }
    }

    // ローカルストレージ更新（フォールバック含む）
    const currentProgress = this.getThemeProgress(user.id);

    if (!currentProgress[themeId]) {
      currentProgress[themeId] = {};
    }

    currentProgress[themeId][quadrant] = true;

    // ユーザーの完了タスクリストも更新
    const quadrantTaskId = `${themeId}-${quadrant}`;
    if (!user.completedTasks.includes(quadrantTaskId)) {
      user.completedTasks.push(quadrantTaskId);
      this.setCurrentUser(user);
    }

    return this.setThemeProgress(currentProgress, user.id);
  }

  // 特定レベルを未完了状態に戻す
  static async uncompleteQuadrant(themeId: string, quadrant: string): Promise<boolean> {
    try {
      const user = this.getCurrentUser();
      if (!user) return false;

      // Firestore連携
      if (this.isFirestoreEnabled) {
        const success = await FirestoreProgressManager.uncompleteLevel(user.id, themeId, quadrant);
        if (!success) {
          console.warn('Firestore更新に失敗、ローカルストレージにフォールバック');
        }
      }

      // ローカルストレージ更新（フォールバック含む）
      const currentProgress = this.getThemeProgress(user.id);

      if (currentProgress[themeId]) {
        currentProgress[themeId][quadrant] = false;
      }

      // ユーザーの完了タスクリストからも削除
      const quadrantTaskId = `${themeId}-${quadrant}`;
      const index = user.completedTasks.indexOf(quadrantTaskId);
      if (index > -1) {
        user.completedTasks.splice(index, 1);
        this.setCurrentUser(user);
      }

      // 完了履歴からも削除
      this.removeFromCompletedHistory(themeId, quadrant, user.id);

      return this.setThemeProgress(currentProgress, user.id);
    } catch (error) {
      console.error('未完了処理エラー:', error);
      return false;
    }
  }

  // 完了履歴から特定のレベルを削除する
  private static removeFromCompletedHistory(themeId: string, quadrant: string, userId: string): void {
    try {
      const completedKey = this.getUserKey(userId, STORAGE_KEYS.COMPLETED_QUADRANTS);
      const completedData = this.safeGetItem(completedKey);
      if (!completedData) return;

      const completed = JSON.parse(completedData);
      const filteredCompleted = completed.filter((item: any) =>
        !(item.themeId === themeId && item.quadrant === quadrant)
      );

      this.safeSetItem(completedKey, JSON.stringify(filteredCompleted));
    } catch (error) {
      console.error('完了履歴削除エラー:', error);
    }
  }

  // 特定レベルの完了状態を確認
  static isQuadrantCompleted(themeId: string, quadrant: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    const progress = this.getThemeProgress(user.id);
    return progress[themeId]?.[quadrant] || false;
  }

  // テーマの完了レベル数を取得
  static getThemeCompletedCount(themeId: string): number {
    const user = this.getCurrentUser();
    if (!user) return 0;
    
    const progress = this.getThemeProgress(user.id);
    const themeProgress = progress[themeId];
    if (!themeProgress) return 0;

    return Object.values(themeProgress).filter(completed => completed).length;
  }

  // 全体の完了レベル数を取得
  static getTotalCompletedCount(): number {
    const user = this.getCurrentUser();
    if (!user) return 0;
    
    const progress = this.getThemeProgress(user.id);
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
    const user = this.getCurrentUser();
    if (!user) return [];
    
    const completedKey = this.getUserKey(user.id, STORAGE_KEYS.COMPLETED_QUADRANTS);
    const completedData = this.safeGetItem(completedKey);
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
    const user = this.getCurrentUser();
    if (!user) return false;
    
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
      const completedKey = this.getUserKey(user.id, STORAGE_KEYS.COMPLETED_QUADRANTS);
      return this.safeSetItem(
        completedKey, 
        JSON.stringify(currentHistory.slice(0, 100))
      );
    }
    
    return true;
  }

  // アプリケーション状態の初期化
  static initializeAppState(): AppState {
    const user = this.getCurrentUser();
    return {
      currentUser: user,
      selectedTheme: null,
      themeProgress: user ? this.getThemeProgress(user.id) : {}
    };
  }

  // 全データをクリアする（デバッグ用）
  static clearAllData(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      // 全てのkadai関連データを削除
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('kadai_')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      console.log('全データクリア完了:', keysToRemove);
      return true;
    } catch (error) {
      console.error('全データ削除エラー:', error);
      return false;
    }
  }

  // Firestoreからローカルストレージへの初期同期
  static async syncFromFirestore(userId: string): Promise<boolean> {
    if (!this.isFirestoreEnabled) return false;

    try {
      const firestoreData = await FirestoreProgressManager.getUserProgress(userId);
      if (!firestoreData) return false;

      // ローカルストレージを更新
      const progress: { [themeId: string]: { [quadrant: string]: boolean } } = {};
      const completedHistory: any[] = [];

      firestoreData.completedTasks.forEach(task => {
        if (!progress[task.themeId]) {
          progress[task.themeId] = {};
        }
        progress[task.themeId][task.level] = true;

        completedHistory.push({
          themeId: task.themeId,
          quadrant: task.level,
          completedAt: task.completedAt.toISOString()
        });
      });

      // ユーザー別のキーでローカルストレージを更新
      const progressKey = this.getUserKey(userId, STORAGE_KEYS.THEME_PROGRESS);
      const completedKey = this.getUserKey(userId, STORAGE_KEYS.COMPLETED_QUADRANTS);
      
      this.safeSetItem(progressKey, JSON.stringify(progress));
      this.safeSetItem(completedKey, JSON.stringify(completedHistory));

      // ユーザー情報も更新
      const user: User = {
        id: userId,
        completedTasks: firestoreData.completedTasks.map(task => task.taskId)
      };
      this.setCurrentUser(user);

      console.log('Firestoreからローカルストレージへの同期が完了しました');
      return true;
    } catch (error) {
      console.error('Firestore同期エラー:', error);
      return false;
    }
  }

  // ローカルストレージからFirestoreへの移行
  static async migrateToFirestore(userId: string): Promise<boolean> {
    if (!this.isFirestoreEnabled) return false;

    try {
      const success = await FirestoreProgressManager.migrateFromLocalStorage(userId);
      if (success) {
        console.log('ローカルストレージからFirestoreへの移行が完了しました');
        // ログイン時刻も更新
        await FirestoreProgressManager.updateLastLogin(userId);
      }
      return success;
    } catch (error) {
      console.error('Firestore移行エラー:', error);
      return false;
    }
  }

  // ユーザー初期化（新規登録 or 既存ユーザーの同期）
  static async initializeUser(userId: string): Promise<boolean> {
    if (!this.isFirestoreEnabled) {
      console.log('Firestore無効のため初期化をスキップ');
      return true;
    }

    try {
      console.log('Firestore初期化開始:', userId);
      
      // Firestoreでユーザーの存在確認
      const existingUser = await FirestoreProgressManager.getUserProgress(userId);
      console.log('既存ユーザー確認結果:', existingUser ? '存在' : '新規');
      
      if (existingUser) {
        // 既存ユーザー: Firestoreからローカルストレージに同期
        console.log('既存ユーザー: Firestoreから同期開始');
        await this.syncFromFirestore(userId);
        await FirestoreProgressManager.updateLastLogin(userId);
        console.log('既存ユーザー同期完了');
      } else {
        // 新規ユーザー: ローカルストレージがあれば移行、なければ新規作成
        const localUser = this.getCurrentUser();
        console.log('ローカルユーザー確認:', localUser);
        
        if (localUser && localUser.completedTasks.length > 0) {
          // ローカルデータがある場合は移行
          console.log('ローカルデータ移行開始');
          await this.migrateToFirestore(userId);
          console.log('ローカルデータ移行完了');
        } else {
          // 完全に新規の場合
          console.log('新規ユーザー作成開始');
          await FirestoreProgressManager.createUser(userId);
          console.log('新規ユーザー作成完了');
        }
      }

      return true;
    } catch (error) {
      console.error('ユーザー初期化エラー:', error);
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
