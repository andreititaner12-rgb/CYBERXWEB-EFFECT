import React, { useState, useEffect } from 'react';
import { UPCOMING_TOURNAMENT } from '../data/arenaData';
import { Tournament } from '../types';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Flame, 
  Layers,
  Trophy,
  Award,
  Send,
  Radio
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion } from 'framer-motion';

interface TournamentCardProps {
  onOpenRegister: (tournamentId: string) => void;
  onOpenAllTournaments: () => void;
  tournamentData?: Tournament;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  onOpenRegister,
  onOpenAllTournaments,
  tournamentData,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 24,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    // Target date: 25 Октября 2026, 12:00 (Омск GMT+6)
    const targetDate = new Date('2026-10-25T12:00:00+06:00').getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const tournament = tournamentData || UPCOMING_TOURNAMENT;
  const isTournamentActive = Boolean(tournament && tournament.registrationOpen);

  return (
    <section id="tournaments" className="relative py-8 sm:py-12 bg-transparent overflow-hidden scroll-mt-24 select-none">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Unified Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5 animate-pulse" />
            <span>КИБЕРСПОРТИВНАЯ LAN СЦЕНА // ТУРНИРЫ В ОМСКЕ</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase text-white">
            ТУРНИРЫ <span className="text-[#E32124] drop-shadow-[0_0_20px_rgba(227,33,36,0.6)]">В ОМСКЕ</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Собирай команду, регистрируйся и сражайся за чемпионский кубок и реальный призовой фонд на соревновательной сцене CyberX.
          </p>
        </div>

        {/* 2. Main Tournament Banner (Active vs Season Preparation Fallback) */}
        {isTournamentActive ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0c0c14] via-[#08080e] to-[#040408] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl"
          >
            {/* Top subtle glow line */}
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />
            
            {/* Watermark Logo */}
            <div className="pointer-events-none absolute -right-12 -bottom-12 opacity-5 select-none font-display font-black text-[220px] text-white">
              CS2
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Info Column */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex flex-wrap items-center gap-2.5 font-mono">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#E32124] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/30">
                    <Flame className="w-3.5 h-3.5" />
                    ГЛАВНЫЙ LAN СЕЗОНА
                  </span>
                  {tournament.gameTag && (
                    <span className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-zinc-300">
                      {tournament.gameTag}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
                    {tournament.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-xl font-light">
                    {tournament.description}
                  </p>
                </div>

                {/* Tournament Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] uppercase text-zinc-500 block flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#E32124]" /> Дата и Время
                    </span>
                    <div className="text-xs font-bold text-white mt-1">
                      {tournament.date}
                    </div>
                    <div className="text-[10px] text-zinc-400">{tournament.time}</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] uppercase text-zinc-500 block flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E32124]" /> Локация
                    </span>
                    <div className="text-xs font-bold text-white mt-1 truncate">
                      CYBERX ARENA
                    </div>
                    <div className="text-[10px] text-zinc-400">ул. Ленина, 19</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase text-zinc-500 block flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#E32124]" /> Формат
                    </span>
                    <div className="text-xs font-bold text-white mt-1">
                      Double Elim 5x5
                    </div>
                    <div className="text-[10px] text-zinc-400">LAN Сервер 600Hz</div>
                  </div>
                </div>

                {/* Registered Teams Status Card */}
                <div className="p-4 rounded-2xl bg-[#08080d] border border-white/[0.06] flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-xs text-zinc-300">
                      Зарегистрировано команд: <strong className="text-white font-extrabold text-sm ml-1">{tournament.slotsRegistered}</strong>
                    </span>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30 shrink-0">
                    Регистрация открыта
                  </span>
                </div>

              </div>

              {/* Right Prize & Countdown Column */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0a0a10]/90 border border-white/[0.08] relative font-mono">
                
                <div className="text-center pb-6 border-b border-white/[0.08]">
                  <span className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">
                    ПРИЗОВОЙ ФОНД ТУРНИРА
                  </span>
                  <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight drop-shadow-[0_0_25px_rgba(227,33,36,0.6)]">
                    {tournament.prizePool}
                  </div>
                  <div className="text-xs text-[#E32124] mt-1 flex items-center justify-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>+ Кубок CyberX Omsk и часы в Premium</span>
                  </div>
                </div>

                {/* Countdown */}
                <div className="py-6">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 block text-center mb-3">
                    До старта турнира осталось:
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                        {timeLeft.days}
                      </div>
                      <div className="text-[9px] uppercase text-zinc-500">Дней</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                        {timeLeft.hours}
                      </div>
                      <div className="text-[9px] uppercase text-zinc-500">Часов</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-[9px] uppercase text-zinc-500">Мин</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="font-display font-extrabold text-xl sm:text-2xl text-[#E32124]">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-[9px] uppercase text-zinc-500">Сек</div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      sound.playTrigger();
                      onOpenRegister(tournament.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full py-3.5 px-6 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.2em] text-white bg-[#E32124] hover:bg-[#FF2A2E] shadow-lg shadow-red-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Зарегистрировать команду</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenAllTournaments();
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full py-2.5 px-4 rounded-xl font-mono text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Все турниры сезона (Dota 2, Valorant, FC 25) →</span>
                  </button>
                </div>

              </div>

            </div>

          </motion.div>
        ) : (
          /* Fallback State when no upcoming tournament is currently active */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0c0c14] via-[#08080e] to-[#040408] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />
            
            <div className="pointer-events-none absolute -right-12 -bottom-12 opacity-5 select-none font-display font-black text-[220px] text-white">
              CYBERX
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10 font-mono">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-bold uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                СКОРО АНОНС НОВОГО СЕЗОНА
              </div>

              <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
                СЕЗОННЫЕ ТУРНИРЫ CYBERX ОМСК
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto font-light leading-relaxed">
                В данный момент судейская коллегия формирует сетку и регламент следующего турнира. Следите за новостями и анонсами LAN-чемпионатов по CS2, Dota 2, Valorant и FC 25 в нашем Telegram!
              </p>

              {/* Specs Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] text-zinc-500 uppercase">Дисциплины</div>
                  <div className="text-xs font-bold text-white mt-0.5">CS2 • Dota 2 • FC 25</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] text-zinc-500 uppercase">Локация</div>
                  <div className="text-xs font-bold text-white mt-0.5">CyberX Arena // Ленина, 19</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] text-zinc-500 uppercase">Призы</div>
                  <div className="text-xs font-bold text-[#E32124] mt-0.5">Кубки, призовые и мерч</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenAllTournaments();
                  }}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Сезонные турниры</span>
                </button>

                <a
                  href="https://t.me/cyberxcommunityomsklenina"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-[#E32124] hover:bg-[#FF2A2E] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(227,33,36,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Следить за новостями в Telegram</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
