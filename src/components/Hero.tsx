import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { sound } from '../utils/sound';
import { smoothScrollTo } from '../utils/smoothScroll';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  isReady?: boolean;
  onOpenBooking: () => void;
  onOpenTournaments?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  isReady = true, 
  onOpenBooking 
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Parallax exit transformation on scroll
  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 800], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 650], [1, 0.1]);

  const navItems = [
    { num: '01', label: 'КЛУБЫ', target: 'arenas' },
    { num: '02', label: 'ПРАЙС', target: 'pricing' },
    { num: '03', label: 'ЖЕЛЕЗО', target: 'hardware' },
    { num: '04', label: 'ТУРНИРЫ', target: 'tournaments' },
    { num: '05', label: 'АКЦИИ', target: 'promotions' },
  ];

  // Sound cues on entrance
  useEffect(() => {
    if (!isReady) return;

    const timers: NodeJS.Timeout[] = [];
    navItems.forEach((_, idx) => {
      const delayMs = (0.1 + idx * 0.12) * 1000;
      const t = setTimeout(() => {
        sound.playNavAppear(idx);
      }, delayMs);
      timers.push(t);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isReady]);

  // Video IntersectionObserver for 60fps zero-lag performance
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      smoothScrollTo(element);
    }
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden select-none bg-[#020204] z-10 flex flex-col justify-between"
    >
      {/* Background Video Layer */}
      <motion.div 
        style={{ 
          y: heroTranslateY, 
          opacity: heroOpacity,
        }}
        className="absolute inset-0 w-full h-full transform-gpu origin-center pointer-events-none"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero-bg-poster.jpg"
            className="w-full h-full object-cover object-center scale-[1.01]"
            src="/hero-bg.mp4"
          />

          {/* Darkening & cinematic vignettes for maximum text contrast */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:from-black/90 sm:via-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.75)_100%)]" />
        </div>
      </motion.div>

      {/* Main Hero Content Area (Aligned to left container) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 flex-1 flex flex-col justify-center">
        
        {/* 1. Category Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
          animate={isReady ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-4 sm:mb-6"
        >
          <span className="w-6 sm:w-8 h-[2px] bg-[#E32124] shadow-[0_0_8px_#E32124]" />
          <span className="font-mono text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-zinc-300 uppercase">
            СЕТЬ КИБЕРСПОРТИВНЫХ АРЕН — ОМСК
          </span>
        </motion.div>

        {/* 2. Main Title: CYBERX + АРЕНЫ + ОМСКА */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
          animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(14px)' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-0.5 sm:space-y-1"
        >
          {/* CYBERX (Solid bold white) */}
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-[0.88] drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            CYBERX
          </h1>

          {/* АРЕНЫ (Outlined text) */}
          <div className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.88] text-outline-hero drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:text-white transition-colors duration-300">
            АРЕНЫ
          </div>

          {/* ОМСКА (Outlined text) */}
          <div className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.88] text-outline-hero drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:text-white transition-colors duration-300">
            ОМСКА
          </div>
        </motion.div>

        {/* 3. Description Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-7 text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl font-normal leading-relaxed drop-shadow-md"
        >
          182 ПК на мониторах до 600Hz, Premium-комнаты, автосимуляторы Sim-Racing и LAN-сцена. Три клуба в центре Омска и в округах — открыты круглосуточно.
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5 sm:gap-5"
        >
          {/* Primary Red Pill Button: ЗАБРОНИРОВАТЬ СТОЛ */}
          <button
            onClick={() => {
              sound.playTrigger();
              onOpenBooking();
            }}
            onMouseEnter={() => sound.playHover()}
            className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono text-xs sm:text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_35px_rgba(227,33,36,0.65)] hover:shadow-[0_0_55px_rgba(227,33,36,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border border-white/20 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            <span>ЗАБРОНИРОВАТЬ СТОЛ</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Secondary Glass Highlight Button: ПОЗНАКОМИТЬСЯ */}
          <button
            onClick={() => scrollTo('manifesto')}
            onMouseEnter={() => sound.playHover()}
            className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] border border-white/25 hover:border-white/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="group-hover:text-white transition-colors">ПОЗНАКОМИТЬСЯ</span>
          </button>
        </motion.div>

      </div>

      {/* 5. Bottom Navigation Bar with Scroll Prompt (Larger, High-Contrast & Intuitive) */}
      <div className="relative z-20 w-full border-t border-white/[0.1] bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4 flex-wrap">
          
          {/* Categories Navigation with Larger Readable Font */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.target}
                initial={{ opacity: 0, y: 10 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                onClick={() => scrollTo(item.target)}
                onMouseEnter={() => sound.playHover()}
                className="group inline-flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm md:text-base font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-zinc-300 hover:text-white transition-all cursor-pointer whitespace-nowrap py-1 relative"
              >
                <span className="text-[#E32124] text-[10px] sm:text-xs font-mono font-bold group-hover:text-white transition-colors">
                  {item.num}
                </span>
                <span className="group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(227,33,36,0.8)] transition-all">
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E32124] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#E32124]" />
              </motion.button>
            ))}
          </div>

          {/* Right Scroll Prompt: ЛИСТАЙТЕ ↓ */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            onClick={() => scrollTo('manifesto')}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-zinc-400 hover:text-white transition-colors cursor-pointer group py-1"
          >
            <span className="group-hover:text-[#E32124] transition-colors">ЛИСТАЙТЕ</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-[#E32124] group-hover:translate-y-0.5 transition-transform" />
            </motion.div>
          </motion.button>

        </div>
      </div>

    </section>
  );
};
