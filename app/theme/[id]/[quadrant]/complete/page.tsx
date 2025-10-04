'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ThemeStorageManager from '@/utils/themeStorage';
import { getThemeByIdSafe, getQuadrantTaskSafe } from '@/utils/themeData';
import { User, Theme } from '@/types/theme';
import { QUADRANT_CONFIG } from '@/types/theme';

export default function QuadrantCompletePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  const params = useParams();
  const themeId = params.id as string;
  const quadrant = params.quadrant as string;

  useEffect(() => {
    // ユーザー認証チェック
    const user = ThemeStorageManager.getCurrentUser();
    if (!user) {
      router.push('/');
      return;
    }

    // テーマの取得（安全な関数を使用）
    const foundTheme = getThemeByIdSafe(themeId);
    if (!foundTheme) {
      router.push('/dashboard');
      return;
    }

    // レベルの完了状態確認
    if (!ThemeStorageManager.isQuadrantCompleted(themeId, quadrant)) {
      router.push(`/theme/${themeId}`);
      return;
    }

    setCurrentUser(user);
    setTheme(foundTheme);
    setIsLoading(false);

    // 紙吹雪アニメーションを開始
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [themeId, quadrant, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">テーマが見つかりません</div>
      </div>
    );
  }

  const quadrantTask = getQuadrantTaskSafe(themeId, quadrant);
  const quadrantConfig = QUADRANT_CONFIG[quadrant as keyof typeof QUADRANT_CONFIG];
  const completedCount = ThemeStorageManager.getThemeCompletedCount(themeId);
  const totalCompleted = ThemeStorageManager.getTotalCompletedCount();
  const isThemeComplete = completedCount === 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      {/* 紙吹雪エフェクト */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 animate-bounce rounded-full 
                ${i % 4 === 0 ? 'bg-yellow-400' : 
                  i % 4 === 1 ? 'bg-blue-400' : 
                  i % 4 === 2 ? 'bg-purple-400' : 'bg-green-400'}
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full text-center">
        {/* メインメッセージ */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-12 h-12 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 animate-fadeIn">
            🎉 おめでとう！
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            レベル課題を完了しました
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <span className="text-sm">{theme.icon} {theme.title}</span>
            <span>•</span>
            <span className="text-sm">{quadrantConfig.name}</span>
          </div>
        </div>

        {/* 進捗統計 */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-medium text-gray-800 mb-4">あなたの成長記録</h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {completedCount}/4
              </div>
              <div className="text-gray-600">このテーマの進捗</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {totalCompleted}
              </div>
              <div className="text-gray-600">全体の完了数</div>
            </div>
          </div>
        </div>

        {/* テーマ完了の特別メッセージ */}
        {isThemeComplete && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 ring-2 ring-yellow-300 ring-opacity-50">
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="text-lg font-bold text-yellow-800 mb-2">
              テーマ完全制覇！
            </h3>
            <p className="text-yellow-700 text-sm">
              「{theme.title}」の全4レベルを制覇しました！
              実践的なアプリケーション開発の全工程を体験できましたね。
            </p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Link
              href={`/theme/${themeId}`}
              className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 
                         text-white font-semibold rounded-lg
                         transition-all duration-200 ease-in-out text-center"
            >
              テーマに戻る
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 
                         text-gray-800 font-semibold rounded-lg
                         transition-all duration-200 ease-in-out text-center"
            >
              ダッシュボードに戻る
            </Link>
          </div>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Kadai - レベル課題完了！',
                  text: `「${theme.title}」の「${quadrantConfig.name}」を完了しました！`,
                  url: window.location.origin
                });
              }
            }}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg
                       hover:bg-gray-50 transition-colors duration-200"
          >
            成果をシェア
          </button>
        </div>

        {/* 励ましメッセージ */}
        <div className="mt-8 text-sm text-gray-500">
          <p>一歩一歩着実に成長しています。この調子で頑張りましょう！</p>
        </div>
      </div>
    </div>
  );
}
