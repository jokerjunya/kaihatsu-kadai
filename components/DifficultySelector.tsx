import { useState } from 'react';
import { Task } from '@/types';

interface DifficultySelectorProps {
  task: Task;
  onStartTask: (difficulty: 'S' | 'A') => void;
  isLoading: boolean;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  task, 
  onStartTask, 
  isLoading 
}) => {
  const [showALevel, setShowALevel] = useState(false);

  const handleShowALevel = () => {
    setShowALevel(true);
  };

  return (
    <div className="space-y-6">
      {/* 難易度S（抽象レベル） */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-gray-800 font-bold text-sm">S</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              難易度S（抽象レベル）
            </h3>
          </div>
          
          {!showALevel && (
            <button
              onClick={() => onStartTask('S')}
              disabled={isLoading}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 
                         text-gray-800 font-semibold rounded-lg
                         transition-all duration-200 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? '開始中...' : '課題を始める'}
            </button>
          )}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">
            {task.difficultySLevel}
          </p>
        </div>
      </div>

      {/* 難易度Aを表示するボタン */}
      {!showALevel && (
        <div className="text-center">
          <button
            onClick={handleShowALevel}
            className="px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-lg
                       hover:bg-gray-800 hover:text-white
                       transition-all duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
          >
            難易度Aを表示する
          </button>
        </div>
      )}

      {/* 難易度A（具体レベル） */}
      {showALevel && (
        <div className={`
          bg-white border border-gray-200 rounded-xl p-6
          transform transition-all duration-500 ease-out
          ${showALevel ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                難易度A（具体レベル）
              </h3>
            </div>
            
            <button
              onClick={() => onStartTask('A')}
              disabled={isLoading}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 
                         text-gray-800 font-semibold rounded-lg
                         transition-all duration-200 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? '開始中...' : '課題を始める'}
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">
              {task.difficultyALevel}
            </p>
          </div>
        </div>
      )}

      {/* 難易度の説明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-2">難易度について</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <span className="font-semibold text-yellow-600">S:</span>
            <span>抽象的で自由度の高い課題です。自分なりの解釈で取り組めます。</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-semibold text-gray-800">A:</span>
            <span>具体的な手順が示された課題です。明確なガイドラインがあります。</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;