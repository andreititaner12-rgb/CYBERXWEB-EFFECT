import React from 'react';
import { motion } from 'framer-motion';
import { 
  MousePointer2, 
  Keyboard, 
  Headphones, 
  Gamepad2, 
  Flame, 
  Gauge, 
  Check, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface RentalItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  specs: string[];
  badge: string;
  description: string;
  highlight?: string;
}

const RENTAL_GEAR: RentalItem[] = [
  {
    id: 'mouse-superlight',
    name: 'Logitech G Pro X Superlight 2',
    category: 'Беспроводная мышь 4KHz',
    icon: MousePointer2,
    badge: '4000Hz Polling',
    description: 'Легендарный эталон киберспорта. Ультралегкий вес 60 г, сенсор Hero 2 (32000 DPI) и гибридные оптико-механические свитчи Lightforce.',
    specs: ['Вес 60г • Hero 2 32K DPI', 'Отклик 0.25 мс (4000 Гц)', 'Тефлоновые глайды PTFE'],
    highlight: 'Топ для CS2 & Valorant'
  },
  {
    id: 'kb-wooting',
    name: 'Wooting 60HE+ / DrunkDeer A75',
    category: 'Rapid Trigger Клавиатура',
    icon: Keyboard,
    badge: 'Hall Effect Rapid Trigger',
    description: 'Магнитные аналоговые свитчи Hall Effect. Точка сброса срабатывает мгновенно при малейшем движении пальца — лучший контр-стрейф в мире.',
    specs: ['Настройка точки 0.1 - 4.0 мм', 'Rapid Trigger 0.1 мм', 'PBT кейкапы + шумоизоляция'],
    highlight: 'Мгновенный Stop-Motion'
  },
  {
    id: 'headset-cloud',
    name: 'HyperX Cloud III & SteelSeries Nova',
    category: 'Hi-Res Кибер-Гарнитура',
    icon: Headphones,
    badge: 'Spatial Audio 7.1',
    description: 'Точнейшее 3D-позиционирование шагов и выстрелов в пространстве, микрофон с шумоподавлением и мягкие амбушюры с эффектом памяти.',
    specs: ['53 мм динамики с углом наклона', 'Шумоподавление ENC', 'DTS Headphone:X Spatial'],
    highlight: 'Чёткие шаги в смоках'
  },
  {
    id: 'gamepad-elite',
    name: 'DualSense Edge & Xbox Elite 2',
    category: 'Pro Контроллер с лепестками',
    icon: Gamepad2,
    badge: '4 задних лепестка',
    description: 'Профессиональные геймпады с регулировкой хода триггеров, сменными металлическими стиками и кастомными профилями чувствительности.',
    specs: ['Задние настраиваемые лепестки', 'Регулируемый стопор курков', 'Антискользящий грип'],
    highlight: 'Идеально для FC 25 & MK1'
  },
  {
    id: 'sleeve-aim',
    name: 'Pro Compression Arm Sleeves',
    category: 'Геймерский рукав для аима',
    icon: Flame,
    badge: 'Zero Friction',
    description: 'Профессиональные компрессионные рукава для идеального гладкого скольжения предплечья по поверхности коврика без прилипания.',
    specs: ['Специальная гладкая ткань', 'Компрессионная поддержка руки', 'Универсальный размер'],
    highlight: 'Плавный Micro-Aiming'
  },
  {
    id: 'sim-gear',
    name: 'Moza Sim-Racing Pro Gloves',
    category: 'Sim-Racing экипировка',
    icon: Gauge,
    badge: 'Direct Drive Pro',
    description: 'Дышащие перчатки с силиконовыми вставками для плотного хвата руля Moza R9 Direct Drive и максимального сцепления на виражах.',
    specs: ['Антискользящий хват руля', 'Вентиляция ладоней', 'Защита от усталости кистей'],
    highlight: 'Эксклюзив автосимов'
  },
];

export const RentalGearSection: React.FC = () => {
  return (
    <div id="rental-gear" className="mt-12 sm:mt-16 pt-10 border-t border-white/[0.08] relative z-10 select-none">
      
      {/* Gold Shimmer Header Badge: ЭКСКЛЮЗИВ НА ЛЕНИНА */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-gold-shimmer text-xs font-mono font-black uppercase tracking-wider mb-2.5 shadow-lg">
            <Award className="w-3.5 h-3.5" />
            <span>ЭКСКЛЮЗИВ ФЛАГМАНА // ЛЕНИНА, 19</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
            АРЕНДНОЕ <span className="text-[#E32124]">ОБОРУДОВАНИЕ</span> & PRO GEAR
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-1.5 leading-relaxed font-normal">
            Хотите протестировать топовую киберспортивную мышь, клавиатуру с Rapid Trigger или контроллер перед покупкой? Возьмите девайс на сессию у администратора флагмана CyberX Arena.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs text-zinc-300 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Выдача на ресепшн Ленина 19</span>
        </div>
      </div>

      {/* Grid of 6 Pro Gear Rental Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {RENTAL_GEAR.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#131018] to-[#0a080d] border border-white/[0.08] hover:border-[#E32124]/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(227,33,36,0.15)] flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#E32124]/50 transition-all duration-300" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#E32124]/10 border border-[#E32124]/30 flex items-center justify-center text-[#E32124] group-hover:bg-[#E32124] group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                {/* Name & Category */}
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  {item.category}
                </div>
                <h4 className="font-sans font-black text-lg text-white group-hover:text-[#E32124] transition-colors mt-0.5 leading-snug">
                  {item.name}
                </h4>

                <p className="text-xs text-zinc-400 mt-2 font-normal leading-relaxed">
                  {item.description}
                </p>

                {/* Specs List */}
                <div className="mt-4 pt-3 border-t border-white/[0.05] space-y-1.5 font-mono text-[11px] text-zinc-300">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500">{item.highlight}</span>
                <span className="text-[#E32124] font-bold group-hover:translate-x-1 transition-transform">
                  На Ленина, 19 →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
