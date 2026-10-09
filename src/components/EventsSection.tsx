import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Cake, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2,
  Phone,
  Clock,
  Send,
  X
} from 'lucide-react';
import { sound } from '../utils/sound';

interface EventsSectionProps {
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
  onOpenTournaments: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onOpenBooking,
}) => {
  const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
  const [managerModalOpen, setManagerModalOpen] = useState(false);

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
            Проводим киберспортивные турниры любого масштаба, корпоративные чемпионаты, дни рождения в приватных залах и командные буткемпы в Омске.
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
                Организуем корпоративные чемпионаты, межвузовские лиги и турниры по CS2, Dota 2, Valorant, FC 25 и автосимам.
              </p>

              {/* Feature List */}
              <div className="mt-6 space-y-2.5 font-mono text-xs">
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                  <span><strong>Вместимость до 89 ПК</strong> на Ленина, 19 или объединение 3 клубов (185 ПК)</span>
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
                  setManagerModalOpen(true);
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

          {/* Card 2: ДНИ РОЖДЕНИЯ В PREMIUM */}
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
                Закрытые Premium комнаты для вашей компании: 5 соревновательных ПК + PS5 4K + стол для праздничного угощения, пиццы и торта.
              </p>

              {/* Feature List */}
              <div className="mt-6 space-y-2.5 font-mono text-xs">
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Своя еда & напитки:</strong> разрешено приносить пиццу, торт и заказывать кейтеринг</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Приватность 100%:</strong> отдельная комната с климат-контролем и шумоизоляцией 55dB</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Приватная Premium комната:</strong> 5 мощных ПК + зона PS5 + стол для компании и торта</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Мини-турниры для друзей:</strong> поможем настроить кастомные матчи, сетку и лобби</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  sound.playTrigger();
                  setBirthdayModalOpen(true);
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
            <div className="text-xl sm:text-2xl font-black text-white">185 ПК</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">В 3 клубах Омска</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-black text-[#E32124]">16 PS5</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Комнат в 3 клубах</div>
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

      {/* MODAL 1: ЗАКАЗАТЬ ТУРНИР ПОД КЛЮЧ (СВЯЗЬ С УПРАВЛЯЮЩИМ) */}
      <AnimatePresence>
        {managerModalOpen && (
          <div 
            onClick={() => setManagerModalOpen(false)}
            data-lenis-prevent="true"
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0e0c16] border border-[#E32124]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(227,33,36,0.35)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setManagerModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-[#E32124] text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-[#E32124]/20 border border-[#E32124]/40 text-[#E32124]">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E32124]">
                    ОРГАНИЗАЦИЯ ТУРНИРОВ ПОД КЛЮЧ
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    Связь с управляющим
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed mb-6">
                С управляющим обсуждаются все тонкости, индивидуальный регламент, выбор дисциплин, трансляция и особые условия проведения вашего мероприятия.
              </p>

              {/* Working Hours Notice */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 mb-6">
                <Clock className="w-4 h-4 text-[#E32124] shrink-0" />
                <span>Время для звонков: <strong>ежедневно с 08:00 до 22:00</strong></span>
              </div>

              {/* Phone Display Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-[#E32124]/40 text-center mb-6">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                  Прямой телефон управляющего
                </span>
                <a
                  href="tel:+79088003099"
                  className="font-display font-black text-2xl sm:text-3xl text-white hover:text-[#E32124] transition-colors tracking-tight block"
                >
                  +7 (908) 800-30-99
                </a>
              </div>

              {/* Direct Action Buttons */}
              <div className="space-y-3 font-mono">
                <a
                  href="tel:+79088003099"
                  onClick={() => sound.playClick()}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#E32124] hover:bg-[#FF2A2E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(227,33,36,0.6)] transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Позвонить управляющему</span>
                </a>

                <a
                  href="https://t.me/cyberxcommunityomsklenina"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Написать в Telegram</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: ЗАБРОНИРОВАТЬ ДЕНЬ РОЖДЕНИЯ (НОМЕР ЛЕНИНА) */}
      <AnimatePresence>
        {birthdayModalOpen && (
          <div 
            onClick={() => setBirthdayModalOpen(false)}
            data-lenis-prevent="true"
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#120f18] border border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.3)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setBirthdayModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <Cake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    CYBERX ARENA // УЛ. ЛЕНИНА, 19
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    День Рождения в Premium
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed mb-6">
                Для бронирования Premium комнаты на День Рождения свяжитесь с администратором CyberX Arena на Ленина, 19. Поможем подобрать удобное время и подготовить зал к вашему празднику!
              </p>

              {/* Phone Display Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-amber-500/40 text-center mb-6">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                  Прямой телефон клуба на Ленина (24/7)
                </span>
                <a
                  href="tel:+79081109777"
                  className="font-display font-black text-2xl sm:text-3xl text-amber-400 hover:text-amber-300 transition-colors tracking-tight block"
                >
                  +7 (908) 110-97-77
                </a>
              </div>

              {/* Direct Action Buttons */}
              <div className="space-y-3 font-mono">
                <a
                  href="tel:+79081109777"
                  onClick={() => sound.playClick()}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Позвонить на Ленина: +7 (908) 110-97-77</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://t.me/cyberxcommunityomsklenina"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="py-3 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/15 flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-400" />
                    <span>Telegram</span>
                  </a>

                  <button
                    onClick={() => {
                      setBirthdayModalOpen(false);
                      onOpenBooking('cyberx-arena', 'premium-squad');
                    }}
                    className="py-3 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/15 flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                  >
                    <span>Онлайн форма</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
