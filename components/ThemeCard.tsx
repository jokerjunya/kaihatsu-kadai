import { Theme } from '@/types/theme';
import { useRouter } from 'next/navigation';
import { CATEGORY_CONFIG, QUADRANT_CONFIG } from '@/types/theme';

interface ThemeCardProps {
  theme: Theme;
  completedCount: number;
  isCompleted: boolean;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, completedCount, isCompleted }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/theme/${theme.id}`);
  };

  const progressPercentage = Math.round((completedCount / 4) * 100);
  const categoryConfig = CATEGORY_CONFIG[theme.category];

  // カテゴリに応じた色を取得
  const getCategoryColor = () => {
    switch (theme.category) {
      case 'information':
        return 'border-blue-200 bg-blue-50 hover:border-blue-300';
      case 'tools-rpa':
        return 'border-green-200 bg-green-50 hover:border-green-300';
      case 'games':
        return 'border-purple-200 bg-purple-50 hover:border-purple-300';
      default:
        return 'border-gray-200 bg-gray-50 hover:border-gray-300';
    }
  };

  const getProgressColor = () => {
    switch (theme.category) {
      case 'information':
        return 'bg-blue-500';
      case 'tools-rpa':
        return 'bg-green-500';
      case 'games':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        ${getCategoryColor()}
        border-2 rounded-xl p-6 cursor-pointer
        transition-all duration-300 ease-in-out
        transform hover:scale-[1.02] hover:shadow-lg
        active:scale-[0.98]
        ${isCompleted ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
      `}
    >
      {/* ヘッダー */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{theme.icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 leading-tight">
              {theme.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {categoryConfig.name}
            </p>
          </div>
        </div>
        
        {/* 完了バッジ */}
        {isCompleted && (
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* 説明 */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
        {theme.description}
      </p>

      {/* 進捗情報 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">進捗</span>
          <span className="font-semibold text-gray-800">
            {completedCount}/4 レベル
          </span>
        </div>
        
        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${getProgressColor()} h-2 rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="text-right">
          <span className="text-xs text-gray-500">
            {progressPercentage}% 完了
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;
