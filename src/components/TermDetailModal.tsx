import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Waves,
  Droplets,
  GitMerge,
  Languages,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { TermData, JourneyStep, StageId } from '../types';
import { STAGES } from '../data/stages';

interface TermDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  term: TermData | null;
  onDeleteTerm: (termId: string) => void;
  isWatched?: boolean;
  onToggleWatch?: () => void;
}

export const TermDetailModal: React.FC<TermDetailModalProps> = ({
  isOpen,
  onClose,
  term,
  onDeleteTerm,
  isWatched = false,
  onToggleWatch,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !term) return null;

  const stageId = (term.stage || (term as any).phase || 'innovator') as StageId;
  const stage = STAGES[stageId] || STAGES.innovator;
  const encodedQuery = encodeURIComponent(term.name);

  const getPhaseIcon = (phase: JourneyStep['phase']) => {
    switch (phase) {
      case 'origin':
        return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'spread':
        return <GitMerge className="w-4 h-4 text-violet-400" />;
      case 'border_crossing':
        return <Languages className="w-4 h-4 text-emerald-400" />;
      case 'mainstream':
        return <Waves className="w-4 h-4 text-amber-400" />;
      default:
        return <Droplets className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getPhaseBadgeColor = (phase: JourneyStep['phase']) => {
    switch (phase) {
      case 'origin':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'spread':
        return 'bg-violet-500/10 text-violet-300 border-violet-500/30';
      case 'border_crossing':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'mainstream':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    }
  };

  const handleDelete = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    onDeleteTerm(term.id);
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="term-detail-modal-overlay"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#0d1117] border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-7 text-slate-200 z-10 max-h-[90vh] overflow-y-auto no-scrollbar cursor-default"
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-inner mt-0.5">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {term.name}
                  </h3>
                  {term.reading && (
                    <span className="text-xs text-slate-400 font-medium">
                      ({term.reading})
                    </span>
                  )}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                    {term.categoryLabel}
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                    style={{
                      borderColor: stage.borderColor,
                      color: stage.color,
                      backgroundColor: `${stage.color}15`
                    }}
                  >
                    索引：{stage.name} ({stage.percentage})
                  </span>
                  {term.nearChasm && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      AI転換の境界線
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {term.summary}
                </p>
              </div>
            </div>

            {/* Action buttons: Accept & Reject */}
            <div className="flex items-center gap-2 ml-auto">
              {onToggleWatch && (
                <button
                  id="modal-toggle-watch-btn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatch();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                    isWatched
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white border-indigo-500/40'
                  }`}
                  title={isWatched ? '承認を解除' : 'この差分を辞典にアクセプト（承認）する'}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isWatched ? 'text-emerald-400' : 'text-indigo-400'}`} />
                  <span>{isWatched ? '✅ アクセプト済（辞典登録）' : '📥 アクセプト（辞典に採用）'}</span>
                </button>
              )}

              <button
                id="modal-delete-term-btn"
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/30 hover:border-rose-600 transition-all cursor-pointer shadow-sm active:scale-95"
                title="この候補を却下して削除"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>却下</span>
              </button>

              <button
                id="modal-close-x-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
                title="閉じる"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* External Commons Links (Delegate basic definition to external sites) */}
          <div className="my-4 p-3 rounded-xl bg-slate-900/90 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>用語そのものの基礎辞典（外部コモンズを参照）：</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`https://ja.wikipedia.org/wiki/Special:Search?search=${encodedQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1 transition-colors"
              >
                Wikipedia <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`https://e-words.jp/?q=${encodedQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 flex items-center gap-1 transition-colors"
              >
                IT用語辞典 e-Words <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`https://developer.mozilla.org/ja/search?q=${encodedQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center gap-1 transition-colors"
              >
                MDN Docs <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block">基礎知識の重要度</span>
              <span className="text-xl font-bold text-cyan-400 font-mono">
                {term.insights.comprehensionScore}%
              </span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block">不変度座標（右ほど不変）</span>
              <span className="text-xl font-bold text-indigo-400 font-mono">
                {term.stageProgress}%
              </span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block">基礎概念の誕生年</span>
              <span className="text-xl font-bold text-slate-200 font-mono">
                {term.firstAppearedYear}年頃
              </span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block">陳腐化・アップデート診断</span>
              <span className="text-sm font-bold text-amber-300 flex items-center gap-1 mt-1">
                {term.audienceSafety?.executiveClient?.statusLabel ?? '要アップデート確認'}
              </span>
            </div>
          </div>

          {/* Definition */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed mb-5">
            <strong className="text-slate-100 font-semibold mr-1">本質とAI時代の位置づけ：</strong>
            {term.definition}
          </div>

          {/* Evolution Stream Steps */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-cyan-400" />
              知識の4段階・進化ストリーム（不変の基礎 ➔ 古くなった情報 ➔ AI時代の差分）
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {term.journey.map((step) => (
                <div
                  key={step.phase}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${getPhaseBadgeColor(step.phase)}`}>
                        {getPhaseIcon(step.phase)}
                        {step.phaseTitle}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{step.year}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white leading-snug">{step.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono truncate">
                    領域・対象: {step.platform}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              {term.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-600/90 border border-rose-500/40 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>この候補を却下（削除）</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
