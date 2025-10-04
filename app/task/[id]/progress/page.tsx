'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import LocalStorageManager from '@/utils/localStorage';
import { getTaskById, getCategoryById } from '@/utils/sampleData';
import { User, Task, Category } from '@/types';

export default function TaskProgressPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'S' | 'A' | null>(null);
  const [taskContent, setTaskContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
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

    // 課題進捗の確認
    const taskProgress = LocalStorageManager.getTaskProgress();
    const currentProgress = taskProgress[taskId];
    
    if (!currentProgress) {
      // 進捗情報がない場合は課題詳細へ戻る
      router.push(`/task/${taskId}`);
      return;
    }

    // 既に完了している場合は完了画面へ
    if (currentProgress.isCompleted) {
      router.push(`/task/${taskId}/complete`);
      return;
    }

    setCurrentUser(user);
    setTask(foundTask);
    setCategory(foundCategory);
    setSelectedDifficulty(currentProgress.selectedDifficulty);
    
    // 選択された難易度に応じて表示する課題内容を決定
    setTaskContent(
      currentProgress.selectedDifficulty === 'S' 
        ? foundTask.difficultySLevel 
        : foundTask.difficultyALevel
    );
    
    setIsLoading(false);
  }, [taskId, router]);

  const handleComplete = async () => {
    if (!task || !currentUser) return;

    setIsCompleting(true);

    try {
      // 課題を完了状態に更新
      const progressSuccess = LocalStorageManager.completeTask(taskId);
      
      // ユーザーの完了済み課題リストに追加
      const userSuccess = LocalStorageManager.addCompletedTask(currentUser.id, taskId);
      
      if (progressSuccess && userSuccess) {
        // 完了画面へ遷移
        router.push(`/task/${taskId}/complete`);
      } else {
        alert('完了処理に失敗しました。再度お試しください。');
      }
    } catch (error) {
      console.error('完了処理エラー:', error);
      alert('完了処理に失敗しました。再度お試しください。');
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!task || !category || !selectedDifficulty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">課題情報が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 最小限のヘッダー */}
      <header className="border-b border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${selectedDifficulty === 'S' ? 'bg-yellow-400' : 'bg-gray-800'}
            `}>
              <span className={`
                font-bold text-sm
                ${selectedDifficulty === 'S' ? 'text-gray-800' : 'text-white'}
              `}>
                {selectedDifficulty}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-800">{task.title}</h1>
              <p className="text-xs text-gray-500">{category.name}</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            集中モード
          </div>
        </div>
      </header>

      {/* メインコンテンツ（課題内容） */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12">
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-light">
              {taskContent}
            </p>
          </div>

          {/* ヒントやガイダンス */}
          <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="font-medium text-gray-800 mb-3">取り組みのヒント</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 完璧を求めすぎず、まずは始めてみましょう</p>
              <p>• 自分のペースで取り組んでください</p>
              <p>• 途中で疑問が浮かんでも、それも学びの一部です</p>
            </div>
          </div>
        </div>
      </main>

      {/* フッター（完了ボタン） */}
      <footer className="border-t border-gray-200 bg-white p-6">
        <div className="max-w-4xl mx-auto flex justify-center">
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="px-12 py-4 bg-yellow-400 hover:bg-yellow-500 
                       text-gray-800 font-semibold rounded-xl text-lg
                       transition-all duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transform hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg hover:shadow-xl"
          >
            {isCompleting ? '完了処理中...' : '完了'}
          </button>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            課題に取り組み終えたと感じたら「完了」ボタンを押してください
          </p>
        </div>
      </footer>
    </div>
  );
}