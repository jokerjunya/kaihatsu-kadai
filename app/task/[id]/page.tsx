'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import LocalStorageManager from '@/utils/localStorage';
import { getTaskById, getCategoryById } from '@/utils/sampleData';
import DifficultySelector from '@/components/DifficultySelector';
import { User, Task, Category } from '@/types';

export default function TaskDetailPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  useEffect(() => {
    // ユーザー認証チェック
    const user = LocalStorageManager.getCurrentUser();
    if (!user) {
      router.push('/');
      return;
    }

    // 課題の存在チェック
    const foundTask = getTaskById(taskId);
    if (!foundTask) {
      router.push('/dashboard');
      return;
    }

    // カテゴリ情報の取得
    const foundCategory = getCategoryById(foundTask.categoryId);
    if (!foundCategory) {
      router.push('/dashboard');
      return;
    }

    setCurrentUser(user);
    setTask(foundTask);
    setCategory(foundCategory);
    setIsCompleted(user.completedTasks.includes(taskId));
    setIsLoading(false);
  }, [taskId, router]);

  const handleStartTask = async (difficulty: 'S' | 'A') => {
    if (!task || isCompleted) return;

    setIsStarting(true);

    try {
      // 選択された難易度をローカルストレージに保存
      const success = LocalStorageManager.setTaskProgress(taskId, difficulty, false);
      
      if (success) {
        // 進行中ページへ遷移
        router.push(`/task/${taskId}/progress`);
      } else {
        alert('課題開始に失敗しました。再度お試しください。');
      }
    } catch (error) {
      console.error('課題開始エラー:', error);
      alert('課題開始に失敗しました。再度お試しください。');
    } finally {
      setIsStarting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!task || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">課題が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* パンくずナビ */}
      <div className="max-w-4xl mx-auto mb-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link 
            href="/dashboard"
            className="text-yellow-600 hover:text-yellow-700 transition-colors duration-200"
          >
            ダッシュボード
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link 
            href={`/category/${category.id}`}
            className="text-yellow-600 hover:text-yellow-700 transition-colors duration-200"
          >
            {category.name}
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700">{task.title}</span>
        </nav>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto">
        {/* ヘッダーセクション */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                  {category.name}
                </div>
                {isCompleted && (
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>完了済み</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {task.title}
              </h1>
            </div>
          </div>
        </div>

        {/* 課題内容・難易度選択 */}
        {isCompleted ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              この課題は完了済みです
            </h2>
            <p className="text-gray-600 mb-6">
              素晴らしい！この課題は既にクリア済みです。
            </p>
            <div className="space-x-4">
              <Link 
                href={`/category/${category.id}`}
                className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg
                           hover:bg-gray-700 transition-colors duration-200"
              >
                他の課題を見る
              </Link>
              <Link 
                href="/dashboard"
                className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg
                           hover:bg-gray-50 transition-colors duration-200"
              >
                ダッシュボードに戻る
              </Link>
            </div>
          </div>
        ) : (
          <DifficultySelector
            task={task}
            onStartTask={handleStartTask}
            isLoading={isStarting}
          />
        )}
      </div>
    </div>
  );
}