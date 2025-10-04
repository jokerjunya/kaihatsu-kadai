'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import LocalStorageManager from '@/utils/localStorage';
import { categories, getTasksByCategory, getCategoryById } from '@/utils/sampleData';
import TaskCard from '@/components/TaskCard';
import { User, Category, Task } from '@/types';

export default function CategoryPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  useEffect(() => {
    // ユーザー認証チェック
    const user = LocalStorageManager.getCurrentUser();
    if (!user) {
      router.push('/');
      return;
    }

    // カテゴリの存在チェック
    const foundCategory = getCategoryById(categoryId);
    if (!foundCategory) {
      router.push('/dashboard');
      return;
    }

    setCurrentUser(user);
    setCategory(foundCategory);
    setTasks(getTasksByCategory(categoryId));
    setCompletedTasks(user.completedTasks);
    setIsLoading(false);
  }, [categoryId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">カテゴリが見つかりません</div>
      </div>
    );
  }

  // 完了・未完了の統計
  const completedCount = tasks.filter(task => completedTasks.includes(task.id)).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* パンくずナビ */}
      <div className="max-w-7xl mx-auto mb-6">
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
          <span className="text-gray-700">{category.name}</span>
        </nav>
      </div>

      {/* ヘッダーセクション */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {category.name}
              </h1>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
            </div>
            
            {/* 進捗サマリー */}
            <div className="flex-shrink-0 ml-6 text-right">
              <div className="text-sm text-gray-500 mb-1">進捗</div>
              <div className="text-2xl font-bold text-gray-800">
                {completedCount}<span className="text-lg text-gray-500">/{totalCount}</span>
              </div>
              <div className="text-sm text-gray-500">
                {progressPercentage}% 完了
              </div>
            </div>
          </div>

          {/* プログレスバー */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-yellow-400 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 課題一覧 */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            課題一覧
            <span className="ml-2 text-sm font-normal text-gray-600">
              ({tasks.length}件)
            </span>
          </h2>
          
          {/* フィルターオプション（将来の拡張用） */}
          <div className="flex items-center space-x-2 text-sm">
            {completedCount > 0 && (
              <span className="text-gray-500">
                {completedCount}件完了済み
              </span>
            )}
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-500 mb-2">
              このカテゴリには課題がありません
            </div>
            <div className="text-sm text-gray-400">
              近日中に課題を追加予定です
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isCompleted={completedTasks.includes(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}