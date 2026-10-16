import { Category, StageInfo, StageId } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'すべての索引', iconName: 'Compass', color: 'indigo' },
  { id: 'ai', name: '開発・エンジニアリング', iconName: 'Cpu', color: 'cyan' },
  { id: 'productivity', name: 'ツール操作・ワークフロー', iconName: 'Zap', color: 'emerald' },
  { id: 'business', name: '設計・マネジメント', iconName: 'Briefcase', color: 'amber' },
  { id: 'culture', name: '思考法・リサーチ', iconName: 'Sparkles', color: 'pink' },
];

export const STAGES: Record<StageId, StageInfo> = {
  innovator: {
    id: 'innovator',
    name: '手順の消滅',
    nameEn: 'Automated',
    percentage: 'AI丸投げ',
    description: '概念（基礎）の理解は必要だが、人間が手作業で書く・作る手順そのものはAIに代替された領域。',
    color: '#06b6d4', // Cyan
    borderColor: 'rgba(6, 182, 212, 0.4)',
    bgGradient: 'from-cyan-500/15 to-transparent',
    rangeX: [4, 18],
  },
  early_adopter: {
    id: 'early_adopter',
    name: '作法の逆転',
    nameEn: 'Inverted',
    percentage: '役割180°変化',
    description: '「0から1を手作りする」から「AIが出した100を検証・軌道修正する」へと人間の役割が逆転した領域。',
    color: '#8b5cf6', // Violet
    borderColor: 'rgba(139, 92, 246, 0.4)',
    bgGradient: 'from-violet-500/15 to-transparent',
    rangeX: [18, 35],
  },
  early_majority: {
    id: 'early_majority',
    name: 'UI・仕様の流動',
    nameEn: 'Volatile UI',
    percentage: '迷子注意',
    description: '裏側の基礎概念は同じなのに、ツールの画面配置や設定作法が頻繁に変わって迷子になりやすい領域。',
    color: '#10b981', // Emerald
    borderColor: 'rgba(16, 185, 129, 0.4)',
    bgGradient: 'from-emerald-500/15 to-transparent',
    rangeX: [37, 63],
  },
  late_majority: {
    id: 'late_majority',
    name: '基礎の重要度倍増',
    nameEn: 'Amplified Core',
    percentage: '人間が握る急所',
    description: 'AIが量産できるようになった結果、むしろ人間側の「基礎理解・設計力」がないと破綻するため価値が跳ね上がった領域。',
    color: '#f59e0b', // Amber
    borderColor: 'rgba(245, 158, 11, 0.4)',
    bgGradient: 'from-amber-500/15 to-transparent',
    rangeX: [63, 85],
  },
  laggard: {
    id: 'laggard',
    name: '不変の原理',
    nameEn: 'Immutable',
    percentage: '10年後も不変',
    description: 'AI時代になろうがツールが変わろうが、一切古びない絶対的な基礎理論・メンタルモデル。',
    color: '#64748b', // Slate
    borderColor: 'rgba(100, 116, 139, 0.4)',
    bgGradient: 'from-slate-500/15 to-transparent',
    rangeX: [85, 96],
  },
};

// Boundary position between "AI-delegated execution" and "Human-held core"
export const CHASM_X_PERCENT = 35.5;
