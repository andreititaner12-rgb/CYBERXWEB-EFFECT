import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  MousePointer2, 
  Download, 
  ShieldAlert, 
  Clock, 
  Coffee, 
  Coins, 
  Headphones,
  PhoneCall
} from 'lucide-react';
import { sound } from '../utils/sound';

interface FaqItem {
  id: string;
  icon: React.ElementType;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'peripherals',
    icon: MousePointer2,
    category: 'Девайсы',
    question: 'Можно ли приходить со своей периферией (мышь, клавиатура, наушники, коврик)?',
    answer: 'Да, конечно! Вы можете подключить любые свои девайсы к игровым ПК: мышь, клавиатуру, наушники, геймпад или коврик. Все столы оснащены удобными удлинителями и свободными портами USB 3.2. Администраторы помогут быстро настроить фирменный софт (Logitech G HUB, Razer Synapse, SteelSeries GG, Wooting Hub и др.) без потери вашего игрового времени.',
  },
  {
    id: 'games',
    icon: Download,
    category: 'Игры',
    question: 'Можно ли установить свою игру или войти в личный Steam / Epic / Riot Client?',
    answer: 'Да! В сети CyberX Омск на всех ПК уже предустановлены десятки популярных соревновательных и одиночных игр (CS2, Dota 2, Valorant, Apex Legends, GTA V, PUBG, Rust, Warzone, FC 25, Fortnite, Cyberpunk 2077 и др.). Если нужной игры нет, благодаря оптическому каналу со скоростью >1 Гбит/с вы можете скачать любую игру из личной библиотеки за несколько минут.',
  },
  {
    id: 'age',
    icon: ShieldAlert,
    category: 'Правила',
    question: 'Со скольки лет можно посещать клубы (ночной пакет и ограничения)?',
    answer: 'Дневное время (с 08:00 до 22:00): вход свободный для гостей любого возраста (для посетителей младше 14 лет рекомендуем согласие родителей). Ночной пакет (с 22:00 до 08:00): согласно законодательству РФ лицам младше 18 лет находиться в клубе в ночное время запрещено. Для оформления ночного пакета обязательно иметь при себе оригинал паспорта (или цифровой паспорт в Госуслугах).',
  },
  {
    id: 'booking',
    icon: Clock,
    category: 'Бронь',
    question: 'Как забронировать место и можно ли продлить сессию на месте?',
    answer: 'Забронировать желаемый ПК, приватный VIP зал или PlayStation 5 можно онлайн прямо на этом сайте через кнопку «Забронировать» (или в мобильном приложении CyberX/Langame по QR-коду), а также по телефону клуба. Продлить игровое время можно в любой момент через личный кабинет на ПК или обратившись к администратору за стойкой.',
  },
  {
    id: 'food',
    icon: Coffee,
    category: 'Бар & Еда',
    question: 'Есть ли в клубах бар с едой и напитками, и можно ли приходить со своим?',
    answer: 'В каждом из 3 клубов работает обширный снек-бар: энергетики (Red Bull, Monster, Tornado, Adrenaline), кофе, лимонады, горячие сэндвичи, пицца, чипсы и сладости. В приватных залах (Premium Squad Suite, Solo Rooms и Кино-Лаунж) при бронировании разрешается приносить свою еду (пиццу, суши, торт) или заказывать доставку.',
  },
  {
    id: 'cashback',
    icon: Coins,
    category: 'Бонусы',
    question: 'Как начисляется кэшбек и действуют ли акции для студентов и школьников?',
    answer: 'В сети CyberX действует единая накопительная система лояльности: до 15% кэшбека на ваш баланс с каждого пополнения. Для студентов и школьников в будние дни действуют специальные дневные пакеты со скидкой до 20% при предъявлении студенческого билета. Подробности во вкладке «Акции».',
  },
  {
    id: 'support',
    icon: Headphones,
    category: 'Сервис',
    question: 'Что делать, если возникли проблемы с игрой, звуком или настройками?',
    answer: 'В каждом зале дежурят квалифицированные администраторы и техспециалисты. Вы можете нажать кнопку вызова администратора в лаунчере ПК или подойти к стойке ресепшн: вам мгновенно помогут настроить сенсу, герцовку монитора (вплоть до 600Hz), звук в наушниках или решить технический вопрос.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('peripherals');

  const toggleItem = (id: string) => {
    sound.playClick();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 scroll-mt-24 relative z-10 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-sm shadow-red-950/40">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ОТВЕТЫ НА ПОПУЛЯРНЫЕ ВОПРОСЫ</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white leading-tight">
            ЧАСТЫЕ ВОПРОСЫ <span className="text-[#E32124]">//</span> FAQ
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed">
            Всё, что важно знать перед визитом в киберарены CyberX в Омске: правила, девайсы, возрастные ограничения и бронирование.
          </p>
        </div>

        {/* FAQ Accordion List (Stable CSS without Blink) */}
        <div className="space-y-3 font-mono">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-gradient-to-b from-[#141018] to-[#0a080e] border-[#E32124]/40 shadow-[0_0_25px_rgba(227,33,36,0.15)]'
                    : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.07] hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen 
                        ? 'bg-[#E32124] text-white shadow-[0_0_15px_#E32124]' 
                        : 'bg-white/[0.04] border border-white/10 text-[#E32124]'
                    }`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
                        {item.category} //
                      </span>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-white mt-0.5 leading-snug">
                        {item.question}
                      </h4>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-lg transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#E32124] bg-[#E32124]/10' : 'text-zinc-500 bg-white/[0.03]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 sm:pl-[72px] sm:pr-6 text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed border-t border-white/[0.05] mt-1">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase">Остались вопросы?</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Администраторы на связи круглосуточно во всех 3 клубах</div>
            </div>
          </div>

          <a
            href="tel:+79081109777"
            className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-[#E32124] text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/10 hover:border-transparent whitespace-nowrap cursor-pointer shadow-md"
          >
            Позвонить: +7 (908) 110-97-77
          </a>
        </div>

      </div>
    </section>
  );
};
