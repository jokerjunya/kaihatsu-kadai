// Firebase設定とFirestore初期化
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase設定
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDQCscmHZwkY--Xd7q9H6_pUhPvg3PLQcU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "kadai-21aac.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kadai-21aac",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kadai-21aac.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "680407309933",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:680407309933:web:925d5da4fcc73855ee2964",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-WWLN24N628"
};

// Firebaseアプリを初期化
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw error;
}

// Firestoreを初期化
export const db = getFirestore(app);

// Analytics（ブラウザでのみ使用）
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
  
  // デバッグ用：グローバルにThemeStorageManagerを公開
  import('@/utils/themeStorage').then(({ default: ThemeStorageManager }) => {
    (window as unknown as Record<string, unknown>).ThemeStorageManager = ThemeStorageManager;
    console.log('デバッグ用: window.ThemeStorageManager が利用可能です');
    console.log('データクリア: window.ThemeStorageManager.clearAllData()');
  });
}

export { analytics };
export default app;
