import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Gauge, Zap, ArrowRight, Trophy, Maximize2, X } from 'lucide-react';
import { sound } from '../utils/sound';
import { pauseLenis, resumeLenis } from '../utils/smoothScroll';

interface SimRacingBannerProps {
  onOpenBooking: (arenaId: string, zoneId: string) => void;
}

export const SimRacingBanner: React.FC<SimRacingBannerProps> = ({ onOpenBooking }) => {
  const [selectedGame, setSelectedGame] = useState<string>('assetto');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Lock body scroll and pause Lenis when lightbox is active
  useEffect(() => {
    if (isLightboxOpen) {
      pauseLenis();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsLightboxOpen(false);
        }
      };
      window.addEventListener('keydown', handleKey);

      return () => {
        resumeLenis();
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [isLightboxOpen]);

  const games = [
    { id: 'forza', name: 'FORZA HORIZON 6', desc: 'Открытый мир, живописные трассы и топ-суперкары' },
    { id: 'assetto', name: 'ASSETTO CORSA', desc: 'Эталонная физика, кастомные треки и соревновательный дрифт' },
    { id: 'acc', name: 'ASSETTO CORSA COMPETIZIONE', desc: 'Официальный хардкорный симулятор GT3 и гонок на выносливость' },
    { id: 'dirt', name: 'DiRT RALLY', desc: 'Раллийные спецучастки, грязь, гравий и заносы' },
    { id: 'beamng', name: 'BEAMNG.DRIVE', desc: 'Мягкотелая физика узлов автомобиля и реалистичные краш-тесты' },
    { id: 'citycar', name: 'CITY CAR DRIVING', desc: 'Обучение и реалистичное вождение в плотном городском трафике' },
  ];

  const activeGameInfo = games.find((g) => g.id === selectedGame) || games[0];

  return (
    <section id="sim-racing" className="relative py-8 sm:py-12 bg-transparent overflow-hidden select-none scroll-mt-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl border border-[#E32124]/30 bg-gradient-to-br from-[#0c0c14] via-[#07070b] to-[#020204] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-2xl">
          
          {/* Top highlight bar */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent shadow-[0_0_10px_#E32124]" />

          {/* Watermark */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-5 select-none font-display font-black text-[220px] text-white">
            MOZA
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex flex-wrap items-center gap-2.5 font-mono mb-3">
                  <span className="badge-gold-shimmer px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Gauge className="w-3.5 h-3.5 text-[#241300]" />
                    ЭКСКЛЮЗИВ // ТОЛЬКО НА ЛЕНИНА, 19
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-zinc-300">
                    2 ГОНОЧНЫХ КОКПИТА MOZA
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
                  SIM-RACING <span className="text-[#E32124]">//</span> АВТОСИМУЛЯТОРЫ
                </h3>
                
                <p className="mt-3 text-xs sm:text-sm text-zinc-300 max-w-xl font-normal leading-relaxed">
                  Почувствуйте реальный перегруз и сцепление колес с асфальтом на рулевой базе <span className="text-white font-bold">Moza Direct Drive</span> с мгновенным Force Feedback, педальном узле <span className="text-white font-bold">Moza Load Cell</span> с тензодатчиками и изогнутых UltraWide мониторах.
                </p>
              </div>

              {/* Specs & Hardware pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm">
                  <span className="text-[10px] uppercase text-zinc-400 block font-semibold">База руля</span>
                  <div className="text-xs font-bold text-white mt-1">Moza Direct Drive</div>
                  <div className="text-[10px] text-[#E32124] mt-0.5 font-bold">Чистый прямой привод FFB</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm">
                  <span className="text-[10px] uppercase text-zinc-400 block font-semibold">Педальный узел</span>
                  <div className="text-xs font-bold text-white mt-1">Moza Load Cell</div>
                  <div className="text-[10px] text-zinc-300 mt-0.5 font-medium">Тензодатчик давления</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm">
                  <span className="text-[10px] uppercase text-zinc-400 block font-semibold">Режим гонки</span>
                  <div className="text-xs font-bold text-white mt-1">Парные дуэли 1v1</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5 font-bold">Синхронизация заездов</div>
                </div>
              </div>

              {/* Game Switcher */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2.5 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#E32124]" />
                  Доступные гоночные дисциплины:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {games.map((g) => {
                    const isSelected = selectedGame === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedGame(g.id);
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className={`px-3 py-2 rounded-xl text-[11px] font-mono font-bold transition-all border text-left flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#E32124] text-white border-[#E32124] shadow-md shadow-red-600/30'
                            : 'bg-white/[0.04] text-zinc-200 border-white/10 hover:bg-white/[0.08] hover:text-white'
                        }`}
                      >
                        <span className="truncate">{g.name}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white ml-1 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Game Description */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-300 font-mono">
                  <span className="text-white font-bold">{activeGameInfo.name}:</span> {activeGameInfo.desc}
                </div>
              </div>

              {/* Price & CTA Row on Desktop */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-4 font-mono">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Стоимость заезда</span>
                  <div className="font-display font-black text-2xl text-white">
                    600 ₽ <span className="text-xs font-normal text-zinc-400">/ час (утро от 400 ₽)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>2 кокпита готовы к заездам</span>
                </div>
              </div>

            </div>

            {/* Right Card: Vertical High-Impact Portrait Frame (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-3xl bg-[#090910] border border-white/[0.1] relative font-mono shadow-2xl overflow-hidden group/photo">
              
              {/* Vertical Photo Frame (Tall Portrait Ratio) */}
              <div 
                onClick={() => {
                  sound.playClick();
                  setIsLightboxOpen(true);
                }}
                className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black cursor-pointer group/frame"
              >
                <img
                  src="/images/sim-racing-real.jpg"
                  alt="CyberX Sim Racing Омск Ленина 19"
                  className="w-full h-full object-cover object-center group-hover/frame:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090910]/80 via-transparent to-black/40 pointer-events-none" />
                
                {/* Fullscreen Photo Button at Top */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    setIsLightboxOpen(true);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="absolute top-3.5 right-3.5 z-20 px-3.5 py-2 rounded-xl bg-black/85 hover:bg-[#E32124] text-white text-xs font-mono font-bold flex items-center gap-2 border border-white/20 backdrop-blur-md transition-all shadow-xl cursor-pointer active:scale-95 group/btn"
                  title="Открыть фото на весь экран"
                >
                  <Maximize2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  <span>ФОТО НА ВЕСЬ ЭКРАН</span>
                </button>
              </div>

              {/* Action Booking Button */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    sound.playTrigger();
                    onOpenBooking('cyberx-arena', 'sim-racing');
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-4 px-6 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.18em] text-white bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] hover:shadow-[0_0_35px_rgba(227,33,36,0.7)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20 shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  <span>Забронировать автосимулятор</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Full-Screen Sim Racing Photo Lightbox Portal */}
      {isLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          data-lenis-prevent="true"
          onClick={() => {
            sound.playClick();
            setIsLightboxOpen(false);
          }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-zones-overlay-in cursor-default"
        >
          {/* Top Bar with Title & Close Button */}
          <div className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2.5">
              <span className="badge-gold-shimmer px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase">
                Sim-Racing Moza
              </span>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                CyberX Arena • ул. Ленина, 19
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setIsLightboxOpen(false);
              }}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#E32124] text-white transition-all cursor-pointer shadow-lg active:scale-90"
              aria-label="Закрыть фото"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Centered High-Res Image */}
          <div className="relative my-auto flex items-center justify-center max-h-[82vh] w-full cursor-default" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/sim-racing-real.jpg"
              alt="CyberX Sim Racing Омск Ленина 19 Fullscreen"
              className="max-h-[80vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl border border-white/20 cursor-default"
            />
          </div>

          {/* Bottom Bar Caption */}
          <div className="text-center text-xs font-mono text-zinc-300 py-1" onClick={(e) => e.stopPropagation()}>
            Нажмите <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/20 font-bold">ESC</kbd> или <span className="text-white font-bold">Крестик</span> для закрытия
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
