// Firestore用のデータ型定義
export interface FirestoreUserProgress {
  id: string;
  completedTasks: CompletedTask[];
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompletedTask {
  taskId: string;        // "news-viewer-bl" など
  themeId: string;       // "news-viewer"
  level: string;         // "bottom-left"
  levelName: string;     // "レベル1"
  completedAt: Date;
}

// Firestore変換用のヘルパー型
export interface FirestoreCompletedTask {
  taskId: string;
  themeId: string;
  level: string;
  levelName: string;
  completedAt: any; // Firestore Timestamp
}

export interface FirestoreUserData {
  id: string;
  completedTasks: FirestoreCompletedTask[];
  lastLogin: any; // Firestore Timestamp
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}
