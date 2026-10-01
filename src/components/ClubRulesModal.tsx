import React, { useState, useEffect } from 'react';
import { CLUB_RULES_PAGE_1, CLUB_RULES_PAGE_2 } from '../data/clubRulesData';
import { 
  X, 
  FileText, 
  Search, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/sound';
import { pauseLenis, resumeLenis } from '../utils/smoothScroll';

interface ClubRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAndBook?: () => void;
  isFirstBookingGate?: boolean;
}

export const ClubRulesModal: React.FC<ClubRulesModalProps> = ({
  isOpen,
  onClose,
  onConfirmAndBook,
  isFirstBookingGate = false,
}) => {
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock body scroll and pause Lenis while rules modal is active
  useEffect(() => {
    if (!isOpen) return;
    pauseLenis();
    const originalOverflow = document.body.style.overflow;
    const originalTouch = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && activePage === 1) setActivePage(2);
      if (e.key === 'ArrowLeft' && activePage === 2) setActivePage(1);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      resumeLenis();
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouch;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, activePage, onClose]);

  if (!isOpen) return null;

  const currentRules = activePage === 1 ? CLUB_RULES_PAGE_1 : CLUB_RULES_PAGE_2;
  const filteredRules = searchQuery.trim()
    ? [...CLUB_RULES_PAGE_1, ...CLUB_RULES_PAGE_2].filter((r) =>
        r.text.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : currentRules;

  const handleConfirm = () => {
    sound.playClick();
    try {
      sessionStorage.setItem('cyberx_rules_confirmed', 'true');
    } catch {}
    if (onConfirmAndBook) {
      onConfirmAndBook();
    } else {
      onClose();
    }
  };

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[220] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn select-none overscroll-contain"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        className="relative w-full h-full sm:h-auto sm:max-h-[90vh] max-w-4xl flex flex-col rounded-none sm:rounded-3xl border-0 sm:border border-[#E32124]/40 bg-gradient-to-b from-[#110e18] via-[#090710] to-[#040306] shadow-[0_0_80px_rgba(227,33,36,0.4)] overflow-hidden z-10 my-auto"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent shadow-[0_0_12px_#E32124] pointer-events-none" />

        {/* 1. STICKY TOP HEADER */}
        <div className="shrink-0 bg-[#140f1c]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 z-30 font-mono">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E32124]/20 border border-[#E32124]/50 flex items-center justify-center text-[#E32124] shrink-0 shadow-[0_0_15px_rgba(227,33,36,0.35)]">
              <FileText className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                  ПРАВИЛА КЛУБА
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#E32124] text-white font-bold uppercase tracking-widest hidden sm:inline">
                  CYBERX COMMUNITY
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                Официальный регламент посещения киберарен в Омске (43 пункта)
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-[#E32124] text-zinc-300 hover:text-white border border-white/15 hover:border-[#E32124] transition-all cursor-pointer active:scale-95 shadow-sm"
            aria-label="Закрыть правила"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. SUB-HEADER: TABS SWITCHER & SEARCH BAR */}
        <div className="shrink-0 bg-[#0d0a14] border-b border-white/[0.08] px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
          
          {/* Page Tabs */}
          {!searchQuery && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActivePage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activePage === 1
                    ? 'bg-[#E32124] text-white shadow-md shadow-red-600/40 border border-white/20'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                <span>СТРАНИЦА 01</span>
                <span className="text-[10px] opacity-75">(1—23)</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActivePage(2);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activePage === 2
                    ? 'bg-[#E32124] text-white shadow-md shadow-red-600/40 border border-white/20'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                <span>СТРАНИЦА 02</span>
                <span className="text-[10px] opacity-75">(24—43)</span>
              </button>
            </div>
          )}

          {/* Live Search Filter */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по правилам (18+, еда, bios...)"
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E32124]/70 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* 3. SCROLLABLE RULES LIST */}
        <div 
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-3 font-mono text-xs no-scrollbar"
        >
          {filteredRules.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              По вашему запросу «{searchQuery}» ничего не найдено
            </div>
          ) : (
            filteredRules.map((rule) => {
              const isWarning = /ночн|18\+|оружи|драть|алког|ущерб|биос|bios|чит|скинченджер/i.test(rule.text);
              const numStr = rule.id < 10 ? `0${rule.id}` : `${rule.id}`;

              return (
                <div
                  key={rule.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                    isWarning
                      ? 'bg-gradient-to-r from-red-950/20 via-black/40 to-black/60 border-red-500/30 hover:border-red-500/50'
                      : 'bg-white/[0.02] border-white/[0.07] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Rule Number Badge */}
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-sm ${
                      isWarning
                        ? 'bg-[#E32124] text-white shadow-red-900/50'
                        : 'bg-white/[0.08] text-zinc-300 border border-white/10'
                    }`}>
                      {numStr}
                    </span>

                    {/* Rule Text */}
                    <p className="text-zinc-200 leading-relaxed font-normal pt-0.5">
                      {rule.text}
                    </p>
                  </div>
                </div>
              );
            })
          )}

          {/* Quick Page Jump Prompt at Bottom */}
          {!searchQuery && (
            <div className="pt-4 flex items-center justify-between border-t border-white/[0.06] text-xs text-zinc-400">
              {activePage === 1 ? (
                <button
                  onClick={() => {
                    sound.playClick();
                    setActivePage(2);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 text-white border border-white/10 flex items-center gap-2 cursor-pointer transition-all ml-auto"
                >
                  <span>Перейти к Странице 02 (Правила 24—43)</span>
                  <ChevronRight className="w-4 h-4 text-[#E32124]" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sound.playClick();
                    setActivePage(1);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 text-white border border-white/10 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-[#E32124]" />
                  <span>Вернуться к Странице 01 (Правила 1—23)</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* 4. STICKY BOTTOM ACTION BAR */}
        <div className="shrink-0 bg-[#0c0a14]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 z-30 font-mono">
          
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Незнание правил не освобождает от ответственности</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {isFirstBookingGate ? (
              <button
                onClick={handleConfirm}
                className="w-full sm:w-auto py-3.5 px-6 sm:px-8 rounded-2xl font-mono font-black text-xs sm:text-sm uppercase tracking-[0.16em] text-white bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] shadow-[0_0_30px_rgba(227,33,36,0.65)] hover:shadow-[0_0_45px_rgba(227,33,36,0.95)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20 shrink-0"
              >
                <span>ПОНЯТНО, ПЕРЕЙТИ К БРОНИРОВАНИЮ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto py-3 px-5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/15 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all text-center"
                >
                  ЗАКРЫТЬ
                </button>

                {onConfirmAndBook && (
                  <button
                    onClick={handleConfirm}
                    className="w-1/2 sm:w-auto py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E32124] to-[#FF2A2E] shadow-md hover:shadow-red-600/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                  >
                    <span>ЗАБРОНИРОВАТЬ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
