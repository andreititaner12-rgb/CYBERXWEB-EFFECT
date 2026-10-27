import React, { useState } from 'react';
import {
  MousePointer2,
  Keyboard,
  Check,
  ShieldCheck,
  Award,
  Box,
  X,
  Layers3,
} from 'lucide-react';
import { Mouse3DViewer } from './ui/Mouse3DViewer';
import { sound } from '../utils/sound';

type RentalKind = 'mouse' | 'keyboard';

interface RentalItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  badge: string;
  kind: RentalKind;
  description: string;
  specs: string[];
  highlight: string;
  /** GLB-модель для мышей */
  modelUrl?: string;
  /** Короткая подпись на бейдже 3D-вьюера */
  modelLabel?: string;
  /** Квадратное фото 1:1 для клавиатур */
  image?: string;
}

const RENTAL_MICE: RentalItem[] = [
  {
    id: 'logitech-pro-x2-superstrike',
    name: 'Logitech PRO X2 SUPERSTRIKE',
    category: 'Флагманская беспроводная мышь // HITS',
    icon: MousePointer2,
    badge: 'HITS • 8000 Гц',
    kind: 'mouse',
    description:
      'Первая мышь Logitech с индуктивной системой HITS: точка срабатывания и тактильная отдача клика настраиваются под себя. Сенсор HERO 2 и беспроводной опрос 8 кГц.',
    specs: [
      '61 г • HERO 2 • 44 000 DPI',
      '888 IPS / 88 G • отклик 0.125 мс',
      'До 90 ч • LIGHTSPEED + USB-C',
    ],
    highlight: 'Клик, который настраивается под вас',
    modelUrl: '/models/logitech-pro-x2-superstrike.glb',
    modelLabel: 'SUPERSTRIKE // 360°',
  },
  {
    id: 'logitech-superlight-2-dex-se',
    name: 'Logitech PRO X SUPERLIGHT 2 DEX SE',
    category: 'Эргономичная беспроводная мышь // SE',
    icon: MousePointer2,
    badge: 'HERO 2 • 88 ч',
    kind: 'mouse',
    description:
      'Асимметричный корпус DEX с высоким горбом под ладонь, вес 60 г и гибридные свитчи LIGHTFORCE. Версия SE работает на 1000 Гц из коробки и держит до 88 часов.',
    specs: [
      '60 г • HERO 2 • 44 000 DPI',
      '888 IPS / 88 G • LIGHTFORCE',
      'До 88 ч • 1 кГц (8 кГц с PRO-ресивером)',
    ],
    highlight: 'Эргономика для долгих каток',
    modelUrl: '/models/logitech-superlight-2-dex-se.glb',
    modelLabel: 'DEX SE // 360°',
  },
  {
    id: 'lunacy-honkai-star-rail',
    name: 'Lunacy x Honkai: Star Rail',
    category: 'Лимитированная мышь // Искра',
    icon: MousePointer2,
    badge: 'LUNACY × HSR',
    kind: 'mouse',
    description:
      'Официальная коллаборация Lunacy и Honkai: Star Rail. Мышь «Искра» на базе Lunacy One: красно-чёрный принт, Hot-Swap свитчи и коллекционный комплект аксессуаров.',
    specs: [
      '57 г • PixArt PAW3395 • 26 000 DPI',
      '650 IPS / 50 G • до 1000 Гц',
      '300 мА·ч • 2.4 ГГц + провод',
    ],
    highlight: 'Коллекционный принт Искры',
    // Принт кнопок переведён с TEXCOORD_4 на UV3: three.js поддерживает только uv0..uv3.
    modelUrl: '/models/lunacy-honkai-star-rail.glb',
    modelLabel: 'STAR RAIL // 360°',
  },
  {
    id: 'lunacy-one',
    name: 'Lunacy One',
    category: 'Беспроводная мышь // Hot-Swap',
    icon: MousePointer2,
    badge: 'PAW3395 • 57 г',
    kind: 'mouse',
    description:
      'Первая мышь Lunacy: лёгкий корпус 57 г, точный сенсор PixArt PAW3395 и Hot-Swap площадки под свитчи — характер клика можно менять без паяльника.',
    specs: [
      '57 г • PixArt PAW3395 • 26 000 DPI',
      '650 IPS / 50 G • до 1000 Гц',
      '40 ч при 1000 Гц • Hot-Swap свитчи',
    ],
    highlight: 'Меняйте клик под себя',
    modelUrl: '/models/lunacy-one.glb',
    modelLabel: 'LUNACY ONE // 360°',
  },
  {
    id: 'lunacy-another-one',
    name: 'Lunacy Another One',
    category: 'Флагманская мышь // 8K',
    icon: MousePointer2,
    badge: 'PAW3950 • 8000 Гц',
    kind: 'mouse',
    description:
      'Флагман Lunacy: сенсор PixArt PAW3950, опрос до 8 кГц и вес всего 51 г. Оптические свитчи Omron на 70 млн нажатий и аккумулятор на 100 часов игры.',
    specs: [
      '51 г • PixArt PAW3950 • 30 000 DPI',
      '750 IPS / 50 G • до 8000 Гц',
      '500 мА·ч • 2.4 ГГц + Bluetooth + USB-C',
    ],
    highlight: 'Максимальная точность 8K',
    modelUrl: '/models/lunacy-another-one.glb',
    modelLabel: 'ANOTHER ONE // 360°',
  },
];

