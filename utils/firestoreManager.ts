import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  FirestoreUserProgress, 
  CompletedTask, 
  FirestoreUserData, 
  FirestoreCompletedTask 
} from '@/types/firestore';
import { User } from '@/types/theme';
import { QUADRANT_CONFIG } from '@/types/theme';

// Firestore進捗管理クラス
export class FirestoreProgressManager {
  private static COLLECTION_NAME = 'userProgress';

  // Firestoreタイムスタンプを日付に変換
  private static timestampToDate(timestamp: any): Date {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate();
    }
    return new Date();
  }

  // 日付をFirestoreタイムスタンプに変換
  private static dateToTimestamp(date: Date): any {
    return Timestamp.fromDate(date);
  }

  // FirestoreデータをJavaScriptオブジェクトに変換
  private static convertFromFirestore(firestoreData: FirestoreUserData): FirestoreUserProgress {
    return {
      id: firestoreData.id,
      completedTasks: firestoreData.completedTasks.map(task => ({
        taskId: task.taskId,
        themeId: task.themeId,
        level: task.level,
        levelName: task.levelName,
        completedAt: this.timestampToDate(task.completedAt),
        difficulty: task.difficulty
      })),
      lastLogin: this.timestampToDate(firestoreData.lastLogin),
      createdAt: this.timestampToDate(firestoreData.createdAt),
      updatedAt: this.timestampToDate(firestoreData.updatedAt)
    };
  }

  // JavaScriptオブジェクトをFirestoreデータに変換
  private static convertToFirestore(data: Partial<FirestoreUserProgress>): Partial<FirestoreUserData> {
    const result: Partial<FirestoreUserData> = {};
    
    if (data.id) result.id = data.id;
    if (data.completedTasks) {
      result.completedTasks = data.completedTasks.map(task => ({
        taskId: task.taskId,
        themeId: task.themeId,
        level: task.level,
        levelName: task.levelName,
        completedAt: this.dateToTimestamp(task.completedAt),
        difficulty: task.difficulty
      }));
    }
    if (data.lastLogin) result.lastLogin = this.dateToTimestamp(data.lastLogin);
    if (data.createdAt) result.createdAt = this.dateToTimestamp(data.createdAt);
    if (data.updatedAt) result.updatedAt = this.dateToTimestamp(data.updatedAt);
    
    return result;
  }

  // ユーザー進捗を取得
  static async getUserProgress(userId: string): Promise<FirestoreUserProgress | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as FirestoreUserData;
        return this.convertFromFirestore(data);
      }
      
      return null;
    } catch (error) {
      console.error('ユーザー進捗取得エラー:', error);
      return null;
    }
  }

  // 新規ユーザーを作成
  static async createUser(userId: string): Promise<boolean> {
    try {
      const now = new Date();
      const userData: FirestoreUserData = {
        id: userId,
        completedTasks: [],
        lastLogin: this.dateToTimestamp(now),
        createdAt: this.dateToTimestamp(now),
        updatedAt: this.dateToTimestamp(now)
      };

      const docRef = doc(db, this.COLLECTION_NAME, userId);
      await setDoc(docRef, userData);
      
      return true;
    } catch (error) {
      console.error('ユーザー作成エラー:', error);
      return false;
    }
  }

  // ログイン時刻を更新
  static async updateLastLogin(userId: string): Promise<boolean> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, userId);
      await updateDoc(docRef, {
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('ログイン時刻更新エラー:', error);
      return false;
    }
  }

  // レベル完了を記録
  static async completeLevel(userId: string, themeId: string, level: string): Promise<boolean> {
    try {
      const levelConfig = QUADRANT_CONFIG[level as keyof typeof QUADRANT_CONFIG];
      const taskId = `${themeId}-${level}`;
      
      const completedTask: FirestoreCompletedTask = {
        taskId,
        themeId,
        level,
        levelName: levelConfig?.name || level,
        completedAt: serverTimestamp(),
      };

      const docRef = doc(db, this.COLLECTION_NAME, userId);
      await updateDoc(docRef, {
        completedTasks: arrayUnion(completedTask),
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('レベル完了記録エラー:', error);
      return false;
    }
  }

  // レベル完了を取り消し
  static async uncompleteLevel(userId: string, themeId: string, level: string): Promise<boolean> {
    try {
      // まず現在のデータを取得
      const userProgress = await this.getUserProgress(userId);
      if (!userProgress) return false;

      // 該当するタスクを見つけて削除
      const taskId = `${themeId}-${level}`;
      const taskToRemove = userProgress.completedTasks.find(task => task.taskId === taskId);
      
      if (!taskToRemove) return true; // 既に存在しない場合は成功とする

      // Firestore形式に変換
      const firestoreTask: FirestoreCompletedTask = {
        taskId: taskToRemove.taskId,
        themeId: taskToRemove.themeId,
        level: taskToRemove.level,
        levelName: taskToRemove.levelName,
        completedAt: this.dateToTimestamp(taskToRemove.completedAt),
        difficulty: taskToRemove.difficulty
      };

      const docRef = doc(db, this.COLLECTION_NAME, userId);
      await updateDoc(docRef, {
        completedTasks: arrayRemove(firestoreTask),
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('レベル完了取り消しエラー:', error);
      return false;
    }
  }

  // 特定レベルの完了状態を確認
  static async isLevelCompleted(userId: string, themeId: string, level: string): Promise<boolean> {
    try {
      const userProgress = await this.getUserProgress(userId);
      if (!userProgress) return false;

      const taskId = `${themeId}-${level}`;
      return userProgress.completedTasks.some(task => task.taskId === taskId);
    } catch (error) {
      console.error('レベル完了状態確認エラー:', error);
      return false;
    }
  }

  // ローカルストレージからFirestoreへのデータ移行
  static async migrateFromLocalStorage(userId: string): Promise<boolean> {
    try {
      // ローカルストレージからデータを取得
      const localUser = localStorage.getItem('kadai_current_user');
      const localProgress = localStorage.getItem('kadai_theme_progress');
      const localCompleted = localStorage.getItem('kadai_completed_quadrants');

      if (!localUser) return false;

      const user = JSON.parse(localUser) as User;
      const progress = localProgress ? JSON.parse(localProgress) : {};
      const completed = localCompleted ? JSON.parse(localCompleted) : [];

      // Firestore用のデータに変換
      const completedTasks: CompletedTask[] = completed.map((item: any) => {
        const levelConfig = QUADRANT_CONFIG[item.quadrant as keyof typeof QUADRANT_CONFIG];
        return {
          taskId: `${item.themeId}-${item.quadrant}`,
          themeId: item.themeId,
          level: item.quadrant,
          levelName: levelConfig?.name || item.quadrant,
          completedAt: new Date(item.completedAt),
        };
      });

      // Firestoreに保存
      const now = new Date();
      const userData: FirestoreUserData = {
        id: userId,
        completedTasks: completedTasks.map(task => ({
          taskId: task.taskId,
          themeId: task.themeId,
          level: task.level,
          levelName: task.levelName,
          completedAt: this.dateToTimestamp(task.completedAt),
          difficulty: task.difficulty
        })),
        lastLogin: this.dateToTimestamp(now),
        createdAt: this.dateToTimestamp(now),
        updatedAt: this.dateToTimestamp(now)
      };

      const docRef = doc(db, this.COLLECTION_NAME, userId);
      await setDoc(docRef, userData);

      console.log('ローカルストレージからFirestoreへの移行が完了しました');
      return true;
    } catch (error) {
      console.error('データ移行エラー:', error);
      return false;
    }
  }

  // 統計情報を取得
  static async getStats(userId: string): Promise<{
    totalCompleted: number;
    completionRate: number;
    recentTasks: CompletedTask[];
  } | null> {
    try {
      const userProgress = await this.getUserProgress(userId);
      if (!userProgress) return null;

      const totalTasks = 40; // 10テーマ × 4レベル
      const totalCompleted = userProgress.completedTasks.length;
      const completionRate = Math.round((totalCompleted / totalTasks) * 100);
      
      // 最近完了したタスク（最大10件）
      const recentTasks = userProgress.completedTasks
        .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
        .slice(0, 10);

      return {
        totalCompleted,
        completionRate,
        recentTasks
      };
    } catch (error) {
      console.error('統計情報取得エラー:', error);
      return null;
    }
  }
}

export default FirestoreProgressManager;
