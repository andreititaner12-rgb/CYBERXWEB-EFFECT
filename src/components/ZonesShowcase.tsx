import React, { useState, useEffect, useRef } from 'react';
import { ZONES } from '../data/arenaData';
import { ZoneType } from '../types';
import {
  Users,
  Monitor,
  Check,
  ArrowRight,
  Layers,
  Coffee,
  Zap,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { smoothScrollTo, pauseLenis, resumeLenis } from '../utils/smoothScroll';

interface ZonesShowcaseProps {
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
  zonesList?: ZoneType[];
}

export const ZonesShowcase: React.FC<ZonesShowcaseProps> = ({ onOpenBooking, zonesList }) => {
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const displayZones = zonesList && zonesList.length >= 6 ? zonesList : ZONES;
  const expandedZone = displayZones.find((z) => z.id === expandedZoneId) || null;

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Lock body scroll and pause Lenis while zone details modal is open
  useEffect(() => {
    if (expandedZone) {
      pauseLenis();
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        resumeLenis();
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
      };
    }
  }, [expandedZone]);

  const handleCardClick = (zone: ZoneType) => {
    sound.playClick();

    // Автосимы → перенаправляем в отдельный блок SIM-RACING (#sim-racing)
    if (zone.id === 'sim-racing') {
      const el = document.getElementById('sim-racing');
      if (el) smoothScrollTo(el);
      return;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsClosing(false);
    setExpandedZoneId((prev) => (prev === zone.id ? null : zone.id));
  };

  const closeExpanded = () => {
    if (closeTimerRef.current !== null) return;
    sound.playClick();
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setExpandedZoneId(null);
      setIsClosing(false);
    }, 250);
  };

  return (
    <section id="zones" className="relative py-8 sm:py-12 bg-transparent overflow-hidden scroll-mt-24 select-none">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3.5">
            <Layers className="w-3.5 h-3.5" />
            Архитектура пространств CyberX Омск
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
            ЗОНЫ <span className="text-[#E32124]">//</span> И ЭКСКЛЮЗИВЫ
          </h2>
          <p className="mt-3 text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Интерактивная карта игровых пространств. Нажмите на любую зону, чтобы раскрыть полноразмерные фото и детальную спецификацию.
          </p>
        </div>

        {/* Creative Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 mb-4">

          {/* 1. PREMIUM — большой вертикальный герой (md: 7 cols) */}
          <div className="col-span-1 md:col-span-12 lg:col-span-7 min-h-[340px] lg:min-h-[380px]">
            <BentoZoneCard
              zone={displayZones[0]}
              isExpanded={expandedZoneId === displayZones[0].id}
              onClick={() => handleCardClick(displayZones[0])}
              accentBadge="ХИТ // ЭКСКЛЮЗИВ ARENA"
              tall
            />
          </div>

          {/* 2. SIM-RACING — открывает отдельный раздел (md: 5 cols) */}
          <div className="col-span-1 md:col-span-12 lg:col-span-5 min-h-[340px] lg:min-h-[380px]">
            <BentoZoneCard
              zone={displayZones[1]}
              isExpanded={false}
              onClick={() => handleCardClick(displayZones[1])}
              accentBadge="MOZA DIRECT DRIVE"
              redirectTo="sim-racing"
            />
          </div>

          {/* 3. SOLO ROOM (md: 4 cols / 6 cols on tablet) */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4 min-h-[260px] lg:min-h-[290px]">
            <BentoZoneCard
              zone={displayZones[3]}
              isExpanded={expandedZoneId === displayZones[3].id}
              onClick={() => handleCardClick(displayZones[3])}
              accentBadge="600HZ BENQ SPEED"
            />
          </div>

          {/* 4. КИНО-ЛАУНЖ (md: 4 cols / 6 cols on tablet) */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4 min-h-[260px] lg:min-h-[290px]">
            <BentoZoneCard
              zone={displayZones[2]}
              isExpanded={expandedZoneId === displayZones[2].id}
              onClick={() => handleCardClick(displayZones[2])}
              accentBadge='150" ЭКРАН + СЦЕНА'
            />
          </div>

          {/* 5. PS5 DELUXE ЗАЛЫ (md: 4 cols / 12 cols on tablet) */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4 min-h-[260px] lg:min-h-[290px]">
            <BentoZoneCard
              zone={displayZones[4]}
              isExpanded={expandedZoneId === displayZones[4].id}
              onClick={() => handleCardClick(displayZones[4])}
              accentBadge="10 ЗАЛОВ // ВСЕ КЛУБЫ"
            />
          </div>

          {/* 6. ОТКРЫТЫЙ ЗАЛ (md: 12 cols) */}
          <div className="col-span-1 md:col-span-12 min-h-[200px] lg:min-h-[220px]">
            <BentoZoneCard
              zone={displayZones[5]}
              isExpanded={expandedZoneId === displayZones[5].id}
              onClick={() => handleCardClick(displayZones[5])}
              accentBadge="182 ИГРОВЫХ ПК В ОМСКЕ"
            />
          </div>

        </div>

      </div>

      {/* Expanded Zone Modal with Isolated Native Scroll & Fixed Controls */}
      {expandedZone && (
        <div
          data-lenis-prevent="true"
          className={`fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden overscroll-contain select-none ${
            isClosing ? 'animate-zones-overlay-out pointer-events-none' : 'animate-zones-overlay-in'
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={closeExpanded}
          />

          {/* Modal Container */}
          <div
            key={expandedZone.id}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            className={`relative w-full h-full sm:h-auto sm:max-h-[88vh] max-w-4xl flex flex-col rounded-none sm:rounded-3xl border-0 sm:border border-[#E32124]/40 bg-[#0c0a14] shadow-[0_0_80px_rgba(227,33,36,0.4)] overflow-hidden z-10 my-auto ${
              isClosing ? 'animate-zones-window-out' : 'animate-zones-window-in'
            }`}
          >
            <ExpandedZoneModal
              zone={expandedZone}
              onClose={closeExpanded}
              onOpenBooking={onOpenBooking}
            />
          </div>
        </div>
      )}
    </section>
  );
};

// ===== Expanded Zone Modal Component (Sticky Header + Scrollable Specs + Sticky CTA) =====
interface ExpandedZoneModalProps {
  zone: ZoneType;
  onClose: () => void;
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
}

const ExpandedZoneModal: React.FC<ExpandedZoneModalProps> = ({ zone, onClose, onOpenBooking }) => {
  const gallery = zone.gallery && zone.gallery.length > 0 ? zone.gallery : [zone.image];
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveImage((i) => (i + 1) % gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gallery.length, isFullscreen, onClose]);

  const next = () => {
    sound.playClick();
    setActiveImage((i) => (i + 1) % gallery.length);
  };
  
  const prev = () => {
    sound.playClick();
    setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
  };

  return (
    <>
      {/* 1. STICKY TOP HEADER (Always visible, never clipped or hidden) */}
      <div className="shrink-0 bg-[#120e1a]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3 z-30 font-mono">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <h3 className="font-display font-black text-base sm:text-xl text-white uppercase tracking-tight truncate">
            {zone.name}
          </h3>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 border border-white/15 text-[11px] text-zinc-300 shrink-0">
            <Users className="w-3 h-3 text-[#E32124]" />
            {zone.capacity}
          </span>
          {zone.badge && (
            <span className="px-2.5 py-1 rounded-lg bg-[#E32124] text-white text-[10px] font-bold uppercase shadow-sm shrink-0">
              {zone.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Fullscreen Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              setIsFullscreen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-[#E32124] text-zinc-200 hover:text-white border border-white/15 hover:border-[#E32124] transition-all text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
            title="Развернуть фото на весь экран"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">На весь экран</span>
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-white/[0.06] hover:bg-[#E32124] text-zinc-300 hover:text-white border border-white/15 hover:border-[#E32124] transition-all cursor-pointer active:scale-95 shadow-sm"
            aria-label="Закрыть карточку"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. SCROLLABLE INNER CONTENT (Isolated smooth scroll container) */}
      <div 
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        className="flex-1 overflow-y-auto overscroll-contain flex flex-col no-scrollbar"
      >
        
        {/* Photo Carousel Banner */}
        <div className="relative w-full h-[220px] sm:h-[290px] md:h-[350px] lg:h-[380px] bg-black shrink-0 overflow-hidden group/gallery">
          {gallery.map((imgUrl, idx) => {
            const isActive = idx === activeImage;
            return (
              <div
                key={idx}
                onClick={() => setIsFullscreen(true)}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out cursor-zoom-in ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${zone.name} ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}

          {/* Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a14] via-transparent to-black/40 pointer-events-none z-20" />

          {/* Navigation Arrows on Photo */}
          {gallery.length > 1 && (
            <div className="absolute inset-x-3 sm:inset-x-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-between pointer-events-none">
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  prev(); 
                }}
                className="p-2 sm:p-3 rounded-full bg-black/70 hover:bg-[#E32124] text-white border border-white/20 transition-all pointer-events-auto active:scale-90 shadow-2xl cursor-pointer"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  next(); 
                }}
                className="p-2 sm:p-3 rounded-full bg-black/70 hover:bg-[#E32124] text-white border border-white/20 transition-all pointer-events-auto active:scale-90 shadow-2xl cursor-pointer"
                aria-label="Следующее фото"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}

          {/* Bottom Thumbnails Strip on Photo */}
          {gallery.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
                {gallery.map((g, i) => (
                  <button
                    key={g + i}
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      sound.playClick(); 
                      setActiveImage(i); 
                    }}
                    className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 shadow-lg ${
                      i === activeImage 
                        ? 'border-[#E32124] ring-2 ring-[#E32124]/60 scale-105' 
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/20 text-[11px] font-mono text-zinc-300 shrink-0 backdrop-blur-md">
                {activeImage + 1} / {gallery.length}
              </div>
            </div>
          )}
        </div>

        {/* Detailed Information & Specs */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          
          {/* Tagline and Description */}
          <div>
            <span className="text-xs font-mono font-bold text-[#E32124] uppercase tracking-wider block">
              {zone.tagline}
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2 font-normal">
              {zone.description}
            </p>
          </div>

          {/* Equipment and Features Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono">
            
            {/* Specs Block */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-xs font-bold tracking-wider text-white uppercase block mb-3 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#E32124]" />
                Оснащение и конфигурация:
              </span>
              <div className="space-y-2">
                {zone.hardwareBrief.map((hw, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] shrink-0 shadow-[0_0_6px_#E32124]" />
                    <span>{hw}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Block */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-xs font-bold tracking-wider text-white uppercase block mb-3 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#E32124]" />
                Особенности и сервис:
              </span>
              <div className="space-y-2">
                {zone.features.map((feat, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. STICKY BOTTOM ACTION BAR (Price & CTA) */}
      <div className="shrink-0 bg-[#0c0a14]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 z-30 font-mono">
        <div className="flex items-center justify-between sm:justify-start sm:gap-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-xl sm:text-2xl text-white">
                {zone.pricePerHour} ₽
              </span>
              <span className="text-xs text-zinc-400">/ час</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Ночной пакет (10 ч): <span className="text-white font-bold">{zone.priceNight} ₽</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playTrigger();
            onOpenBooking(
              zone.id.includes('premium') || zone.id.includes('sim-racing') || zone.id.includes('projector')
                ? 'cyberx-arena'
                : undefined,
              zone.id,
            );
          }}
          onMouseEnter={() => sound.playHover()}
          className="w-full sm:w-auto py-3.5 px-6 sm:px-8 rounded-2xl font-mono font-black text-xs sm:text-sm uppercase tracking-[0.16em] text-white bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] shadow-[0_0_25px_rgba(227,33,36,0.5)] hover:shadow-[0_0_40px_rgba(227,33,36,0.85)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20 shrink-0"
        >
          <Zap className="w-4 h-4" />
          <span>Забронировать {zone.name.split('//')[0].trim()}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          4. FULLSCREEN IMMERSIVE LIGHTBOX VIEWER (100vw x 100vh)
      ========================================================================= */}
      {isFullscreen && (
        <div 
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          className="fixed inset-0 z-[300] bg-black/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn select-none"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 font-mono z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-white text-base sm:text-xl uppercase">
                {zone.name}
              </span>
              <span className="text-xs text-zinc-400 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                {activeImage + 1} / {gallery.length}
              </span>
            </div>

            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 sm:p-3 rounded-2xl bg-white/10 hover:bg-[#E32124] text-white transition-all cursor-pointer shadow-xl active:scale-90"
              aria-label="Закрыть полноэкранный режим"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image with Full Containment */}
          <div className="relative my-auto flex items-center justify-center max-h-[75vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[activeImage]}
              alt={`${zone.name} full`}
              className="max-h-[75vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            {/* Left & Right Fullscreen Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    prev(); 
                  }}
                  className="absolute left-2 sm:left-6 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-[#E32124] text-white border border-white/20 transition-all active:scale-90 shadow-2xl cursor-pointer"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    next(); 
                  }}
                  className="absolute right-2 sm:right-6 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-[#E32124] text-white border border-white/20 transition-all active:scale-90 shadow-2xl cursor-pointer"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2 z-10 no-scrollbar" onClick={(e) => e.stopPropagation()}>
              {gallery.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setActiveImage(idx);
                  }}
                  className={`w-12 sm:w-16 h-12 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    idx === activeImage 
                      ? 'border-[#E32124] ring-2 ring-[#E32124] scale-105' 
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

// ===== Bento Zone Card =====
interface BentoZoneCardProps {
  zone: ZoneType;
  className?: string;
  isExpanded?: boolean;
  onClick: () => void;
  accentBadge?: string;
  tall?: boolean;
  redirectTo?: string;
}

const BentoZoneCard: React.FC<BentoZoneCardProps> = ({
  zone,
  isExpanded = false,
  onClick,
  accentBadge,
  tall = false,
  redirectTo,
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => sound.playHover()}
      className={`group relative overflow-hidden cursor-pointer rounded-3xl transition-all duration-300 border bg-[#090910] flex flex-col justify-between p-5 sm:p-6 select-none shadow-xl h-full ${
        isExpanded
          ? 'border-[#E32124] ring-1 ring-[#E32124]/60 shadow-[0_0_35px_rgba(227,33,36,0.3)]'
          : 'border-white/[0.08] hover:border-[#E32124]/60 hover:shadow-[0_0_30px_rgba(227,33,36,0.2)]'
      }`}
    >
      {/* Фото фонового слоя */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#07070b] pointer-events-none">
        <img
          src={zone.image}
          alt={zone.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-75 group-hover:opacity-95"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/45 to-transparent pointer-events-none" />
      </div>

      {/* Верхние бейджи */}
      <div className="relative z-10 flex items-start justify-between gap-2 font-mono">
        <div className="flex flex-wrap items-center gap-2">
          {accentBadge && (
            /эксклюзив/i.test(accentBadge) ? (
              <span className="badge-gold-shimmer px-2.5 py-1 rounded-lg text-[9px] font-extrabold tracking-wider uppercase shadow-md">
                {accentBadge}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-[#E32124] text-white text-[9px] font-bold tracking-wider uppercase shadow-md shadow-red-600/40">
                {accentBadge}
              </span>
            )
          )}
          {(!accentBadge || !/эксклюзив/i.test(accentBadge)) && (
            /эксклюзив/i.test(zone.category) ? (
              <span className="badge-gold-shimmer px-2.5 py-1 rounded-lg text-[9px] font-extrabold tracking-wider uppercase">
                {zone.category}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/15 text-white text-[9px] font-semibold uppercase">
                {zone.category}
              </span>
            )
          )}
        </div>

        {redirectTo ? (
          <div className="p-2 rounded-xl bg-[#E32124] text-white shadow-md shadow-red-600/40 group-hover:scale-110 transition-transform">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-black/60 border border-white/15 text-white group-hover:text-[#E32124] group-hover:bg-white transition-all">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Нижний контент и цена */}
      <div className="relative z-10 mt-auto pt-8 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h3 className={`font-display font-black text-white group-hover:text-[#E32124] transition-colors leading-tight uppercase ${tall ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
              {zone.name}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl font-light line-clamp-1 sm:line-clamp-2">
              {zone.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 uppercase block">Тариф</span>
              <span className="text-base sm:text-lg font-display font-black text-white">
                {zone.pricePerHour} ₽ <span className="text-[10px] font-normal text-zinc-400">/ час</span>
              </span>
            </div>

            <div className={`px-3.5 py-2 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md ${
              redirectTo
                ? 'bg-[#E32124] text-white'
                : isExpanded
                  ? 'bg-[#E32124] text-white'
                  : 'bg-white/10 group-hover:bg-[#E32124] text-white'
            }`}>
              {redirectTo ? (
                <>
                  <span>Открыть раздел</span>
                  <ExternalLink className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>{isExpanded ? 'Закрыть' : 'Обзор'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
