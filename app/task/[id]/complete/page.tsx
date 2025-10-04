'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import LocalStorageManager from '@/utils/localStorage';
import { getTaskById, getCategoryById } from '@/utils/sampleData';
import { User, Task, Category } from '@/types';

export default function TaskCompletePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
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

    // 完了状態の確認
    if (!user.completedTasks.includes(taskId)) {
      // 完了していない場合は課題詳細へ戻る
      router.push(`/task/${taskId}`);
      return;
    }

    setCurrentUser(user);
    setTask(foundTask);
    setCategory(foundCategory);
    setIsLoading(false);

    // 紙吹雪アニメーションを開始
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [taskId, router]);

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
        <div className="text-lg text-gray-600">課題情報が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
      {/* 紙吹雪エフェクト */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 animate-bounce rounded-full 
                ${i % 4 === 0 ? 'bg-yellow-400' : 
                  i % 4 === 1 ? 'bg-blue-400' : 
                  i % 4 === 2 ? 'bg-purple-400' : 'bg-gray-600'}
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
            おめでとう！
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            課題を完了しました
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <span className="text-sm">{category.name}</span>
            <span>•</span>
            <span className="text-sm font-medium">{task.title}</span>
          </div>
        </div>

        {/* 達成感メッセージ */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            素晴らしい取り組みでした！
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>新しいチャレンジに取り組むことで、あなたは一歩成長しました。</p>
            <p>この経験を活かして、次の課題にも挑戦してみましょう。</p>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="bg-gradient-to-r from-yellow-100 to-blue-100 border border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="font-medium text-gray-800 mb-3">あなたの成長記録</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {currentUser?.completedTasks.length || 0}
              </div>
              <div className="text-gray-600">完了した課題</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-1">+1</div>
              <div className="text-gray-600">今回の達成</div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block w-full py-4 bg-yellow-400 hover:bg-yellow-500 
                       text-gray-800 font-semibold rounded-xl text-lg
                       transition-all duration-200 ease-in-out
                       transform hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg hover:shadow-xl"
          >
            ダッシュボードに戻る
          </Link>
          
          <div className="flex space-x-4">
            <Link
              href={`/category/${category.id}`}
              className="flex-1 py-3 border-2 border-gray-800 text-gray-800 rounded-lg
                         hover:bg-gray-800 hover:text-white
                         transition-all duration-200 ease-in-out text-center"
            >
              他の課題を見る
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Kadai - 課題完了！',
                    text: `「${task.title}」を完了しました！`,
                    url: window.location.origin
                  });
                }
              }}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg
                         hover:bg-gray-50 transition-colors duration-200"
            >
              成果をシェア
            </button>
          </div>
        </div>

        {/* 励ましメッセージ */}
        <div className="mt-8 text-sm text-gray-500">
          <p>継続は力なり。あなたの成長を応援しています！</p>
        </div>
      </div>
    </div>
  );
}