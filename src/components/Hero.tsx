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

  // Parallax transforms: Hero content gently fades and recedes upwards as curtain rolls over
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.1]);
  const contentTranslateY = useTransform(scrollY, [0, 500], [0, -60]);
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.97]);
  const videoTranslateY = useTransform(scrollY, [0, 600], [0, 80]);

  const navItems = [
    { num: '01', label: 'КЛУБЫ', target: 'arenas' },
    { num: '02', label: 'ПРАЙС', target: 'pricing' },
    { num: '03', label: 'ЖЕЛЕЗО', target: 'hardware' },
    { num: '04', label: 'ТУРНИРЫ', target: 'tournaments' },
    { num: '05', label: 'МЕРОПРИЯТИЯ', target: 'events' },
    { num: '06', label: 'АКЦИИ', target: 'promotions' },
    { num: '07', label: 'FAQ', target: 'faq' },
  ];

  // Sound cues on entrance
  useEffect(() => {
    if (!isReady) return;

    const timers: NodeJS.Timeout[] = [];
    navItems.forEach((_, idx) => {
      const delayMs = (0.08 + idx * 0.1) * 1000;
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
      className="sticky top-0 h-screen min-h-[660px] w-full overflow-hidden select-none bg-[#020204] z-10 flex flex-col justify-between"
    >
      {/* Background Video Layer with Parallax */}
      <motion.div 
        style={{ y: videoTranslateY }}
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

          {/* Darkening & cinematic vignettes */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.75)_100%)]" />
        </div>
      </motion.div>

      {/* Main Hero Content Area: Inset from the left comfortably */}
      <motion.div 
        style={{ 
          opacity: contentOpacity, 
          y: contentTranslateY, 
          scale: contentScale 
        }}
        className="relative z-20 w-full max-w-[1520px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-10 flex-1 flex flex-col justify-center"
      >
        
        {/* 1. Category Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
          animate={isReady ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-3 sm:mb-4 lg:mb-5"
        >
          <span className="w-6 sm:w-9 h-[2px] bg-[#E32124] shadow-[0_0_8px_#E32124]" />
          <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-zinc-300 uppercase">
            СЕТЬ КИБЕРСПОРТИВНЫХ АРЕН — ОМСК
          </span>
        </motion.div>

        {/* 2. Main Title: Large Scale Modern Typography */}
        <div className="space-y-0.5 sm:space-y-1">
          {/* CYBERX (Solid bold white) */}
          <motion.h1 
            initial={{ opacity: 0, y: 35, filter: 'blur(16px)' }}
            animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 35, filter: 'blur(16px)' }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px] 2xl:text-[180px] tracking-tight text-white uppercase leading-[0.82] drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
          >
            CYBERX
          </motion.h1>

          {/* АРЕНЫ (Outlined text) */}
          <motion.div 
            initial={{ opacity: 0, y: 35, filter: 'blur(16px)' }}
            animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 35, filter: 'blur(16px)' }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px] 2xl:text-[180px] tracking-tight uppercase leading-[0.82] text-outline-hero drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
          >
            АРЕНЫ
          </motion.div>

          {/* ОМСКА (Outlined text) */}
          <motion.div 
            initial={{ opacity: 0, y: 35, filter: 'blur(16px)' }}
            animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 35, filter: 'blur(16px)' }}
            transition={{ duration: 0.55, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px] 2xl:text-[180px] tracking-tight uppercase leading-[0.82] text-outline-hero drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
          >
            ОМСКА
          </motion.div>
        </div>

        {/* 3. Bottom Row Beneath Title: Paragraph on the left + Action Buttons on the right */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: 'blur(12px)' }}
          animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 25, filter: 'blur(12px)' }}
          transition={{ duration: 0.55, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 max-w-5xl"
        >
          {/* Paragraph Description */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-md font-normal leading-relaxed drop-shadow-md">
            182 ПК на мониторах до 600Hz, Premium-комнаты, автосимуляторы Sim-Racing и LAN-сцена. Три клуба в центре Омска и в округах — открыты круглосуточно.
          </p>

          {/* Action Buttons (Right adjacent) */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
            {/* Primary Red Pill Button: ЗАБРОНИРОВАТЬ СТОЛ */}
            <button
              onClick={() => {
                sound.playTrigger();
                onOpenBooking();
              }}
              onMouseEnter={() => sound.playHover()}
              className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-[0.18em] shadow-[0_0_30px_rgba(227,33,36,0.65)] hover:shadow-[0_0_50px_rgba(227,33,36,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-white/20 overflow-hidden whitespace-nowrap"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <span>ЗАБРОНИРОВАТЬ СТОЛ</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary Glass Highlight Button: ПОЗНАКОМИТЬСЯ */}
            <button
              onClick={() => scrollTo('manifesto')}
              onMouseEnter={() => sound.playHover()}
              className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.14] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-[0.18em] border border-white/25 hover:border-white/50 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer overflow-hidden whitespace-nowrap"
            >
              <span className="group-hover:text-white transition-colors">ПОЗНАКОМИТЬСЯ</span>
            </button>
          </div>
        </motion.div>

      </motion.div>

      {/* 4. Bottom Navigation Bar with Scroll Prompt */}
      <div className="relative z-20 w-full border-t border-white/[0.08] bg-black/60 backdrop-blur-xl">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28 py-3.5 sm:py-4 flex items-center justify-between gap-4 flex-wrap">
          
          {/* Categories Navigation */}
          <div className="flex items-center gap-4 sm:gap-7 md:gap-9 lg:gap-11 overflow-x-auto no-scrollbar py-0.5">
            {navItems.map((item, index) => (
              <motion.button
                key={item.target}
                initial={{ opacity: 0, y: 10 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.35, delay: 0.5 + index * 0.06 }}
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
            initial={{ opacity: 0, x: 16 }}
            animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            onClick={() => scrollTo('manifesto')}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer group py-1 shrink-0"
          >
            <span className="group-hover:text-[#E32124] transition-colors">ЛИСТАЙТЕ</span>
            <motion.div
              animate={{ y: [0, 3, 0] }}
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
