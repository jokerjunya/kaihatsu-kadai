'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeStorageManager from '@/utils/themeStorage';
import { themes, getThemesByCategory, validateThemeData, validateHintData } from '@/utils/themeData';
import { User } from '@/types/theme';
import { CATEGORY_CONFIG } from '@/types/theme';

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // データ整合性チェック
        console.log('=== データ検証開始 ===');
        const themeValidation = validateThemeData();
        const hintValidation = validateHintData();
        
        if (!themeValidation.isValid) {
          console.error('テーマデータエラー:', themeValidation.errors);
        }
        
        if (!hintValidation.isValid) {
          console.error('ヒントデータエラー:', hintValidation.errors);
        }
        
        if (themeValidation.isValid && hintValidation.isValid) {
          console.log('✅ 全データ検証完了');
        }
        
        // ユーザー認証チェック
        const user = ThemeStorageManager.getCurrentUser();
        if (!user) {
          router.push('/');
          return;
        }

        console.log('ダッシュボード初期化開始:', user.id);

        // Firestore連携の初期化
        const firestoreSuccess = await ThemeStorageManager.initializeUser(user.id);
        console.log('Firestore初期化結果:', firestoreSuccess);

        // 既存データからの移行を実行
        ThemeStorageManager.migrateFromOldData();

        // 進捗データを確認
        const progress = ThemeStorageManager.getThemeProgress(user.id);
        const totalCompleted = ThemeStorageManager.getTotalCompletedCount();
        console.log('現在の進捗:', { progress, totalCompleted });

        setCurrentUser(user);
        setIsLoading(false);
      } catch (error) {
        console.error('ダッシュボード初期化エラー:', error);
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [router]);

  const handleLogout = () => {
    ThemeStorageManager.removeCurrentUser();
    router.push('/');
  };

  // 全体統計の計算
  const totalCompleted = ThemeStorageManager.getTotalCompletedCount();
  const totalTasks = themes.length * 4; // 9 themes × 4 levels
  const completionRate = ThemeStorageManager.getTotalCompletionRate();

  // 最近完了したタスクの取得
  const recentCompletedTasks = ThemeStorageManager.getRecentCompletedTasks(6);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* ヘッダー */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Kadai Dashboard
            </h1>
            <p className="text-gray-600 text-sm">
              実践的な開発課題で、段階的にスキルアップしよう
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm">
              ようこそ、<span className="font-semibold text-gray-800">{currentUser?.id}</span>さん
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded
                         text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              ログアウト
            </button>
          </div>
        </div>

        {/* 全体進捗サマリ */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalCompleted}</div>
                <div className="text-sm text-blue-500 font-medium">完了</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-700">{totalTasks}</div>
                <div className="text-sm text-gray-500 font-medium">全課題</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{completionRate}%</div>
                <div className="text-sm text-green-500 font-medium">達成率</div>
              </div>
            </div>
            <div className="flex-1 max-w-sm ml-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-medium text-gray-700">全体進捗</span>
                <span className="text-sm text-gray-600 font-medium">{totalCompleted}/{totalTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-gray-500">
                  あと{totalTasks - totalCompleted}課題
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 課題テーマ一覧 */}
      <div className="max-w-7xl mx-auto mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">課題テーマ一覧</h2>
        
        {/* カテゴリ別セクション */}
        {Object.entries(CATEGORY_CONFIG).map(([categoryKey, categoryConfig]) => {
          const categoryThemes = getThemesByCategory(categoryKey as 'information' | 'tools-rpa' | 'games');
          
          return (
            <div key={categoryKey} className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  {categoryConfig.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {categoryConfig.description}
                </span>
              </div>
              
              <div className="space-y-2">
                {categoryThemes.map((theme) => {
                  const completedCount = ThemeStorageManager.getThemeCompletedCount(theme.id);
                  const isCompleted = completedCount === 4;
                  const progressPercentage = Math.round((completedCount / 4) * 100);
                  
                  return (
                    <div
                      key={theme.id}
                      onClick={() => router.push(`/theme/${theme.id}`)}
                      className={`
                        bg-white border border-gray-200 rounded-lg p-4 cursor-pointer
                        hover:shadow-md hover:border-gray-300 transition-all duration-200
                        ${isCompleted ? 'ring-1 ring-blue-200 bg-blue-50' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="text-xl">{theme.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-base">
                              {theme.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {theme.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                                   <div className="text-sm font-medium text-gray-800">
                                     {completedCount}/4 レベル
                                   </div>
                            <div className="text-xs text-gray-500">
                              {progressPercentage}% 完了
                            </div>
                          </div>
                          
                          <div className="w-24">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {isCompleted && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* クリア済み課題履歴 */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          最近クリアした課題
          <span className="ml-2 text-sm font-normal text-gray-600">
            ({recentCompletedTasks.length}件)
          </span>
        </h2>
        
        {recentCompletedTasks.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-gray-500 text-sm">
              まだクリアした課題がありません
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentCompletedTasks.slice(0, 8).map((completedTask, index) => {
              const theme = themes.find(t => t.id === completedTask.themeId);
              if (!theme) return null;
              
              return (
                <div
                  key={`${completedTask.themeId}-${completedTask.quadrant}-${index}`}
                  className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-xs truncate">
                        {theme.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(completedTask.completedAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}