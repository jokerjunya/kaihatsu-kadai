'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocalStorageManager from '@/utils/localStorage';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 既にログインしているかチェック
  useEffect(() => {
    const currentUser = LocalStorageManager.getCurrentUser();
    if (currentUser) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim()) {
      alert('ユーザーIDを入力してください');
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
        alert('ログインに失敗しました。再度お試しください。');
      }
    } catch (error) {
      console.error('ログインエラー:', error);
      alert('ログインに失敗しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* ヘッダー */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Kadai
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            4レベル課題管理アプリ
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>シンプルで効果的な課題管理で</p>
            <p>あなたの成長をサポートします</p>
          </div>
        </div>

        {/* ログインフォーム */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-800 mb-2">
              ユーザーID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="任意のIDを入力してください"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         bg-white text-gray-800 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                         transition-all duration-200"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 
                       text-gray-800 font-semibold rounded-lg
                       transition-all duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        {/* 説明文 */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>パスワードは不要です</p>
          <p>IDを入力するだけで始められます</p>
        </div>

        {/* 4レベルの説明 */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            4レベルで課題を整理
          </h3>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">レベル1: 内部単純 × 外部依存なし</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-600 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">レベル2: 内部複雑 × 外部依存なし</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">レベル3: 内部単純 × 外部依存あり</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-600 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">レベル4: 内部複雑 × 外部依存あり</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}