const RENTAL_KEYBOARDS: RentalItem[] = [
  {
    id: 'kb-black-pearl',
    name: 'Lunacy Black Pearl',
    category: 'Механическая клавиатура // 75%',
    icon: Keyboard,
    badge: '75% • ДЕРЕВО + AL',
    kind: 'keyboard',
    description:
      'Лимитированная коллаборация Lunacy и Akko в пиратском стиле. Основание — цельный брусок ореха, верх — анодированный алюминий. Свитчи Akko Rosewood дают бархатный thock, а Spring Mount гасит лишний шум.',
    specs: [
      'Формат 75% • PBT MOA • Hot-Swap',
      'Akko Rosewood 40 г • 2.0 / 4.0 мм',
      'Bluetooth + 2.4 ГГц + USB-C • 4000 мА·ч',
    ],
    highlight: 'RGB, энкодер и 3 режима подключения',
    image: '/images/rental/keyboard-black-pearl.jpg',
  },
  {
    id: 'kb-honkai-star-rail',
    name: 'Lunacy x Honkai: Star Rail',
    category: 'Механическая клавиатура // TKL',
    icon: Keyboard,
    badge: 'LUNACY × HSR',
    kind: 'keyboard',
    description:
      'Коллаб-версия Moonlight «Искра»: чёрно-красный корпус, уникальные кейкапы с Искрой и более мягкие свитчи g3ms Aquamarine вместо базовых Onyx. В остальном — та же проверенная Moonlight.',
    specs: [
      'TKL • проводная • кабель 1.8 м',
      'g3ms Aquamarine • Hot-Swap • PBT Double Shot',
      'Spring Mount • 2 слоя шумоизоляции • RGB',
    ],
    highlight: 'Лимитка с доп. кейкапами и стендом',
    image: '/images/rental/keyboard-honkai-star-rail.jpg',
  },
  {
    id: 'kb-moonlight',
    name: 'Lunacy Moonlight',
    category: 'Механическая клавиатура // TKL',
    icon: Keyboard,
    badge: 'TKL • SPRING MOUNT',
    kind: 'keyboard',
    description:
      'Флагманская проводная механика Lunacy: тихие линейные g3ms Onyx с заводской смазкой, два слоя силиконовой шумоизоляции и PBT-кейкапы double shot профиля CSA.',
    specs: [
      'TKL • g3ms Onyx 50 г • Hot-Swap',
      '2.0 / 4.0 мм • смазанные PCB-стабы',
      'RGB • сменный роллер • USB-порт • 1.8 м',
    ],
    highlight: 'Тихий премиальный тайпинг',
    image: '/images/rental/keyboard-moonlight.jpg',
  },
];

interface RentalCardProps {
  item: RentalItem;
  is3DOpen: boolean;
  onToggle3D: () => void;
}

