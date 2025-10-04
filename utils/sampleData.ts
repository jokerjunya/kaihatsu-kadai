import { Category, Task } from '@/types';

// 4レベルのカテゴリデータ
export const categories: Category[] = [
  {
    id: 'bottom-left',
    name: '内部単純 × 外部依存なし',
    description: 'シンプルで自己完結型の課題',
    quadrant: 'bottom-left'
  },
  {
    id: 'top-left',
    name: '内部複雑 × 外部依存なし',
    description: '複雑だが自己完結型の課題',
    quadrant: 'top-left'
  },
  {
    id: 'bottom-right',
    name: '内部単純 × 外部依存あり',
    description: 'シンプルだが外部連携が必要な課題',
    quadrant: 'bottom-right'
  },
  {
    id: 'top-right',
    name: '内部複雑 × 外部依存あり',
    description: '複雑で外部連携も必要な課題',
    quadrant: 'top-right'
  }
];

// サンプル課題データ
export const tasks: Task[] = [
  // 内部単純 × 外部依存なし
  {
    id: 'bl-001',
    categoryId: 'bottom-left',
    title: '1分間瞑想',
    difficultySLevel: '今この瞬間に集中する',
    difficultyALevel: '静かな場所で座り、1分間呼吸に意識を向ける。雑念が浮かんだら呼吸に戻る。'
  },
  {
    id: 'bl-002',
    categoryId: 'bottom-left',
    title: 'デスク整理',
    difficultySLevel: '作業環境を整える',
    difficultyALevel: '机の上の不要な物を取り除き、必要な物だけを整理整頓する。5分で完了させる。'
  },
  {
    id: 'bl-003',
    categoryId: 'bottom-left',
    title: '日記を書く',
    difficultySLevel: '今日の振り返りをする',
    difficultyALevel: '今日起きた出来事や感じたことを3行でまとめて紙やアプリに書く。'
  },

  // 内部複雑 × 外部依存なし
  {
    id: 'tl-001',
    categoryId: 'top-left',
    title: '問題解決の思考整理',
    difficultySLevel: '複雑な課題の本質を見つける',
    difficultyALevel: '抱えている問題を5W1Hで分析し、根本原因と解決策を3つずつ書き出す。マインドマップやフレームワークを使って可視化する。'
  },
  {
    id: 'tl-002',
    categoryId: 'top-left',
    title: 'スキル習得計画',
    difficultySLevel: '成長のための戦略を立てる',
    difficultyALevel: '習得したいスキルを1つ選び、3ヶ月の学習計画を作成。週単位のマイルストーンと評価方法を具体的に設定する。'
  },
  {
    id: 'tl-003',
    categoryId: 'top-left',
    title: '創作活動',
    difficultySLevel: '新しいアイデアを形にする',
    difficultyALevel: '詩、短編小説、イラスト、音楽など好きな分野で15分間の創作活動を行う。完璧を求めず表現することに集中する。'
  },

  // 内部単純 × 外部依存あり
  {
    id: 'br-001',
    categoryId: 'bottom-right',
    title: '感謝の気持ちを伝える',
    difficultySLevel: '大切な人に思いを届ける',
    difficultyALevel: '家族、友人、同僚の中から1人選び、感謝の気持ちをメッセージや電話で直接伝える。'
  },
  {
    id: 'br-002',
    categoryId: 'bottom-right',
    title: '新しい情報収集',
    difficultySLevel: '世界を広げる学びを得る',
    difficultyALevel: '興味のある分野の記事を3つ読み、新たに学んだことを1つ誰かに共有する。'
  },
  {
    id: 'br-003',
    categoryId: 'bottom-right',
    title: 'コミュニティ参加',
    difficultySLevel: '新しいつながりを作る',
    difficultyALevel: 'オンラインイベント、勉強会、趣味のサークルなどに参加し、1人以上の人と会話する。'
  },

  // 内部複雑 × 外部依存あり
  {
    id: 'tr-001',
    categoryId: 'top-right',
    title: 'フィードバック収集・分析',
    difficultySLevel: '他者の視点で自分を見つめ直す',
    difficultyALevel: '信頼できる3人にあなたの強み・改善点についてフィードバックを求め、共通点を分析して行動計画を立てる。'
  },
  {
    id: 'tr-002',
    categoryId: 'top-right',
    title: 'コラボレーション企画',
    difficultySLevel: '協力して価値を生み出す',
    difficultyALevel: '他の人と協力してプロジェクトを企画・実行。役割分担、進捗管理、成果物の作成まで責任を持って進める。'
  },
  {
    id: 'tr-003',
    categoryId: 'top-right',
    title: 'メンタリング・教える',
    difficultySLevel: '知識を伝えて人の成長を支援する',
    difficultyALevel: '自分が得意な分野で他の人に教える機会を作る。相手のレベルに合わせて説明し、理解度を確認しながら進める。'
  }
];

// カテゴリ別の課題を取得する関数
export const getTasksByCategory = (categoryId: string): Task[] => {
  return tasks.filter(task => task.categoryId === categoryId);
};

// 課題IDから課題を取得する関数
export const getTaskById = (taskId: string): Task | undefined => {
  return tasks.find(task => task.id === taskId);
};

// カテゴリIDからカテゴリを取得する関数
export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(category => category.id === categoryId);
};
