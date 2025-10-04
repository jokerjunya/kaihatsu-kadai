'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocalStorageManager from '@/utils/localStorage';

export default function LoginPage() {
  const [userId, setUserId] = useState(''); // 明示的に空文字列で初期化
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // コンポーネントマウント時に入力をクリア
  useEffect(() => {
    setUserId(''); // 強制的に空にする
  }, []);

  // 既にログインしているかチェック（ローカルストレージは無視）
  useEffect(() => {
    // ローカルストレージのチェックを無効化
    // const currentUser = LocalStorageManager.getCurrentUser();
    // console.log('現在のユーザー:', currentUser); // デバッグ用
    
    // URLパラメータでクリアが指定されている場合はデータをクリア
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('clear') === 'true') {
      LocalStorageManager.clearAllData();
      console.log('ローカルストレージをクリアしました');
      // URLからclearパラメータを削除
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    
    // 自動ログインを無効化 - 常にログイン画面を表示
    // if (currentUser) {
    //   router.push('/dashboard');
    // }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim()) {
      alert('お名前を入力してください');
      return;
    }

    setIsLoading(true);

    try {
      // ユーザー情報を作成・保存
      const user = {
        id: userId.trim(),
        completedTasks: []
      };

      const success = LocalStorageManager.setCurrentUser(user);
      
      if (success) {
        // ダッシュボードへリダイレクト
        router.push('/dashboard');
        } else {
          alert('開始に失敗しました。再度お試しください。');
        }
      } catch (error) {
        console.error('開始エラー:', error);
        alert('開始に失敗しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* ヘッダー */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Kadai
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            4レベル課題管理アプリ
          </p>
          <div className="space-y-2 text-lg text-gray-600">
            <p>シンプルで効果的な課題管理で</p>
            <p>あなたの成長をサポートします</p>
          </div>
        </div>

        {/* フロー図 */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            シンプルな3ステップ
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            
            {/* ステップ1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">好きな課題を選ぶ</h3>
              <p className="text-sm text-gray-600 max-w-32">
                9種類の課題テーマから興味のあるものを選択
              </p>
            </div>

            {/* 矢印1 */}
            <div className="hidden md:block text-gray-400 text-2xl">
              →
            </div>
            <div className="md:hidden text-gray-400 text-2xl rotate-90">
              →
            </div>

            {/* ステップ2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">難易度を選ぶ</h3>
              <p className="text-sm text-gray-600 max-w-32">
                レベル1〜4から自分に合った難易度を選択
              </p>
            </div>

            {/* 矢印2 */}
            <div className="hidden md:block text-gray-400 text-2xl">
              →
            </div>
            <div className="md:hidden text-gray-400 text-2xl rotate-90">
              →
            </div>

            {/* ステップ3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">作ってみる</h3>
              <p className="text-sm text-gray-600 max-w-32">
                ヒントを参考に実際にコードを書いて学習
              </p>
            </div>
          </div>
        </div>

        {/* ログインフォーム */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="userId" className="block text-lg font-medium text-gray-800 mb-3 text-center">
                好きな名前でログインしてください
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="お名前を入力してください"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-form-type="other"
                data-lpignore="true"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl 
                           bg-white text-gray-800 placeholder-gray-500 text-lg
                           focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                           transition-all duration-200 shadow-sm"
                disabled={isLoading}
                required
                key="login-input" // Reactの再レンダリング強制
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-yellow-400 hover:bg-yellow-500 
                         text-gray-800 font-bold text-lg rounded-xl
                         transition-all duration-200 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transform hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl"
            >
              {isLoading ? '準備中...' : 'はじめる'}
            </button>
          </form>

          {/* 説明文 */}
          <div className="text-center text-gray-500 space-y-2 mt-6">
            <p className="text-lg">パスワードは不要です</p>
            <p>お名前を入力するだけで始められます</p>
          </div>
        </div>

        {/* 4レベルの説明 */}
        <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            4レベルで課題を整理
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="w-4 h-4 bg-yellow-400 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-medium">レベル1: 内部単純 × 外部依存なし</span>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="w-4 h-4 bg-purple-600 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-medium">レベル2: 内部複雑 × 外部依存なし</span>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="w-4 h-4 bg-blue-400 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-medium">レベル3: 内部単純 × 外部依存あり</span>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="w-4 h-4 bg-gray-600 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-medium">レベル4: 内部複雑 × 外部依存あり</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}