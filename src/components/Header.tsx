import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { smoothScrollTo } from '../utils/smoothScroll';
import { Volume2, VolumeX, MapPin, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenTournaments: () => void;
  onOpenAdmin?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenTournaments,
  isMuted = false,
  onToggleMute
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      smoothScrollTo(element);
    }
  };

  const mobileNavItems = [
    { num: '01', label: 'КЛУБЫ', action: () => scrollTo('arenas') },
    { num: '02', label: 'ПРАЙС', action: () => scrollTo('pricing') },
    { num: '03', label: 'ЖЕЛЕЗО', action: () => scrollTo('hardware') },
    { num: '04', label: 'ТУРНИРЫ', action: () => { sound.playClick(); setMobileMenuOpen(false); onOpenTournaments(); } },
    { num: '05', label: 'АКЦИИ', action: () => scrollTo('promotions') },
    { num: '06', label: 'КАК ДОБРАТЬСЯ', action: () => scrollTo('location') },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-auto select-none">
        <div
          className={`w-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#050508]/90 backdrop-blur-md border-b border-white/[0.08] py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
              : 'bg-transparent py-4 sm:py-5 border-b border-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3 sm:gap-6">
              
              {/* Left: CyberX Brandmark */}
              <div 
                onClick={() => scrollTo('hero')} 
                className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
              >
                <div className="relative flex items-center h-8 sm:h-9">
                  <img
                    src="/logo-horizontal.png"
                    alt="CyberX Community Omsk"
                    className="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(227,33,36,0.5)] group-hover:brightness-125 transition-all"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                
                <span className="hidden lg:inline-block font-mono text-[11px] tracking-[0.25em] text-zinc-400 uppercase group-hover:text-white transition-colors border-l border-white/10 pl-3">
                  OMSK // 3 CLUBS
                </span>
              </div>

              {/* Center: Desktop Navigation Links */}
              <nav 
                className={`hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-300 transition-all duration-300 ${
                  scrolled
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <button
                  onClick={() => scrollTo('arenas')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>КЛУБЫ</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('pricing')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>ПРАЙС</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('hardware')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>ЖЕЛЕЗО</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenTournaments();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group text-zinc-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>ТУРНИРЫ</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] shadow-[0_0_8px_#E32124]" />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('promotions')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>АКЦИИ</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('location')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-[#E32124] transition-colors py-1 relative group flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E32124]" />
                  <span>КАК ДОБРАТЬСЯ?</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
              </nav>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                
                {/* Audio Mute / Unmute Button */}
                {onToggleMute && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onToggleMute();
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="p-2 sm:p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                    aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                    title={isMuted ? 'Включить звук' : 'Выключить звук'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#E32124] animate-pulse" />
                    )}
                  </button>
                )}

                {/* Primary Booking Button (Desktop) */}
                <button
                  onClick={() => {
                    sound.playTrigger();
                    onOpenBooking();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="hidden sm:inline-flex relative group px-5 lg:px-6 py-2 sm:py-2.5 rounded-full font-mono text-[11px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-zinc-200 hover:text-white bg-white/[0.06] hover:bg-[#E32124]/25 border border-white/15 hover:border-[#E32124]/70 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(227,33,36,0.4)] transition-all duration-300 overflow-hidden active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>ЗАБРОНИРОВАТЬ</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E32124] group-hover:text-white transition-colors" />
                  </span>
                </button>

                {/* Mobile Hamburger Toggle */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(true);
                  }}
                  className="md:hidden w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-zinc-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                  aria-label="Открыть меню"
                >
                  <Menu className="w-5 h-5" />
                </button>

              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Minimalist Mobile Menu Overlay (Matching Screenshot 3) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] md:hidden bg-[#030306]/98 backdrop-blur-3xl flex flex-col justify-between p-5 sm:p-7 overflow-y-auto"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#E32124]/15 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />

            {/* Top Bar: Logo + Close Button */}
            <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div 
                onClick={() => scrollTo('hero')} 
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <img
                  src="/logo-omsk.png"
                  alt="CyberX Community Omsk"
                  className="h-9 w-auto object-contain drop-shadow-[0_0_15px_rgba(227,33,36,0.6)]"
                />
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="w-11 h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xl"
                aria-label="Закрыть меню"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle: Navigation List with Numbers & Glow Effect */}
            <div className="relative z-10 my-auto py-6 space-y-1">
              {mobileNavItems.map((item, idx) => (
                <div
                  key={item.num}
                  className="border-b border-white/[0.08] last:border-b-0"
                >
                  <button
                    onClick={item.action}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="w-full py-4 px-3 rounded-2xl flex items-center justify-between text-left group transition-all duration-200 relative overflow-hidden"
                  >
                    {/* Hover Ambient Highlight Pill */}
                    {hoveredIndex === idx && (
                      <motion.div
                        layoutId="mobileMenuGlow"
                        className="absolute inset-0 bg-gradient-to-r from-[#E32124]/20 via-[#E32124]/10 to-transparent rounded-2xl pointer-events-none"
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    <div className="flex items-baseline gap-4 relative z-10">
                      <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-[#E32124] transition-colors">
                        {item.num}
                      </span>
                      <span className="font-display font-black text-2xl sm:text-3xl tracking-wider text-white uppercase group-hover:text-white group-hover:translate-x-1.5 transition-all">
                        {item.label}
                      </span>
                    </div>

                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#E32124] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all relative z-10" />
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Controls: Primary Red Button + Phone & Status */}
            <div className="relative z-10 pt-6 space-y-4">
              <button
                onClick={() => {
                  sound.playTrigger();
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono font-black text-sm sm:text-base uppercase tracking-[0.2em] shadow-[0_0_35px_rgba(227,33,36,0.65)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <span>ЗАБРОНИРОВАТЬ СТОЛ</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-2 pt-1">
                <a 
                  href="tel:+79081109777"
                  className="hover:text-white transition-colors"
                >
                  +7 (908) 110-97-77
                </a>
                <span className="text-zinc-500 uppercase tracking-widest">
                  ОМСК // 24/7
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
