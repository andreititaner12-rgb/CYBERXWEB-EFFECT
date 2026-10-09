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
  Headphones,
  PhoneCall,
  MapPin
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
    answer: 'Да! В сети CyberX Омск на всех ПК уже предустановлены десятки популярных соревновательных и одиночных игр (CS2, Dota 2, Valorant, Apex Legends, GTA V, PUBG, Rust, Warzone, FC 25, Fortnite, Cyberpunk 2077 и др.). Если нужной игры нет, благодаря прямому оптическому каналу со скоростью >1 Гбит/с вы можете скачать любую игру из личной библиотеки.',
  },
  {
    id: 'age',
    icon: ShieldAlert,
    category: 'Правила',
    question: 'Со скольки лет можно посещать клубы (ночной пакет и ограничения)?',
    answer: 'Дневное время (с 08:00 до 22:00): для гостей до 12 лет рекомендуется посещение в сопровождении взрослых или с согласия родителей. Ночной пакет (с 22:00 до 08:00): согласно законодательству РФ лицам младше 18 лет находиться в клубе в ночное время строго запрещено. Для оформления ночного пакета обязательно иметь при себе оригинал паспорта.',
  },
  {
    id: 'booking',
    icon: Clock,
    category: 'Бронь',
    question: 'Как забронировать место и можно ли продлить сессию на месте?',
    answer: 'Бронирование игровых ПК и PlayStation 5 осуществляется в мобильном приложении CyberX Community (Langame). По телефону бронирование доступно только для Premium комнат в CyberX Arena на ул. Ленина, 19. Продлить игровое время можно в любой момент через личный кабинет на ПК или обратившись к администратору за стойкой.',
  },
  {
    id: 'food',
    icon: Coffee,
    category: 'Бар & Еда',
    question: 'Есть ли в клубах бар с едой и напитками, и можно ли приходить со своим?',
    answer: 'В каждом клубе CyberX работает бар с широким ассортиментом холодных напитков, энергетиков, кофе и разнообразных снеков. Проносить свою еду и напитки в общие игровые залы строго запрещено правилами клуба. Исключение: в изолированной комнате PREMIUM на ул. Ленина, 19 при бронировании разрешается приносить свои угощения или заказывать доставку еды.',
  },
  {
    id: 'support',
    icon: Headphones,
    category: 'Сервис',
    question: 'Что делать, если возникли проблемы с игрой, звуком или настройками?',
    answer: 'Рядом с каждым игровым ПК установлена физическая кнопка вызова администратора. Достаточно нажать её — и дежурный администратор мгновенно подойдёт к вашему месту, чтобы настроить сенсу, герцовку монитора, звук в гарнитуре, запустить игру или решить любой технический вопрос. Также вызвать персонал можно через лаунчер на рабочем столе ПК или обратившись к стойке ресепшн.',
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

        {/* FAQ Accordion List */}
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

        {/* Support Help Banner with 3 Club Contact Phones for Questions */}
        <div className="mt-8 p-5 sm:p-7 rounded-3xl bg-[#09080e] border border-white/10 relative overflow-hidden font-mono shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-display font-black text-white uppercase tracking-wide">
                  Остались вопросы?
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Прямые телефоны администраторов для вопросов и консультаций (без бронирования)
                </p>
              </div>
            </div>

            <div className="text-[11px] text-zinc-500 font-mono italic">
              * Забронировать можно только Premium комнату по звонку на Ленина, 19
            </div>
          </div>

          {/* 3 Club Numbers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5">
            
            {/* Club 1: Arena Lenina */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E32124]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
                <span>CyberX Arena (Ленина)</span>
              </div>
              <div className="text-[10px] text-zinc-400 mb-2 truncate">ул. Ленина, 19</div>
              <a
                href="tel:+79081109777"
                onClick={() => sound.playClick()}
                className="text-xs sm:text-sm font-bold text-[#E32124] hover:text-white transition-colors block"
              >
                +7 (908) 110-97-77
              </a>
            </div>

            {/* Club 2: Evropa Mira */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E32124]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
                <span>CyberX Европа (Мира)</span>
              </div>
              <div className="text-[10px] text-zinc-400 mb-2 truncate">просп. Мира, 42к1</div>
              <a
                href="tel:+79514007777"
                onClick={() => sound.playClick()}
                className="text-xs sm:text-sm font-bold text-[#E32124] hover:text-white transition-colors block"
              >
                +7 (951) 400-77-77
              </a>
            </div>

            {/* Club 3: Oktyabr Serova */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E32124]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
                <span>CyberX Октябрь (Серова)</span>
              </div>
              <div className="text-[10px] text-zinc-400 mb-2 truncate">ул. Серова, 19А</div>
              <a
                href="tel:+79509503333"
                onClick={() => sound.playClick()}
                className="text-xs sm:text-sm font-bold text-[#E32124] hover:text-white transition-colors block"
              >
                +7 (950) 950-33-33
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
