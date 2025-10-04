'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ThemeStorageManager from '@/utils/themeStorage';
import { getThemeById } from '@/utils/themeData';
import { Theme, User } from '@/types/theme';
import { QUADRANT_CONFIG } from '@/types/theme';
import HintPopup from '@/components/HintPopup';

export default function ThemeDetailPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [activeQuadrant, setActiveQuadrant] = useState<string>('bottom-left');
  const [isLoading, setIsLoading] = useState(true);
  const [showHintPopup, setShowHintPopup] = useState(false);
  const [currentHint, setCurrentHint] = useState<{title: string, hint: unknown} | null>(null);
  const router = useRouter();
  const params = useParams();
  const themeId = params.id as string;

  useEffect(() => {
    // ユーザー認証チェック
    const user = ThemeStorageManager.getCurrentUser();
    if (!user) {
      router.push('/');
      return;
    }

    // テーマの存在チェック
    const foundTheme = getThemeById(themeId);
    if (!foundTheme) {
      router.push('/dashboard');
      return;
    }

    setCurrentUser(user);
    setTheme(foundTheme);
    setIsLoading(false);
  }, [themeId, router]);

  const handleUncompleteQuadrant = async (quadrant: string) => {
    if (!theme || !currentUser) return;

    try {
      console.log('未完了処理開始:', { themeId: theme.id, quadrant });

      // レベルを未完了状態に戻す
      const success = await ThemeStorageManager.uncompleteQuadrant(theme.id, quadrant);

      console.log('未完了処理結果:', success);

      if (success) {
        // ページをリロードして状態を更新
        window.location.reload();
      } else {
        console.error('未完了処理に失敗しました');
        alert('未完了に戻す処理に失敗しました。再度お試しください。');
      }
    } catch (error) {
      console.error('未完了処理エラー:', error);
      alert(`未完了に戻す処理でエラーが発生しました: ${error}`);
    }
  };

  const handleCompleteQuadrant = async (quadrant: string) => {
    if (!theme || !currentUser) return;

    try {
      // レベルを完了状態に更新
      const success = await ThemeStorageManager.completeQuadrant(theme.id, quadrant);

      if (success) {
        // 完了履歴に追加
        ThemeStorageManager.addCompletedTaskToHistory(theme.id, quadrant);

        // 完了画面へ遷移（既存のフローを活用）
        router.push(`/theme/${theme.id}/${quadrant}/complete`);
      } else {
        alert('完了処理に失敗しました。再度お試しください。');
      }
    } catch (error) {
      console.error('完了処理エラー:', error);
      alert('完了処理に失敗しました。再度お試しください。');
    }
  };

  const handleShowHint = (taskTitle: string, hint: unknown) => {
    setCurrentHint({ title: taskTitle, hint });
    setShowHintPopup(true);
  };

  const handleCloseHint = () => {
    setShowHintPopup(false);
    setCurrentHint(null);
  };

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

  const completedCount = ThemeStorageManager.getThemeCompletedCount(theme.id);
  const progressPercentage = Math.round((completedCount / 4) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* パンくずナビ */}
      <div className="max-w-6xl mx-auto mb-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link 
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            ダッシュボード
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700">{theme.title}</span>
        </nav>
      </div>

      {/* テーマヘッダー */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{theme.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {theme.title}
                </h1>
                <p className="text-gray-600 text-lg">
                  {theme.description}
                </p>
              </div>
            </div>
            
            {/* 進捗サマリー */}
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">進捗</div>
              <div className="text-3xl font-bold text-gray-800">
                {completedCount}<span className="text-xl text-gray-500">/4</span>
              </div>
              <div className="text-sm text-gray-500">
                {progressPercentage}% 完了
              </div>
            </div>
          </div>

          {/* 全体プログレスバー */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

                 {/* 4レベルタブ */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {Object.entries(theme.quadrants).map(([quadrant, task]) => {
                const isCompleted = ThemeStorageManager.isQuadrantCompleted(theme.id, quadrant);
                const quadrantConfig = QUADRANT_CONFIG[quadrant as keyof typeof QUADRANT_CONFIG];
                
                return (
                  <button
                    key={quadrant}
                    onClick={() => setActiveQuadrant(quadrant)}
                    className={`
                      py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200
                      ${activeQuadrant === quadrant
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <span>{quadrantConfig.name}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

               {/* アクティブレベルの詳細 */}
      <div className="max-w-6xl mx-auto">
        {Object.entries(theme.quadrants).map(([quadrant, task]) => {
          if (quadrant !== activeQuadrant) return null;
          
          const isCompleted = ThemeStorageManager.isQuadrantCompleted(theme.id, quadrant);
          const quadrantConfig = QUADRANT_CONFIG[quadrant as keyof typeof QUADRANT_CONFIG];
          
          return (
            <div key={quadrant} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {task.title}
                  </h2>
                  {isCompleted && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                      ✓ 完了済み
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {quadrantConfig.description}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">実装内容</h3>
                  {task.hint && (
                    <button
                      onClick={() => handleShowHint(task.title, task.hint)}
                      className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                                 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>ヒントを表示</span>
                    </button>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* アクションボタン */}
              <div className="flex justify-center space-x-4">
                {isCompleted ? (
                  <button
                    onClick={() => handleUncompleteQuadrant(quadrant)}
                    className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg
                               hover:bg-red-600 transition-colors duration-200"
                  >
                    未完了に戻す
                  </button>
                ) : (
                  <button
                    onClick={() => handleCompleteQuadrant(quadrant)}
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 
                               text-white font-semibold rounded-lg
                               transition-all duration-200 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                               transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                           このレベルをクリア
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* ヒントポップアップ */}
      {currentHint && (
        <HintPopup
          isOpen={showHintPopup}
          onClose={handleCloseHint}
          taskTitle={currentHint.title}
          hints={currentHint.hint}
        />
      )}
    </div>
  );
}
