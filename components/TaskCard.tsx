import { Task } from '@/types';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isCompleted }) => {
  const router = useRouter();

  const handleClick = () => {
    if (!isCompleted) {
      router.push(`/task/${task.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        border-2 rounded-xl p-6 transition-all duration-300 ease-in-out
        ${isCompleted 
          ? 'border-yellow-300 bg-yellow-50 opacity-75 cursor-default' 
          : 'border-gray-200 bg-white cursor-pointer hover:border-yellow-400 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
        }
      `}
    >
      {/* ヘッダー部分 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          {/* ステータスアイコン */}
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
            ${isCompleted ? 'bg-yellow-400' : 'bg-gray-200'}
          `}>
            {isCompleted ? (
              <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            )}
          </div>
          
          {/* タイトル */}
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-semibold leading-tight mb-2
              ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}
            `}>
              {task.title}
            </h3>
            
            {/* 抽象的な課題内容（Sレベル）のプレビュー */}
            <p className={`
              text-sm line-clamp-2
              ${isCompleted ? 'text-gray-400' : 'text-gray-600'}
            `}>
              {task.difficultySLevel}
            </p>
          </div>
        </div>

        {/* 状態表示 */}
        <div className="flex flex-col items-end space-y-1 flex-shrink-0 ml-4">
          {isCompleted ? (
            <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
              完了済み
            </span>
          ) : (
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              未実施
            </span>
          )}
        </div>
      </div>

      {/* フッター */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-400">
          課題ID: {task.id}
        </div>
        
        {!isCompleted && (
          <div className="flex items-center space-x-1 text-xs text-yellow-600">
            <span>詳細を見る</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;