const RentalCard: React.FC<RentalCardProps> = ({ item, is3DOpen, onToggle3D }) => {
  const Icon = item.icon;

  return (
    <div
      className={`p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#131018] to-[#0a080d] border transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden ${
        is3DOpen
          ? 'border-[#E32124] ring-1 ring-[#E32124]/50 shadow-[0_0_30px_rgba(227,33,36,0.25)]'
          : 'border-white/[0.08] hover:border-[#E32124]/40 hover:shadow-[0_0_25px_rgba(227,33,36,0.15)]'
      }`}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#E32124]/50 transition-all duration-300" />

      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="w-10 h-10 shrink-0 rounded-2xl bg-[#E32124]/10 border border-[#E32124]/30 flex items-center justify-center text-[#E32124] group-hover:bg-[#E32124] group-hover:text-white transition-all shadow-sm">
            <Icon className="w-5 h-5" />
          </div>

          <span className="text-[10px] font-mono font-bold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 uppercase tracking-wider text-right">
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

        {/* Клавиатура: квадратное фото 1:1 во всю ячейку, без полей, рамок и лайтбокса */}
        {item.kind === 'keyboard' && item.image && (
          <div className="mt-3 w-full aspect-square overflow-hidden rounded-2xl bg-[#0a0a10]">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
        )}

        <p className="text-xs text-zinc-400 mt-2 font-normal leading-relaxed">
          {item.description}
        </p>

        {/* Мышь: 3D-модель со своей GLB */}
        {item.kind === 'mouse' && item.modelUrl && (
          <div className="mt-3">
            <button
              type="button"
              onClick={onToggle3D}
              onMouseEnter={() => sound.playHover()}
              className={`w-full py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                is3DOpen
                  ? 'bg-[#E32124] text-white border-[#E32124] shadow-md shadow-red-600/40'
                  : 'bg-white/[0.04] hover:bg-[#E32124]/20 text-zinc-300 hover:text-white border-white/10 hover:border-[#E32124]/50'
              }`}
            >
              {is3DOpen ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span>СВЕРНУТЬ 3D МОДЕЛЬ</span>
                </>
              ) : (
                <>
                  <Box className="w-3.5 h-3.5 text-[#E32124]" />
                  <span>3D МОДЕЛЬ // ВРАЩЕНИЕ 360°</span>
                </>
              )}
            </button>

            {/* Размонтировано при сворачивании — 0% GPU, когда вьюер не нужен */}
            {is3DOpen && (
              <div className="mt-3 animate-fadeIn">
                <Mouse3DViewer
                  key={item.id}
                  modelUrl={item.modelUrl}
                  label={item.modelLabel}
                />
              </div>
            )}
          </div>
        )}

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
      <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between gap-2 text-[11px] font-mono">
        <span className="text-zinc-500">{item.highlight}</span>
        <span className="text-[#E32124] font-bold group-hover:translate-x-1 transition-transform shrink-0">
          На Ленина, 19 →
        </span>
      </div>
    </div>
  );
};

export const RentalGearSection: React.FC = () => {
  // Одновременно открыт только один WebGL-вьюер: 5 контекстов на странице
  // роняют слабые GPU (см. AI_AGENT_CONTEXT, правила 29–34, 55).
  const [active3dId, setActive3dId] = useState<string | null>(null);

  const toggle3D = (id: string) => {
    sound.playClick();
    setActive3dId((current) => (current === id ? null : id));
  };

  return (
    <div
      id="rental-gear"
      className="mt-12 sm:mt-16 pt-10 border-t border-white/[0.08] relative z-10 select-none"
    >
      {/* Gold Shimmer Header Badge */}
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
            Пять игровых мышей с интерактивными 3D-моделями — покрутите каждую на 360° — и три клавиатуры Lunacy с описанием и характеристиками. Всё можно протестировать на ресепшне флагмана CyberX Arena.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs text-zinc-300 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Выдача на ресепшн Ленина 19</span>
        </div>
      </div>

      {/* ============ 01 // МЫШИ ============ */}
      <div className="flex items-center gap-3 mb-4">
        <Layers3 className="w-4 h-4 text-[#E32124]" />
        <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-widest text-white">
          01 // Игровые мыши
        </span>
        <span className="flex-1 h-px bg-white/[0.07]" />
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          5 моделей • 3D 360°
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {RENTAL_MICE.map((item) => (
          <RentalCard
            key={item.id}
            item={item}
            is3DOpen={active3dId === item.id}
            onToggle3D={() => toggle3D(item.id)}
          />
        ))}
      </div>

      {/* ============ 02 // КЛАВИАТУРЫ ============ */}
      <div className="flex items-center gap-3 mb-4 mt-10 sm:mt-12">
        <Keyboard className="w-4 h-4 text-[#E32124]" />
        <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-widest text-white">
          02 // Клавиатуры
        </span>
        <span className="flex-1 h-px bg-white/[0.07]" />
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          Фото 1:1 • Описание и ТТХ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {RENTAL_KEYBOARDS.map((item) => (
          <RentalCard
            key={item.id}
            item={item}
            is3DOpen={false}
            onToggle3D={() => undefined}
          />
        ))}
      </div>
    </div>
  );
};
