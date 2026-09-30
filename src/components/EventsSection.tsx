import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Cake, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/sound';

interface EventsSectionProps {
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
  onOpenTournaments: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onOpenBooking,
  onOpenTournaments
}) => {
  return (
    <section id="events" className="py-12 sm:py-16 scroll-mt-24 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-sm shadow-red-950/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EVENT-ПРОДАКШН & ПРИВАТНЫЕ ЗАЛЫ</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white leading-tight">
            МЕРОПРИЯТИЯ <span className="text-[#E32124]">//</span> ПОД КЛЮЧ
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Проводим киберспортивные турниры любого масштаба, корпоративные битвы, дни рождения в приватных залах и командные буткемпы в Омске.
          </p>
        </motion.div>

        {/* 2 Main Flagship Cards: Турниры под ключ & Дни рождения */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: ТУРНИРЫ ПОД КЛЮЧ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl border border-white/[0.1] hover:border-[#E32124]/50 bg-gradient-to-b from-[#14111a] to-[#09080e] shadow-2xl relative overflow-hidden flex flex-col justify-between group"
          >
            {/* Ambient Red Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E32124]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#E32124]/18 transition-all duration-500" />

            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#E32124]/15 border border-[#E32124]/40 flex items-center justify-center text-[#E32124] group-hover:scale-110 group-hover:bg-[#E32124] group-hover:text-white transition-all shadow-[0_0_20px_rgba(227,33,36,0.3)]">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#E32124] px-3 py-1 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 uppercase tracking-widest">
                  ДЛЯ КОМПАНИЙ & КОМАНД
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-white transition-colors">
                ТУРНИРЫ ПОД КЛЮЧ
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-normal leading-relaxed">
                Организуем корпоративные чемпионаты, межвузовские лиги и брендовые турниры по CS2, Dota 2, Valorant, FC 25 и автосимам.
              </p>

              {/* Feature List */}
              <div className="mt-6 space-y-2.5 font-mono text-xs">
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                  <span><strong>Вместимость до 86 ПК</strong> на Ленина 19 или объединение 3 клубов (182 ПК)</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                  <span><strong>Трансляция & Комментаторы:</strong> стрим на Twitch / VK Play с графикой и сценой</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                  <span><strong>Судейство & Турнирная сетка:</strong> ведение матчей, фиксация результатов и тайминга</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                  <span><strong>Призы & Брендинг:</strong> кубки, медали, сертификаты и интеграция спонсоров</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  sound.playTrigger();
                  onOpenTournaments();
                }}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(227,33,36,0.6)] hover:shadow-[0_0_40px_rgba(227,33,36,0.95)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <Trophy className="w-4 h-4" />
                <span>ЗАКАЗАТЬ ТУРНИР ПОД КЛЮЧ</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: ДНИ РОЖДЕНИЯ В PREMIUM SQUAD & КИНО-ЛАУНЖ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl border border-white/[0.1] hover:border-amber-500/50 bg-gradient-to-b from-[#161214] to-[#0a080c] shadow-2xl relative overflow-hidden flex flex-col justify-between group"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/18 transition-all duration-500" />

            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <Cake className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 uppercase tracking-widest">
                  ПРАЗДНИКИ & VIP-ПАТИ
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-white transition-colors">
                ДНИ РОЖДЕНИЯ В PREMIUM
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-normal leading-relaxed">
                Закрытые сьюты для вашей компании: 5 соревновательных ПК + PS5 4K + стол для праздничного угощения, пиццы и торта.
              </p>

              {/* Feature List */}
              <div className="mt-6 space-y-2.5 font-mono text-xs">
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Своя еда & напитки:</strong> разрешено приносить пиццу, торт и заказывать кейтеринг</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Приватность 100%:</strong> отдельная комната с климат-контролем и шумоизоляцией</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Кино-Лаунж 150" & PS5:</strong> матчи в FC 25, UFC, Mortal Kombat и просмотр фильмов</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Мини-турниры для друзей:</strong> поможем настроить кастомные матчи и призовой фонд</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  sound.playTrigger();
                  onOpenBooking('cyberx-arena', 'premium-suite');
                }}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.85)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
              >
                <Cake className="w-4 h-4" />
                <span>ЗАБРОНИРОВАТЬ ДЕНЬ РОЖДЕНИЯ</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* 3 Quick Stats Under Cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono text-center">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-black text-white">182 ПК</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">В 3 клубах Омска</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-black text-[#E32124]">150" Экран</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Кино-Лаунж сцена</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-black text-amber-400">2 Sim-Racing</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Автосимуляторы</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">24/7 Режим</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Без выходных</div>
          </div>
        </div>

      </div>
    </section>
  );
};
