import { EnhancedQuadrantTask, TaskTier } from '@/types/theme';

// 段階的難易度システム用のサンプルデータ
export const enhancedTasks: { [quadrantId: string]: EnhancedQuadrantTask } = {
  'weather-app-tr': {
    id: 'weather-app-tr',
    title: '保存・履歴管理・予報表示',
    description: 'オフライン対応の履歴保存機能と、週間予報表示を含む本格天気アプリ',
    isCompleted: false,
    tiers: [
      {
        level: 'S',
        summary: '天気履歴・予報を扱う総合アプリを自分なりの前提で設計し、最小の動く形を作る。',
        uxHints: [
          'まず"何を保存するか"の情報設計（粒度）を文章で定義',
          '履歴と予報を別モジュールに分離（認知負荷を下げる）',
          '初回体験は"今日の天気"に集中（段階的開示）'
        ],
        techHints: [
          '保存層は抽象化（Storageインターフェース）→実装はローカルで可',
          '履歴: append-onlyの簡易ログ、予報: 現在値のモック',
          'UIはViewModel層経由で状態を一元管理'
        ],
        acceptance: [
          '今日の天気を表示できる',
          '保存/履歴の概念をUIかコードで明確化',
          '最小のナビゲーションで動作'
        ]
      },
      {
        level: 'A',
        summary: '履歴一覧と週次予報をUIに分け、保存/取得を統一API経由で行う。',
        uxHints: [
          '一覧と詳細の2階層に限定',
          'グラフは1種類だけ（週次）',
          '空状態（データなし）のメッセージを用意'
        ],
        techHints: [
          'StorageはlocalStorage/IndexedDBいずれかでOK',
          'データスキーマ: {date, temp, condition}',
          '簡易キャッシュ（最新値はメモリ保持）'
        ],
        acceptance: [
          '履歴一覧/詳細が遷移可能',
          '週次予報のモック表示',
          '保存・読込がUIから確認できる'
        ]
      },
      {
        level: 'B',
        summary: '保存・履歴の完全動作（追加/削除/再表示）と、予報の簡易カード表示を実装。',
        uxHints: [
          '操作はボタン1〜2個で完結',
          '読み込み中・成功トーストを実装',
          'モバイル幅で崩れないカードレイアウト'
        ],
        techHints: [
          '単一ソースの状態（例：useReducer等）',
          'I/Oはtry/catchで失敗時のフォールバック',
          '型/バリデーションは最小限でOK'
        ],
        acceptance: [
          '保存→履歴に反映→再表示できる',
          '予報カードが複数日分表示される',
          '主要操作でエラーが起きない'
        ]
      }
    ]
  },
  'news-viewer-tr': {
    id: 'news-viewer-tr',
    title: 'オフライン記事保存・リーダーモード',
    description: '記事の保存機能と、複数記事を効率的に読めるリーダーモード',
    isCompleted: false,
    tiers: [
      {
        level: 'S',
        summary: 'ニュース記事を後で読むための保存システムを、自分なりの読書体験で設計・実装する。',
        uxHints: [
          '保存のトリガー（いつ・どこで・なぜ）を明確化',
          '読書の集中を妨げない保存UI',
          'オフライン時の体験を考慮した設計'
        ],
        techHints: [
          '記事データの最小構造を定義（タイトル、本文、メタ情報）',
          'オフライン保存はlocalStorage/IndexedDBで可',
          '保存状態の同期ロジック（保存済み・未保存の判定）'
        ],
        acceptance: [
          '記事を保存できる',
          '保存済み記事を一覧表示できる',
          'オフラインでも保存記事を読める'
        ]
      },
      {
        level: 'A',
        summary: '保存記事の管理（削除・整理）と、読みやすいリーダーモード表示を実装。',
        uxHints: [
          '記事リストはタイトル・日付・概要で構成',
          'リーダーモードは余白・フォントサイズを調整',
          '削除は確認ダイアログで誤操作を防ぐ'
        ],
        techHints: [
          '記事データにタイムスタンプとタグを追加',
          'リーダーモード用のCSS（印刷メディア準拠）',
          'CRUD操作の状態管理（追加・削除・更新）'
        ],
        acceptance: [
          '保存記事の削除・整理ができる',
          'リーダーモードで読みやすく表示される',
          '記事の検索・フィルタリングができる'
        ]
      },
      {
        level: 'B',
        summary: '複数記事の一括操作と、読書進捗の管理機能を完全実装。',
        uxHints: [
          'チェックボックスで複数選択UI',
          '読書進捗をプログレスバーで可視化',
          'ショートカットキー（J/K等）で記事間移動'
        ],
        techHints: [
          '選択状態の管理（Set型でID管理）',
          '読書進捗はスクロール位置ベースで計算',
          'キーボードイベントのハンドリング'
        ],
        acceptance: [
          '複数記事の一括削除・タグ付けができる',
          '読書進捗が保存・表示される',
          'キーボードショートカットで操作できる'
        ]
      }
    ]
  }
};

// 指定されたquadrantIdのenhanced taskデータを取得
export const getEnhancedTask = (quadrantId: string): EnhancedQuadrantTask | null => {
  return enhancedTasks[quadrantId] || null;
};

// tierレベルに応じたラベルテキスト
export const getTierLabels = (currentLevel: 'S' | 'A' | 'B') => {
  switch (currentLevel) {
    case 'S':
      return {
        nextButton: '難易度Aを表示（もう少し具体化）',
        backButton: null
      };
    case 'A':
      return {
        nextButton: '難易度Bを表示（さらに具体化）',
        backButton: '難易度Sに戻す'
      };
    case 'B':
      return {
        nextButton: null,
        backButton: '難易度Aに戻す'
      };
    default:
      return {
        nextButton: null,
        backButton: null
      };
  }
};

// レベル表示用のスタイル設定
export const getTierStyle = (level: 'S' | 'A' | 'B', isActive: boolean) => {
  const baseStyle = 'border rounded-lg p-6 transition-all duration-300';
  const levelColors = {
    S: isActive ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50',
    A: isActive ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50',
    B: isActive ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
  };
  
  return `${baseStyle} ${levelColors[level]} ${isActive ? 'shadow-md' : 'opacity-60'}`;
};
