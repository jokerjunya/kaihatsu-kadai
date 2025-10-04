import { Category } from '@/types';
import { useRouter } from 'next/navigation';

interface QuadrantCardProps {
  category: Category;
  completedTasksCount: number;
  totalTasksCount: number;
}

const QuadrantCard: React.FC<QuadrantCardProps> = ({ 
  category, 
  completedTasksCount, 
  totalTasksCount 
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/category/${category.id}`);
  };

  const progressPercentage = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  // レベルに応じた色を決定
  const getQuadrantColors = (quadrant: string) => {
    switch (quadrant) {
      case 'bottom-left':
        return {
          bg: 'bg-gradient-to-br from-yellow-100 to-yellow-50',
          border: 'border-yellow-300',
          hover: 'hover:border-yellow-400',
          dot: 'bg-yellow-400'
        };
      case 'top-left':
        return {
          bg: 'bg-gradient-to-br from-purple-100 to-purple-50',
          border: 'border-purple-300',
          hover: 'hover:border-purple-400',
          dot: 'bg-purple-600'
        };
      case 'bottom-right':
        return {
          bg: 'bg-gradient-to-br from-blue-100 to-blue-50',
          border: 'border-blue-300',
          hover: 'hover:border-blue-400',
          dot: 'bg-blue-400'
        };
      case 'top-right':
        return {
          bg: 'bg-gradient-to-br from-gray-100 to-gray-50',
          border: 'border-gray-300',
          hover: 'hover:border-gray-400',
          dot: 'bg-gray-600'
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          hover: 'hover:border-yellow-300',
          dot: 'bg-yellow-400'
        };
    }
  };

  const colors = getQuadrantColors(category.quadrant);

  return (
    <div
      onClick={handleClick}
      className={`
        ${colors.bg} ${colors.border} ${colors.hover}
        border-2 rounded-xl p-6 cursor-pointer
        transition-all duration-300 ease-in-out
        transform hover:scale-[1.02] hover:shadow-lg
        active:scale-[0.98]
      `}
    >
      {/* カテゴリ名 */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-4 h-4 ${colors.dot} rounded-full flex-shrink-0 mt-1`}></div>
        <div className="ml-3 flex-1">
          <h2 className="text-lg font-bold text-primary leading-tight">
            {category.name}
          </h2>
        </div>
      </div>

      {/* 説明 */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {category.description}
      </p>

      {/* 進捗情報 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-foreground opacity-70">進捗</span>
          <span className="font-semibold text-primary">
            {completedTasksCount}/{totalTasksCount}
          </span>
        </div>
        
        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${colors.dot} h-2 rounded-full transition-all duration-500 ease-out`}
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

export default QuadrantCard;