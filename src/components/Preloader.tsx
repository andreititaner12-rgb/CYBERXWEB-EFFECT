import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { LockKeyholeOpen, Lock, CornerDownLeft, ChevronRight, Fingerprint } from 'lucide-react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasEnteredRef = useRef(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent || '') || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEnter = useCallback(() => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;

    // Direct user interaction unlocks Web Audio & HTML5 Audio in all browsers
    sound.setEnabled(true);
    sound.init();
    sound.playClick();

    // Start voice intro on user interaction
    sound.playVoiceGreeting().catch(() => {});

    setIsFinished(true);
    setTimeout(onComplete, 400);
  }, [onComplete]);

  // Handle Keyboard 'ENTER' to wake up from standby (Cyber-club PC lock screen experience)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter]);

  // Progress telemetry animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReadyToEnter(true);
          return 100;
        }

        const step = Math.floor(Math.random() * 14) + 12;
        const next = Math.min(prev + step, 100);

        if (next >= 100) {
          setIsReadyToEnter(true);
        }
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleEnter}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020205] text-white select-none overflow-hidden cursor-pointer"
        >
          {/* Background Ambient Red Glow (Seamless Radial Gradient) */}
          <div 
            className="pointer-events-none absolute w-[700px] h-[700px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(227, 33, 36, 0.22) 0%, rgba(227, 33, 36, 0.05) 45%, transparent 70%)',
            }}
          />

          {/* Centerpiece Content */}
          <div className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md w-full px-6 text-center space-y-6">
            
            {/* CyberX Logo with neon pulse */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center"
            >
              <img
                src="/logo-omsk.png"
                alt="CyberX Omsk"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_35px_rgba(227,33,36,0.8)]"
              />
            </motion.div>

            {/* Brand Title */}
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase text-white">
                CYBERX<span className="text-[#E32124]">.</span>OMSK
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 mt-1">
                ARENA ECOSYSTEM // LAN CLIENT
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2.5 font-mono">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] animate-ping" />
                  <span>{progress < 100 ? 'ИНИЦИАЛИЗАЦИЯ КЛИЕНТА...' : 'СЕССИЯ ГОТОВА К ЗАПУСКУ'}</span>
                </span>
                <span className="text-[#E32124] font-bold">{progress}%</span>
              </div>

              <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden p-[1px] border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B0000] via-[#E32124] to-[#FF4D4D] rounded-full shadow-[0_0_15px_#E32124]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Center Action Button: Lock Icon + ENTER Key for PC / Touch for Mobile */}
            <div className="pt-2 w-full">
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnter();
                }}
                className={`w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_35px_rgba(227,33,36,0.85)] hover:scale-105 active:scale-95 transition-all flex items-center justify-between border border-white/30 cursor-pointer ${
                  isReadyToEnter ? 'animate-pulse' : ''
                }`}
              >
                {/* Left: Lock Keyhole Icon */}
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-black/30 border border-white/20">
                    {isReadyToEnter ? (
                      <LockKeyholeOpen className="w-4 h-4 text-white" />
                    ) : (
                      <Lock className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  {/* Center Text */}
                  <span className="font-extrabold text-[11px] sm:text-xs tracking-[0.14em]">
                    {isMobile ? 'НАЖМИТЕ НА ЭКРАН ДЛЯ СТАРТА' : 'НАЖМИТЕ ENTER ДЛЯ ВХОДА'}
                  </span>
                </div>

                {/* Right: Mechanical Key Badge for PC or Touch for Mobile */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {isMobile ? (
                    <Fingerprint className="w-4 h-4 text-white/90" />
                  ) : (
                    <span className="px-2 py-0.5 rounded-lg bg-black/60 border border-white/30 text-[10px] font-black text-white flex items-center gap-1 shadow-inner">
                      <span>ENTER</span>
                      <CornerDownLeft className="w-3 h-3 text-[#FFD700]" />
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                </div>
              </motion.button>

              {/* Subtitle Hint */}
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-2.5 flex items-center justify-center gap-1">
                <span>{isMobile ? 'ИЛИ КОСНИТЕСЬ В ЛЮБОМ МЕСТЕ' : 'ИЛИ КЛИКНИТЕ МЫШЬЮ В ЛЮБОМ МЕСТЕ'}</span>
              </div>
            </div>

            {/* Telemetry info */}
            <div className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
              OMSK // 3 ARENAS // LENINA • MIRA • SEROVA
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
