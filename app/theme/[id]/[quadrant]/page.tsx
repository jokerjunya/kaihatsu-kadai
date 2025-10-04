'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ThemeStorageManager from '@/utils/themeStorage';
import { getThemeByIdSafe } from '@/utils/themeData';
import { getEnhancedTask, getTierLabels, getTierStyle } from '@/utils/enhancedTaskData';
import TaskLevelManager, { TaskLevel } from '@/utils/taskLevelManager';
import { Theme, User, EnhancedQuadrantTask, TaskTier } from '@/types/theme';
import { QUADRANT_CONFIG } from '@/types/theme';

export default function EnhancedTaskDetailPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [enhancedTask, setEnhancedTask] = useState<EnhancedQuadrantTask | null>(null);
  const [currentLevel, setCurrentLevel] = useState<TaskLevel>('S');
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const themeId = params.id as string;
  const quadrant = params.quadrant as string || 'top-right'; // デフォルトで右上レベル

  useEffect(() => {
    console.log('EnhancedTaskDetailPage useEffect開始');
    console.log('params:', { themeId, quadrant });
    
    // ユーザー認証チェック
    const user = ThemeStorageManager.getCurrentUser();
    if (!user) {
      console.log('ユーザーが見つかりません');
      router.push('/');
      return;
    }
    console.log('現在のユーザー:', user);

    // テーマの取得（安全な関数を使用）
    const foundTheme = getThemeByIdSafe(themeId);
    if (!foundTheme) {
      console.log('テーマが見つかりません:', themeId);
      router.push('/dashboard');
      return;
    }
    console.log('見つかったテーマ:', foundTheme);

    // 拡張タスクデータの取得
    const taskId = foundTheme.quadrants[quadrant as keyof typeof foundTheme.quadrants]?.id;
    console.log('タスクID:', taskId);
    
    const foundEnhancedTask = getEnhancedTask(taskId);
    console.log('拡張タスクデータ:', foundEnhancedTask);
    
    if (!foundEnhancedTask) {
      console.log('拡張データが存在しないため従来のページにリダイレクト');
      // 拡張データが存在しない場合は従来のページにリダイレクト
      router.push(`/theme/${themeId}`);
      return;
    }

    // 現在のレベルを復元（URL > localStorage > デフォルト）
    const urlLevel = searchParams.get('level') as TaskLevel;
    const storedLevel = TaskLevelManager.getCurrentLevel(taskId);
    const initialLevel = urlLevel || storedLevel;
    
    console.log('レベル情報:', { urlLevel, storedLevel, initialLevel });

    setCurrentUser(user);
    setTheme(foundTheme);
    setEnhancedTask(foundEnhancedTask);
    setCurrentLevel(initialLevel);
    setIsLoading(false);
    
    console.log('EnhancedTaskDetailPage 初期化完了');
  }, [themeId, quadrant, router, searchParams]);

  // レベル切り替え
  const handleLevelChange = (newLevel: TaskLevel) => {
    console.log('レベル切り替え:', { currentLevel, newLevel });
    if (!enhancedTask) return;
    
    setCurrentLevel(newLevel);
    TaskLevelManager.setCurrentLevel(enhancedTask.id, newLevel);
    
    // URLにも反映
    const newUrl = `${window.location.pathname}?level=${newLevel}`;
    window.history.replaceState({}, '', newUrl);
    console.log('新しいURL:', newUrl);
  };

  // 課題完了処理
  const handleCompleteTask = async () => {
    if (!enhancedTask || !theme) return;

    try {
      // 現在のレベルを完了としてマーク
      TaskLevelManager.markLevelCompleted(enhancedTask.id, currentLevel);
      
      // 従来の完了処理も実行（ダッシュボード反映のため）
      ThemeStorageManager.completeQuadrant(theme.id, quadrant);
      ThemeStorageManager.addCompletedTaskToHistory(theme.id, quadrant);
      
      // 完了画面へ遷移
      router.push(`/theme/${theme.id}/${quadrant}/complete?level=${currentLevel}`);
    } catch (error) {
      console.error('完了処理エラー:', error);
      alert('完了処理に失敗しました。再度お試しください。');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!theme || !enhancedTask) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">課題が見つかりません</div>
      </div>
    );
  }

  const currentTier = enhancedTask.tiers.find(tier => tier.level === currentLevel);
  const labels = getTierLabels(currentLevel);
  const progress = TaskLevelManager.getTaskProgress(enhancedTask.id);

  console.log('レンダリング情報:', {
    currentLevel,
    currentTier,
    labels,
    progress,
    enhancedTaskId: enhancedTask.id
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* パンくずナビ */}
      <div className="max-w-4xl mx-auto mb-6">
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
          <Link 
            href={`/theme/${theme.id}`}
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            {theme.title}
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700">{enhancedTask.title}</span>
        </nav>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {enhancedTask.title}
              </h1>
              <p className="text-gray-600">
                {enhancedTask.description}
              </p>
            </div>
            
            {/* 完了状況 */}
            <div className="flex items-center space-x-2">
              {(['S', 'A', 'B'] as TaskLevel[]).map((level) => (
                <div
                  key={level}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                    ${progress[level] 
                      ? 'bg-green-500 text-white' 
                      : level === currentLevel 
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 段階的難易度表示 */}
        <div className="space-y-4">
          {enhancedTask.tiers.map((tier) => {
            const isActive = tier.level === currentLevel;
            const isCompleted = progress[tier.level];
            
            return (
              <div
                key={tier.level}
                className={getTierStyle(tier.level, isActive)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                      ${isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {tier.level}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        難易度 {tier.level} {isActive && '(現在表示中)'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tier.level === 'S' && '抽象（最高難度）'}
                        {tier.level === 'A' && '中程度'}
                        {tier.level === 'B' && '具体（最低難度）'}
                      </p>
                    </div>
                  </div>
                  
                  {isCompleted && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      ✓ 完了済み
                    </span>
                  )}
                </div>

                {/* 概要 */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {tier.summary}
                  </p>
                </div>

                {/* 現在のレベルのみ詳細を表示 */}
                {isActive && (
                  <>
                    {/* ヒントセクション */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* UX/UIヒント */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">🎨 UX/UIヒント</h4>
                        <ul className="space-y-2">
                          {tier.uxHints.map((hint, index) => (
                            <li key={index} className="text-sm text-blue-700 flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 技術ヒント */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-3">⚙️ 技術ヒント</h4>
                        <ul className="space-y-2">
                          {tier.techHints.map((hint, index) => (
                            <li key={index} className="text-sm text-green-700 flex items-start">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 受け入れ条件 */}
                    <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-yellow-800 mb-3">✅ 受け入れ条件（Done判定）</h4>
                      <ul className="space-y-2">
                        {tier.acceptance.map((condition, index) => (
                          <li key={index} className="text-sm text-yellow-700 flex items-start">
                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* アクションボタン */}
                    <div className="flex flex-wrap gap-3 justify-center">
                      {/* 戻すボタン */}
                      {labels.backButton && (
                        <button
                          onClick={() => handleLevelChange(TaskLevelManager.getPreviousLevel(currentLevel)!)}
                          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg
                                     hover:bg-gray-200 transition-colors duration-200"
                        >
                          {labels.backButton}
                        </button>
                      )}

                      {/* 課題を始めるボタン */}
                      <button
                        onClick={handleCompleteTask}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 
                                   text-white font-semibold rounded-lg
                                   transition-all duration-200 ease-in-out
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                   transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        課題を始める
                      </button>

                      {/* 次のレベルボタン */}
                      {labels.nextButton && (
                        <button
                          onClick={() => handleLevelChange(TaskLevelManager.getNextLevel(currentLevel)!)}
                          className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg
                                     hover:bg-blue-200 transition-colors duration-200"
                        >
                          {labels.nextButton}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
