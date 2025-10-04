// Firebase設定とFirestore初期化
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyDQCscmHZwkY--Xd7q9H6_pUhPvg3PLQcU",
  authDomain: "kadai-21aac.firebaseapp.com",
  projectId: "kadai-21aac",
  storageBucket: "kadai-21aac.firebasestorage.app",
  messagingSenderId: "680407309933",
  appId: "1:680407309933:web:925d5da4fcc73855ee2964",
  measurementId: "G-WWLN24N628"
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// Firestoreを初期化
export const db = getFirestore(app);

// Analytics（ブラウザでのみ使用）
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
