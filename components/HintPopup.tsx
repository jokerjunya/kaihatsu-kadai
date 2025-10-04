'use client';

import React from 'react';

interface HintPopupProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
  hints: {
    detailed: string;
    tips: string[];
    resources: string[];
  };
}

export default function HintPopup({ isOpen, onClose, taskTitle, hints }: HintPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* オーバーレイ */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* ポップアップ本体 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          {/* ヘッダー */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                💡 実装ヒント
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{taskTitle}</p>
          </div>

          {/* コンテンツ */}
          <div className="p-6 space-y-6">
            {/* 詳細説明 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                📋 詳細な実装指針
              </h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {hints.detailed}
                </p>
              </div>
            </div>

            {/* 実装のコツ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                🎯 実装のコツ
              </h4>
              <div className="space-y-2">
                {hints.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 参考リソース */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                🔗 参考リソース
              </h4>
              <div className="space-y-2">
                {hints.resources.map((resource, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm leading-relaxed">{resource}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* フッター */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                           transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
