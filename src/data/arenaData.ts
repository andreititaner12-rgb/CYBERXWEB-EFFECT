import { ArenaLocation, ZoneType, HardwareItem, Tournament, Promotion, SiteLinks, AllPricesData } from '../types';

export const ARENAS: ArenaLocation[] = [
  {
    id: 'cyberx-evropa',
    name: 'CYBERX ЕВРОПА // МИРА, 42К1',
    tagline: 'Киберспортивный хаб в Нефтяниках с Solo Room на Ryzen 7 7800X3D и BenQ 600Hz',
    address: 'просп. Мира, 42, корп. 1',
    metro: 'Ост. «Технический университет» / «Кристалл»',
    area: '480 м²',
    rigsCount: 46,
    vipRoomsCount: 0,
    ps5RoomsCount: 5,
    phone: '+7 (951) 400-77-77',
    telegram: '@cyberxcommunityomsklenina',
    workingHours: '24/7 Круглосуточно',
    rating: 5.0,
    reviewsCount: 1040,
    image: '/images/evropa/02-bar.jpg',
    gallery: [
      '/images/evropa/01-facade.jpg',
      '/images/evropa/02-bar.jpg',
      '/images/evropa/03-pc-hall.jpg',
      '/images/evropa/04-pc-closeup.jpg',
      '/images/evropa/05-mural-solo.jpg',
      '/images/evropa/06-desk.jpg',
      '/images/evropa/07-entrance.jpg',
      '/images/evropa/08-pc-room.jpg'
    ],
    features: [
      '46 игровых ПК (Super VIP, VIP, Duo Room и Solo Room)',
      'Solo Room на AMD Ryzen 7 7800X3D + BenQ 600Hz',
      'Мониторы BenQ 600Hz, ASUS 480Hz, ViewSonic 400Hz, BenQ 240Hz',
      '5 комфортных PS5 комнат на компании до 5 человек',
      'Кальян, бар, гигабитный интернет >1 Гбит/с'
    ],
    status: 'ONLINE',
    coordinates: { x: 55.028508, y: 73.287744 },
  },
  {
    id: 'cyberx-arena',
    name: 'CYBERX ARENA // ЛЕНИНА, 19',
    tagline: 'Главный киберспортивный комплекс Омска со сценой, Premium комнатами, Solo/Duo и автосимуляторами',
    address: 'ул. Ленина, 19',
    metro: 'Ост. «Драмтеатр» / «КДЦ Маяковский»',
    area: '540 м²',
    rigsCount: 89,
    vipRoomsCount: 2,
    ps5RoomsCount: 7,
    phone: '+7 (908) 110-97-77',
    telegram: '@cyberxcommunityomsklenina',
    workingHours: '24/7 Круглосуточно',
    rating: 5.0,
    reviewsCount: 1280,
    image: '/images/arena/02-bar.jpg',
    gallery: [
      '/images/arena/01-facade.jpg',
      '/images/arena/02-bar.jpg',
      '/images/arena/04-escalator.jpg',
      '/images/arena/05-stair-top.jpg',
      '/images/arena/06-pc-blue.jpg',
      '/images/arena/07-pink-dragon.jpg',
      '/images/arena/10-purple-girl.jpg',
      '/images/arena/11-nhl-console.jpg',
      '/images/arena/12-pink-girl-console.jpg',
      '/images/arena/15-bar-lounge.jpg'
    ],
    features: [
      '89 мощных игровых ПК (RTX 5070 Ti / i5-14600KF / BenQ 600Hz & 400Hz)',
      '2 эксклюзивных Premium комнаты (5 ПК + PS5 + Большой стол для компании)',
      'Приватные Solo и Duo комнаты с максимальной шумоизоляцией',
      '2 профессиональных автосимулятора Sim-Racing с рулевой базой Moza и педалями Moza Load Cell',
      'Большой лаунж-бар со сценой и проектором для трансляций и турниров',
      '7 приватных PS5 комнат с диванами, кальянами и баром'
    ],
    status: 'ONLINE',
    coordinates: { x: 54.984185, y: 73.375841 },
  },
  {
    id: 'cyberx-oktyabr',
    name: 'CYBERX ОКТЯБРЬ // СЕРОВА, 19А',
    tagline: 'Просторный двухэтажный клуб с уникальным зонированием и атмосферой',
    address: 'ул. Серова, 19А',
    metro: 'Ост. «Улица Серова» / «Ленинский рынок»',
    area: '430 м²',
    rigsCount: 50,
    vipRoomsCount: 0,
    ps5RoomsCount: 4,
    phone: '+7 (950) 950-33-33',
    telegram: '@cyberxcommunityomsklenina',
    workingHours: '24/7 Круглосуточно',
    rating: 5.0,
    reviewsCount: 890,
    image: '/images/oktyabr/06-stairs.jpg',
    gallery: [
      '/images/oktyabr/01-exterior.jpg',
      '/images/oktyabr/02-bar.jpg',
      '/images/oktyabr/03-pc-row.jpg',
      '/images/oktyabr/04-pc-column.jpg',
      '/images/oktyabr/05-pc-closeup.jpg',
      '/images/oktyabr/06-stairs.jpg',
      '/images/oktyabr/07-lounge.jpg',
      '/images/oktyabr/08-hall.jpg'
    ],
    features: [
      '50 игровых ПК: Общий зал, комнаты VIP (5 ПК), Trio, Duo и Solo',
      'Мониторы BenQ 240Hz Fast-TN во всех соревновательных зонах',
      '4 уютных комнаты с PS5',
      'Кальяны, бар, напитки и комфортная зона отдыха',
      'Фирменное двухэтажное игровое пространство'
    ],
    status: 'ONLINE',
    coordinates: { x: 54.940795, y: 73.382982 },
  },
];

export const ZONES: ZoneType[] = [
  {
    id: 'premium-squad',
    name: 'PREMIUM КОМНАТЫ',
    category: 'ЭКСКЛЮЗИВ В CYBERX ARENA',
    tagline: '5 Pro ПК (RTX 5070 Ti) + PS5 + Стол на 6 мест для вашей компании',
    description: 'Эксклюзив CyberX Arena на ул. Ленина, 19! Изолированная комната премиум-класса на 5–14 человек. 5 мощнейших ПК (i5-14600KF / RTX 5070 Ti), отдельная зона PlayStation 5 с 4K экраном и большой переговорно-обеденный стол на 6 мест для компании, пиццы и напитков.',
    capacity: 'до 14 человек (CyberX Arena // Ленина, 19)',
    hardwareBrief: [
      '5x PC: RTX 5070 Ti / i5-14600KF / 32GB DDR5',
      'Мониторы: Asus ROG Swift 2K 280Hz (32") и ROG Strix 2K 480Hz (27")',
      '1x Sony PlayStation 5 Slim + 2 геймпада DualSense (+ возможность взять дополнительные)',
      '4K 120Hz HDR экран',
      'Большой стол на 6 посадочных мест'
    ],
    features: [
      'Доступно только в CyberX Arena (2 комнаты)',
      'Звукоизоляция 55dB (полная приватность)',
      'Большой стол на 6 мест для компании и угощений',
      'Кальяны, напитки и закуски',
      'Кнопка вызова администратора в 1 клик'
    ],
    pricePerHour: 2000,
    priceNight: 7000,
    image: '/images/arena/03-pc-hall.jpg',
    gallery: [
      '/images/arena/03-pc-hall.jpg',
      '/images/arena/08-gamer-zone.jpg',
      '/images/arena/09-gamer-zone-tv.jpg',
      '/images/arena/13-blue-cyber-girl.jpg',
      '/images/arena/14-gamer-zone-blue.jpg'
    ],
    badge: '2 комнаты на Ленина',
    popular: true,
  },
  {
    id: 'sim-racing',
    name: 'SIM-RACING // 2 АВТОСИМУЛЯТОРА',
    category: 'ЭКСКЛЮЗИВ В CYBERX ARENA',
    tagline: '2 кокпита на базе руля Moza R12 и педалях Moza Load Cell',
    description: 'Эксклюзив CyberX Arena на Ленина, 19 с двумя профессиональными гоночными кокпитами на базе руля Moza R12 Direct Drive (12 Нм) и педальном узле Moza Load Cell. Доступные соревновательные дисциплины: FORZA HORIZON 6, ASSETTO CORSA, ASSETTO CORSA COMPETIZIONE, DiRT, BEAMNG.DRIVE, CITY CAR DRIVING.',
    capacity: '1–2 пилота (CyberX Arena // Ленина, 19)',
    hardwareBrief: [
      '2x Базы руля: Moza R12 Direct Drive Force Feedback (12 Нм)',
      'Педальные узлы Moza Load Cell (реалистичное усилие торможения)',
      'Спортивные анатомические ковши с точной регулировкой посадки',
      'UltraWide 165Hz дисплеи',
      'Секвентальный шифтер и подрулевые лепестки'
    ],
    features: [
      'Доступно только в CyberX Arena (2 симулятора)',
      'Парные дуэли в реальном времени',
      'Дисциплины: Forza Horizon 6, Assetto Corsa, ACC, DiRT, BeamNG, City Car Driving',
      'Реалистичная физика управления и обратная связь FFB'
    ],
    pricePerHour: 600,
    priceNight: 1350,
    image: '/images/sim-racing-real.jpg',
    badge: '2 автосима на Ленина',
  },
  {
    id: 'projector-lounge',
    name: 'LOUNGE BAR С ПРОЕКТОРОМ',
    category: 'ЭКСКЛЮЗИВ В CYBERX ARENA',
    tagline: 'Большой проекционный экран, сцена, пуфы, PS5 и трансляции',
    description: 'Просторный Lounge Bar в CyberX Arena со сценой и большим экраном. Просмотр киберспортивных чемпионатов, спортивных матчей и турниров по консольным файтингам и симуляторам. Игры: MK, FC, UFC, NHL.',
    capacity: 'до 20 человек (CyberX Arena // Ленина, 19)',
    hardwareBrief: [
      'Лазерный 4K проектор высокой яркости',
      'Большой экран со световозвращающим полотном',
      'PlayStation 5 + каталог топ игр (MK, FC, UFC, NHL)',
      'Концертный звук 5.1 Surround Sound'
    ],
    features: [
      'Доступно только в CyberX Arena на Ленина',
      'Мягкие пуфы и зона отдыха',
      'Прямые трансляции турниров и LAN-чемпионаты',
      'Кальяны и широкий ассортимент напитков и закусок'
    ],
    pricePerHour: 1000,
    priceNight: 5000,
    image: '/images/arena/15-bar-lounge.jpg',
    badge: 'Lounge Bar на Ленина',
  },
  {
    id: 'solo-stream-room',
    name: 'SOLO & DUO КОМНАТЫ',
    category: 'ВО ВСЕХ 3 КЛУБАХ (ЛЕНИНА, ЕВРОПА, ОКТЯБРЬ)',
    tagline: 'Приватные изолированные комнаты на топовом соревновательном железе',
    description: 'Приватные изолированные Solo и Duo залы во всех 3 кибераренах CyberX в Омске (Ленина, 19, Мира, 42к1, Серова, 19А). Ультимативные игровые процессоры AMD Ryzen 7 7800X3D и Intel Core i5-14600KF, видеокарты RTX 5070 Ti, сверхбыстрые мониторы 240Hz, 400Hz и 600Hz, премиальные девайсы и полная звукоизоляция.',
    capacity: '1–2 человека (Во всех 3 клубах сети)',
    hardwareBrief: [
      'PC: AMD Ryzen 7 7800X3D / i5-14600KF + RTX 5070 Ti',
      'Мониторы: BenQ 24.5" 600Hz / 400Hz / 240Hz Extreme Speed',
      'Мышь: Logitech G Pro X Superlight 2',
      'Премиальные соревновательные девайсы'
    ],
    features: [
      'Доступно во всех 3 кибераренах сети CyberX в Омске',
      'Абсолютная тишина, приватность и звукоизоляция (55dB)',
      'Максимальный соревновательный FPS (CS2: 750+ FPS)',
      'Идеально для дуо-праков, турнирных квалификаций и приватной игры'
    ],
    pricePerHour: 250,
    priceNight: 1100,
    image: '/images/evropa/05-mural-solo.jpg',
    badge: 'Во всех 3 клубах',
  },
  {
    id: 'ps5-lounge',
    name: '16 PS5 КОМНАТ',
    category: 'ВО ВСЕХ 3 КЛУБАХ',
    tagline: '16 приватных PS5 комнат с глубокими диванами, пуфами и 4K экранами',
    description: '16 комфортабельных приватных PS5 комнат во всех 3 кибераренах CyberX в Омске. Новейшие консоли PlayStation 5 Slim, по 2 геймпада DualSense в каждой комнате (с возможностью взять дополнительные), 4K телевизоры со звуком Harman Kardon. Игры всегда самые актуальные новинки — появляются у нас самыми первыми.',
    capacity: 'до 6 человек в каждой комнате',
    hardwareBrief: [
      '16x Консолей Sony PlayStation 5 Slim',
      '4K HDR телевизоры со звуком Harman Kardon',
      'По 2 геймпада DualSense (+ доп. по запросу)',
      'Глубокие комфортные диваны и мягкие пуфы',
      'Кальяны, холодные напитки и снеки'
    ],
    features: [
      'Игры всегда самые актуальные новинки (появляются первыми)',
      'Звук Harman Kardon в 4K телевизорах',
      'Кальяны и широкий ассортимент напитков и закусок',
      'Отдельное приватное зонирование с атмосферной подсветкой'
    ],
    pricePerHour: 300,
    priceNight: 900,
    image: '/images/arena/16-ps5-red-mural.jpg',
    gallery: [
      '/images/arena/16-ps5-red-mural.jpg',
      '/images/arena/11-nhl-console.jpg',
      '/images/arena/12-pink-girl-console.jpg'
    ],
    badge: '16 комнат в 3 клубах',
  },
  {
    id: 'super-vip',
    name: 'SUPER VIP',
    category: 'ТОП ФЛАГМАНСКАЯ ЗОНА',
    tagline: 'RTX 5070 Ti, Ryzen 7 7800X3D и мониторы 480Hz 2K / 400Hz',
    description: 'Флагманская зона повышенного комфорта для максимального соревновательного преимущества. Топовые процессоры AMD Ryzen 7 7800X3D и Intel Core i5-14600KF, мощные видеокарты RTX 5070 Ti, киберспортивные мониторы 480Hz 2K и 400Hz, эргономичные кресла CyberX и премиальная периферия.',
    capacity: 'CyberX Arena & CyberX Европа',
    hardwareBrief: [
      'PC: NVIDIA GeForce RTX 5070 Ti + Ryzen 7 7800X3D',
      'Мониторы: ASUS ROG Swift 480Hz 2K & ViewSonic 400Hz',
      'Мышь: Logitech G Pro X Superlight / Ajazz',
      'Кресла: CyberX Pro Gaming Chair'
    ],
    features: [
      'Флагманская соревновательная зона',
      'Мониторы 480Hz 2K и 400Hz с нулевой задержкой',
      'Кнопка вызова администратора в 1 клик',
      'Кальяны и широкий ассортимент напитков'
    ],
    pricePerHour: 270,
    priceNight: 1300,
    image: '/images/arena/06-pc-blue.jpg',
    badge: '480Hz 2K // Flagship',
  },
  {
    id: 'open-arena',
    name: 'STANDART & STANDART+',
    category: 'ВО ВСЕХ 3 КЛУБАХ',
    tagline: 'Масштабное игровое пространство с быстрым откликом и киберспортивным духом',
    description: 'Главный игровой зал CyberX с продуманной эргономикой и чистым соревновательным FPS. Включает 9 мощных сетапов Standart+ на видеокартах RTX 5070 Ti с мониторами BenQ 240Hz Fast-TN и 46 классических боевых машин Standart на RTX 3060/4060 со 144Hz экранами. Просторные столы с полноразмерными коврами и профессиональная вентиляция для долгих каток.',
    capacity: '55 игровых мест на Ленина, 19 (185 ПК в сети)',
    hardwareBrief: [
      'Standart+: RTX 5070 Ti + мониторы BenQ 240Hz Fast-TN (9 мест)',
      'Standart: RTX 3060 / 4060 + мониторы 144Hz (46 мест)',
      'Кресла: Фирменные эргономичные кресла CyberX с боковой поддержкой',
      'Периферия: Турнирная механика, игровые мыши и гарнитуры с 7.1 звуком'
    ],
    features: [
      'Градация залов: 9 ПК Standart+ и 46 ПК Standart',
      'Мониторы BenQ 240Hz Fast-TN и скоростные 144Hz матрицы',
      'Кнопка вызова администратора в 1 клик прямо с рабочего места',
      'Выделенный оптический гигабитный канал без просадок пинга'
    ],
    pricePerHour: 110,
    priceNight: 600,
    image: '/images/oktyabr/03-pc-row.jpg',
    gallery: [
      '/images/oktyabr/03-pc-row.jpg',
      '/images/oktyabr/04-pc-column.jpg',
      '/images/oktyabr/05-pc-closeup.jpg',
      '/images/arena/06-pc-blue.jpg',
      '/images/evropa/03-pc-hall.jpg'
    ],
    badge: '144Hz & 240Hz // Основной зал',
  }
];

export const DEFAULT_LINKS: SiteLinks = {
  telegramHandle: '@cyberxcommunityomsklenina',
  telegramUrl: 'https://t.me/cyberxcommunityomsklenina',
  vkUrl: 'https://vk.ru/omsklenina',
  googleFormUrl: 'https://forms.google.com',
  appStoreUrl: 'https://apps.apple.com/app/cyberx-community/id1528654867',
  phoneLenina: '+7 (908) 110-97-77',
  phoneEvropa: '+7 (951) 400-77-77',
  phoneOktyabr: '+7 (950) 950-33-33',
  addressLenina: 'ул. Ленина, 19',
  addressEvropa: 'просп. Мира, 42, корп. 1',
  addressOktyabr: 'ул. Серова, 19А',
};

export const DEFAULT_PRICES: AllPricesData = {
  'cyberx-arena': {
    pc: [
      {
        id: 'standard-arena',
        title: 'STANDARD',
        badge: 'БАЗОВЫЙ',
        iconType: 'Monitor',
        specs: 'RTX 3060, 4060 • 240Hz • Механика',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '110 ₽', weekend: '130 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '150 ₽', weekend: '170 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '380 ₽', weekend: '430 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '600 ₽', weekend: '700 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '600 ₽', weekend: '800 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'standard-plus-arena',
        title: 'STANDARD+',
        badge: 'ПОПУЛЯРНЫЙ',
        highlight: true,
        iconType: 'Zap',
        specs: 'RTX 5070 Ti • 240Hz • HyperX',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '130 ₽', weekend: '150 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '170 ₽', weekend: '190 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '430 ₽', weekend: '490 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '700 ₽', weekend: '800 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'vip-arena',
        title: 'VIP',
        badge: 'PRO КИБЕРСПОРТ',
        iconType: 'Crown',
        specs: 'RTX 5070 Ti • 24.5" 240Hz • Dark Project',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '160 ₽', weekend: '190 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '210 ₽', weekend: '240 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '540 ₽', weekend: '630 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '850 ₽', weekend: '980 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'super-vip-arena',
        title: 'SUPER VIP',
        badge: 'ФЛАГМАН',
        iconType: 'Flame',
        specs: 'RTX 5070 Ti • 27" 480Hz 2K / 24" 400Hz',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '220 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '270 ₽', weekend: '300 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '650 ₽', weekend: '750 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 300 ₽', weekend: '1 400 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'duo-arena',
        title: 'DUO ROOM',
        badge: 'ПАРНЫЙ ЗАЛ',
        iconType: 'ShieldCheck',
        specs: '2 Игрока • RTX 5070 Ti • 400-480Hz • Звукоизоляция',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '220 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '270 ₽', weekend: '300 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '650 ₽', weekend: '750 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 300 ₽', weekend: '1 400 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'solo-arena',
        title: 'SOLO ROOM',
        badge: 'ПРИВАТНЫЙ ЗАЛ',
        iconType: 'Flame',
        specs: 'RTX 5070 Ti • 400–600Hz • Звукоизоляция',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '250 ₽', weekend: '270 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '300 ₽', weekend: '330 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 200 ₽', weekend: '1 400 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 500 ₽', weekend: '2 000 ₽', filterKey: 'night' },
        ]
      }
    ],
    lounge: [
      {
        id: 'premium-arena',
        title: 'PREMIUM (ДО 14 ЧЕЛ)',
        badge: '5 ПК + PS5 + СТОЛ',
        highlight: true,
        iconType: 'Crown',
        specs: 'До 14 человек • 5 Pro ПК • PS5 Slim • Стол на 6 мест',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '1 500 ₽', weekend: '1 500 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '2 000 ₽', weekend: '2 000 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '5 000 ₽', weekend: '5 000 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '7 000 ₽', weekend: '7 000 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '7 000 ₽', weekend: '7 000 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'sim-racing-arena',
        title: 'АВТОСИМУЛЯТОРЫ',
        badge: 'SIM-RACING 2 КОКПИТА',
        highlight: true,
        iconType: 'Gauge',
        specs: 'Moza R12 Direct Drive • Moza Load Cell • UltraWide',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '400 ₽', weekend: '500 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '600 ₽', weekend: '700 ₽', filterKey: '1h' },
          { period: '2 ЧАСА', subtext: '08:00 – 19:00', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: '3h' },
          { period: '3 ЧАСА', subtext: 'Дневной сет', weekday: '1 350 ₽', weekend: '1 500 ₽', filterKey: '5h' },
        ]
      },
      {
        id: 'tv-arena',
        title: 'АРЕНДА TV (PS5)',
        badge: '7 КОМНАТ PS5 НА ЛЕНИНА',
        iconType: 'Tv',
        specs: '4K 120Hz экран • Звук Harman Kardon • Топ новинки',
        rows: [
          { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '300 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '350 ₽', weekend: '350 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '900 ₽', weekend: '900 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 200 ₽', weekend: '1 200 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 000 ₽', filterKey: 'night' },
        ]
      }
    ],
    extraServices: [
      {
        id: 'extra-gamepad-arena',
        title: 'Дополнительный геймпад PS5',
        price: '200 ₽ / шт',
        subtext: 'Sony DualSense на всё время сессии',
        category: 'gamepad',
        iconType: 'Gamepad2',
        badge: '200 ₽ / ШТ',
        description: 'Оригинальный беспроводной геймпад Sony DualSense с тактильной отдачей и адаптивными триггерами.'
      },
      {
        id: 'extra-guest-ps5-arena',
        title: 'Доплата за доп. гостя в PS5 комнату',
        price: '150 ₽ / час',
        subtext: '400 ₽ / пакет Ночь',
        category: 'guest',
        iconType: 'Users',
        badge: '150 ₽ / ЧАС',
        description: 'Дополнительный гость в PS5 комнате свыше стандартной комфортной посадки.'
      },
      {
        id: 'extra-guest-premium-arena',
        title: 'Доплата за доп. гостя в Premium комнату',
        price: '200 ₽ / час',
        subtext: '600 ₽ / пакет Ночь',
        category: 'guest',
        iconType: 'Crown',
        badge: '200 ₽ / ЧАС',
        description: 'Дополнительный гость в Premium комнате (свыше базовых 5 игроков, вместимость до 14 гостей).'
      },
      {
        id: 'hookah-classic-arena',
        title: 'Кальян Classic Mix',
        price: '900 ₽',
        subtext: 'Легкие и средние табаки',
        category: 'hookah',
        iconType: 'Flame',
        badge: 'ХИТ',
        description: 'Большая вкусовая палитра, свежая чаша, профессиональная забивка и своевременный контроль углей.'
      },
      {
        id: 'hookah-premium-arena',
        title: 'Кальян Premium Dark',
        price: '1 200 ₽',
        subtext: 'Darkside / Musthave / Black Burn',
        category: 'hookah',
        iconType: 'Flame',
        badge: 'PREMIUM',
        description: 'Крепкие премиальные табачные бленды с насыщенным вкусом, густым дымом и долгим ровным жаром.'
      },
      {
        id: 'hookah-refill-arena',
        title: 'Замена чаши / Перезабивка',
        price: '500 ₽',
        subtext: 'Свежая чаша и угли',
        category: 'hookah',
        iconType: 'Flame',
        badge: '500 ₽',
        description: 'Быстрая замена чаши на новый вкус табака со свежими кокосовыми углями.'
      }
    ]
  },
  'cyberx-evropa': {
    pc: [
      {
        id: 'standard-evropa',
        title: 'STANDARD',
        badge: 'БАЗОВЫЙ',
        iconType: 'Monitor',
        specs: 'RTX 3060 / 4060 • 240Hz • Dark Project',
        rows: [
          { period: 'УТРО 1 ЧАС', subtext: '08:00 – 14:00', weekday: '70 ₽', weekend: '90 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '130 ₽', weekend: '150 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '340 ₽', weekend: '400 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '500 ₽', weekend: '600 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '600 ₽', weekend: '750 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'standard-plus-evropa',
        title: 'STANDARD+',
        badge: 'ПОПУЛЯРНЫЙ',
        highlight: true,
        iconType: 'Zap',
        specs: 'RTX 5070 Ti • 240Hz • HyperX',
        rows: [
          { period: 'УТРО 1 ЧАС', subtext: '08:00 – 14:00', weekday: '90 ₽', weekend: '130 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '150 ₽', weekend: '170 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '400 ₽', weekend: '460 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '600 ₽', weekend: '700 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '750 ₽', weekend: '850 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'vip-evropa',
        title: 'VIP ROOM',
        badge: 'PRO КИБЕРСПОРТ',
        iconType: 'Crown',
        specs: 'RTX 5070 Ti • 24.5" 240Hz • Dark Project',
        rows: [
          { period: 'УТРО 1 ЧАС', subtext: '08:00 – 14:00', weekday: '110 ₽', weekend: '140 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '170 ₽', weekend: '200 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '470 ₽', weekend: '570 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '700 ₽', weekend: '900 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'super-vip-duo-evropa',
        title: 'DUO ROOM',
        badge: 'ПАРНЫЙ ЗАЛ',
        iconType: 'ShieldCheck',
        specs: '5070 Ti • 27" 480Hz 2K, 24" 400Hz • Звукоизоляция',
        rows: [
          { period: 'УТРО 1 ЧАС', subtext: '08:00 – 14:00', weekday: '150 ₽', weekend: '170 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '210 ₽', weekend: '230 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '590 ₽', weekend: '650 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '900 ₽', weekend: '1 000 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'solo-evropa',
        title: 'SOLO ROOM',
        badge: 'ТОП ФЛАГМАН 600HZ',
        iconType: 'Flame',
        specs: '5070 Ti • Ryzen 7800X3D • 600Hz • Звукоизоляция',
        rows: [
          { period: 'УТРО 1 ЧАС', subtext: '08:00 – 14:00', weekday: '190 ₽', weekend: '210 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '250 ₽', weekend: '270 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '700 ₽', weekend: '770 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 100 ₽', weekend: '1 200 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 100 ₽', weekend: '1 200 ₽', filterKey: 'night' },
        ]
      }
    ],
    lounge: [
      {
        id: 'tv-evropa',
        title: 'АРЕНДА TV (PS5)',
        badge: '5 КОМНАТ PS5 В ЕВРОПЕ',
        iconType: 'Tv',
        specs: 'PlayStation 5 • 4K экран • Уютный диван • Harman Kardon',
        rows: [
          { period: 'УТРО', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '250 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '300 ₽', weekend: '300 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '750 ₽', weekend: '750 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 100 ₽', weekend: '1 100 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '900 ₽', weekend: '900 ₽', filterKey: 'night' },
        ]
      }
    ],
    extraServices: [
      {
        id: 'extra-gamepad-evropa',
        title: 'Дополнительный геймпад PS5',
        price: '200 ₽ / шт',
        subtext: 'Sony DualSense на всё время сессии',
        category: 'gamepad',
        iconType: 'Gamepad2',
        badge: '200 ₽ / ШТ',
        description: 'Оригинальный геймпад Sony DualSense с тактильной обратной связью.'
      },
      {
        id: 'extra-guest-ps5-evropa',
        title: 'Доплата за доп. гостя в PS5 комнату',
        price: '150 ₽ / час',
        subtext: '400 ₽ / пакет Ночь',
        category: 'guest',
        iconType: 'Users',
        badge: '150 ₽ / ЧАС',
        description: 'Дополнительный гость в PS5 зале свыше стандартной вместимости.'
      },
      {
        id: 'hookah-classic-evropa',
        title: 'Кальян Classic Mix',
        price: '900 ₽',
        subtext: 'Легкие и средние табаки',
        category: 'hookah',
        iconType: 'Flame',
        badge: 'ХИТ',
        description: 'Большой выбор вкусов, дымная чаша и регулярный контроль углей.'
      },
      {
        id: 'hookah-premium-evropa',
        title: 'Кальян Premium Dark',
        price: '1 100 ₽',
        subtext: 'Darkside / Musthave',
        category: 'hookah',
        iconType: 'Flame',
        badge: 'PREMIUM',
        description: 'Премиум бленды, глубокий насыщенный вкус и долгий ровный покур.'
      },
      {
        id: 'hookah-refill-evropa',
        title: 'Замена чаши / Перезабивка',
        price: '500 ₽',
        subtext: 'Свежая чаша и угли',
        category: 'hookah',
        iconType: 'Flame',
        badge: '500 ₽',
        description: 'Перезабивка кальяна с новым вкусом по вашему выбору.'
      }
    ]
  },
  'cyberx-oktyabr': {
    pc: [
      {
        id: 'standard-oktyabr',
        title: 'STANDARD',
        badge: 'БАЗОВЫЙ',
        iconType: 'Monitor',
        specs: 'RTX 3060 / 4060 • BenQ 240Hz • Механика',
        rows: [
          { period: 'УТРО ЗА 1 ЧАС', subtext: '08:00 – 14:00', weekday: '70 ₽', weekend: '90 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '110 ₽', weekend: '130 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '300 ₽', weekend: '350 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '450 ₽', weekend: '550 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '400 ₽', weekend: '500 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'vip-oktyabr',
        title: 'VIP ROOM (5 ПК)',
        badge: 'PRO КИБЕРСПОРТ',
        iconType: 'Crown',
        specs: '5 ПК • RTX 5070 Ti • BenQ 240Hz',
        rows: [
          { period: 'УТРО', subtext: '08:00 – 14:00', weekday: '90 ₽', weekend: '120 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '130 ₽', weekend: '160 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '350 ₽', weekend: '450 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '550 ₽', weekend: '700 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '700 ₽', weekend: '800 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'trio-oktyabr',
        title: 'TRIO ROOM',
        badge: 'КОМНАТА НА 3 ПК',
        highlight: true,
        iconType: 'Users',
        specs: '3 ПК • RTX 5070 Ti • BenQ 240Hz • Приватность',
        rows: [
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '150 ₽', weekend: '180 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '400 ₽', weekend: '500 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '650 ₽', weekend: '800 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'duo-oktyabr',
        title: 'DUO ROOM',
        badge: 'ПАРНЫЙ ЗАЛ',
        iconType: 'ShieldCheck',
        specs: '2 ПК • RTX 5070 Ti • BenQ 240Hz • Звукоизоляция',
        rows: [
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '190 ₽', weekend: '210 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '550 ₽', weekend: '600 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '850 ₽', weekend: '900 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '900 ₽', weekend: '1 000 ₽', filterKey: 'night' },
        ]
      },
      {
        id: 'solo-oktyabr',
        title: 'SOLO ROOM',
        badge: 'ПРИВАТНЫЙ ЗАЛ',
        iconType: 'Flame',
        specs: 'Ryzen 7 7800X3D • BenQ 240Hz • Звукоизоляция',
        rows: [
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '230 ₽', weekend: '260 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '650 ₽', weekend: '750 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: 'night' },
        ]
      }
    ],
    lounge: [
      {
        id: 'tv-oktyabr',
        title: 'АРЕНДА TV (PS5)',
        badge: '4 КОМНАТЫ PS5 В ОКТЯБРЕ',
        iconType: 'Tv',
        specs: 'PlayStation 5 • 4K экран • Мягкие диваны и пуфы',
        rows: [
          { period: 'УТРО', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '200 ₽', filterKey: 'morning' },
          { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '300 ₽', weekend: '300 ₽', filterKey: '1h' },
          { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '750 ₽', weekend: '750 ₽', filterKey: '3h' },
          { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 100 ₽', weekend: '1 100 ₽', filterKey: '5h' },
          { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '900 ₽', weekend: '900 ₽', filterKey: 'night' },
        ]
      }
    ],
    extraServices: [
      {
        id: 'extra-gamepad-oktyabr',
        title: 'Дополнительный геймпад PS5',
        price: '200 ₽ / шт',
        subtext: 'Sony DualSense на всё время сессии',
        category: 'gamepad',
        iconType: 'Gamepad2',
        badge: '200 ₽ / ШТ',
        description: 'Оригинальный геймпад Sony DualSense с виброотдачей нового поколения.'
      },
      {
        id: 'extra-guest-ps5-oktyabr',
        title: 'Доплата за доп. гостя в PS5 комнату',
        price: '150 ₽ / час',
        subtext: '400 ₽ / пакет Ночь',
        category: 'guest',
        iconType: 'Users',
        badge: '150 ₽ / ЧАС',
        description: 'Дополнительный гость в PS5 комнату свыше базовой посадки.'
      },
      {
        id: 'hookah-classic-oktyabr',
        title: 'Кальян Classic Mix',
        price: '800 ₽',
        subtext: 'Легкие и средние табаки',
        category: 'hookah',
        iconType: 'Flame',
        badge: 'ХИТ',
        description: 'Популярные ягодные и фруктовые миксы на качественной чаше.'
      },
      {
        id: 'hookah-premium-oktyabr',
        title: 'Кальян Premium Dark',
        price: '1 000 ₽',
        subtext: 'Darkside / Musthave',
        category: 'hookah',
        iconType: 'Flame',
        badge: 'PREMIUM',
        description: 'Крепкие табачные смеси, стабильный жар и насыщенный густой дым.'
      },
      {
        id: 'hookah-refill-oktyabr',
        title: 'Замена чаши / Перезабивка',
        price: '500 ₽',
        subtext: 'Свежая чаша и угли',
        category: 'hookah',
        iconType: 'Flame',
        badge: '500 ₽',
        description: 'Замена чаши на новый микс табака и свежие угли.'
      }
    ]
  }
};

export const HARDWARE_LIST: HardwareItem[] = [
  {
    id: 'monitors',
    category: 'monitors',
    categoryLabel: 'Дисплеи',
    name: 'BenQ Zowie 600Hz / ASUS 480Hz / 400Hz',
    model: '600Hz / 480Hz / 400Hz / 240Hz Fast-TN & OLED // 0.03ms Response',
    tagline: 'Абсолютная рекордная частота обновления 600 кадров в секунду',
    image: '/images/hardware/benq-monitor.png',
    keySpecs: [
      { label: 'Флагманская герцовка', value: '600 Hz', detail: 'Установлены в Super VIP и Solo Rooms' },
      { label: 'VIP мониторы', value: '480 / 400 Hz', detail: 'ASUS 27" 480Гц и ViewSonic 400Гц' },
      { label: 'Standart мониторы', value: '240 / 144 Hz', detail: 'BenQ 24.5" Zowie eSports' },
      { label: 'Латентность', value: '0.03 — 0.5 ms', detail: 'Zero-motion blur при резких фликах' },
    ],
    description: 'В клубах CyberX в Омске установлены самые быстрые мониторы в городе — вплоть до рекордных 600Hz и 480Hz. Никаких шлейфов и размытия.',
    proAdvantage: '600Hz дает идеальную плавность и физическое преимущество в регистрации первого выстрела при выходе из-за угла.',
    interactiveType: 'hertz',
  },
  {
    id: 'keyboards',
    category: 'keyboards',
    categoryLabel: 'Клавиатуры',
    name: 'Dark Project Mechanical & Logitech G',
    model: 'Смазанные механические свитчи // Gasket Mount шумоизоляция',
    tagline: 'Премиальная кастомная механика Dark Project с мягким акустическим тайпингом',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Бренды', value: 'Dark Project & Logitech', detail: 'Механические клавиатуры' },
      { label: 'Свитчи', value: 'Factory Lubed Pro', detail: 'Плавный ход без песка и люфтов' },
      { label: 'Частота опроса', value: '1000 Hz', detail: '<1ms латентность контроллера' },
      { label: 'Кейкапы', value: 'PBT Double-Shot', detail: 'Стойкие к истиранию символы' },
    ],
    description: 'Во всех залах Super VIP и VIP установлены механические клавиатуры Dark Project с заводской смазкой свитчей и стабилизаторов для идеального отклика.',
    proAdvantage: 'Тактильная четкость и мгновенная регистрация нажатий без мисскликов.',
    interactiveType: 'actuation',
  },
  {
    id: 'mice',
    category: 'mice',
    categoryLabel: 'Мыши & Ковры',
    name: 'Logitech G Pro, Ajazz & Dark Project',
    model: 'Оптические сенсоры Hero / PixArt 3395 // Сверхлегкий вес',
    tagline: 'Флагманские киберспортивные мыши с идеальным балансом и тефлоновыми глайдами',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Бренды', value: 'Logitech / Ajazz / Dark Project', detail: 'Топовые соревновательные мыши' },
      { label: 'Сенсоры', value: 'PixArt 3395 / Hero', detail: 'До 26 000 DPI без срывов' },
      { label: 'Ковры', value: 'CyberX Pro Large', detail: 'Текстура Speed/Control' },
      { label: 'Глайды', value: '100% PTFE', detail: 'Идеальное скольжение по ковру' },
    ],
    description: 'Мы регулярно обновляем тефлоновые глайды и коврики, обеспечивая чистый трекинг и точность микродоводок при любых резких движениях.',
    proAdvantage: 'Отсутствие срывов при максимальных ускорениях до 50G.',
    interactiveType: 'sensor',
  },
  {
    id: 'rigs',
    category: 'rigs',
    categoryLabel: 'Игровые ПК',
    name: 'NVIDIA RTX 5070 Ti & AMD Ryzen 7 7800X3D',
    model: 'RTX 5070 Ti / i5-14600KF / Ryzen 7 7800X3D // 32GB DDR5',
    tagline: 'Флагманские конфигурации Super VIP и Solo комнат со стабильными 600+ FPS',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Процессоры VIP', value: 'Ryzen 7 7800X3D / i5-14600KF', detail: 'Топовый игровой однопоток' },
      { label: 'Видеокарты VIP', value: 'NVIDIA RTX 5070 Ti', detail: 'DLSS 3.5 & Reflex' },
      { label: 'Оперативная память', value: '32GB DDR5', detail: 'Высокочастотная память' },
      { label: 'Система дисков', value: 'Бездисковая сеть >1 Гбит', detail: 'Мгновенный запуск всех игр' },
    ],
    description: 'Все компьютеры подключены к высокоскоростной бездисковой системе с серверами прямого доступа. Любая игра обновлена и запускается за секунды.',
    proAdvantage: 'CS2: 600-800 FPS, Valorant: 800+ FPS, Dota 2: 350+ FPS без просадок.',
    interactiveType: 'fps',
  },
  {
    id: 'audio',
    category: 'audio',
    categoryLabel: 'Звук & Гарнитуры',
    name: 'HyperX Cloud Pro Series',
    model: '53mm динамические излучатели с шумоподавлением микрофона',
    tagline: 'Золотой стандарт соревновательного киберспортивного звука',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Драйверы', value: '53mm с неодимовыми магнитами', detail: 'Закрытая акустическая конструкция' },
      { label: 'Амбушюры', value: 'Memory Foam с эффектом памяти', detail: 'Мягкая посадка без давления' },
      { label: 'Микрофон', value: 'Шумоподавление TeamSpeak/Discord', detail: 'Кристально чистый голос' },
      { label: 'Частотный диапазон', value: '15 — 25 000 Hz', detail: 'Точное позиционирование шагов' },
    ],
    description: 'Все игровые места оснащены проверенными гарнитурами HyperX Cloud. Плотная звукоизоляция амбушюров позволяет сосредоточиться только на звуках игры.',
    proAdvantage: 'Хирургически точное определение направления шагов и звуков перезарядки.',
    interactiveType: 'audioGraph',
  },
  {
    id: 'chairs',
    category: 'chairs',
    categoryLabel: 'Эргономика',
    name: 'Фирменные кресла CyberX Esports Pro',
    model: 'Анатомический стальной каркас 1.5мм + Memory Foam + 3D/4D подлокотники',
    tagline: 'Фирменная эргономика CyberX для идеальной осанки во время 10+ часовых каток',
    image: 'https://images.unsplash.com/photo-1580481077195-c3a82da91883?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Каркас', value: 'Усиленная сталь 1.5мм', detail: 'Газлифт 4 класса, нагрузка до 150 кг' },
      { label: 'Обивка', value: 'Перфорированная экокожа', detail: 'Дышащая микрофибра с теплоотводом' },
      { label: 'Подлокотники', value: '3D/4D Ergo Регулировка', detail: 'Идеально вровень со столешницей' },
      { label: 'Механизм качания', value: 'Мультиблок 90° — 165°', detail: 'Фиксация спинки в любом положении' },
    ],
    description: 'Каждое место в наших клубах оснащено фирменными киберспортивными креслами CyberX с поясничными и шейными подушками Memory Foam для сохранения идеальной осанки.',
    proAdvantage: 'Полное отсутствие усталости в спине и максимальная концентрация на протяжении всей игровой ночи.',
    interactiveType: 'ergonomics',
  }
];

export const UPCOMING_TOURNAMENT: Tournament = {
  id: 'cyberx-omsk-cup-cs2',
  title: 'CYBERX OMSK MAJOR // AUTUMN 2026',
  game: 'CS2',
  gameTag: 'COUNTER-STRIKE 2 // 5v5 OMSK LAN BATTLE',
  prizePool: '150 000 ₽',
  prizePoolNumeric: 150000,
  date: '25 Октября 2026',
  time: '12:00 Омск (09:00 МСК)',
  location: 'CYBERX ARENA (ул. Ленина, 19) + Стрим Twitch',
  format: 'Double Elimination // LAN Final 5x5',
  slotsTotal: 16,
  slotsRegistered: 14,
  registrationOpen: true,
  entryFee: '2 000 ₽ с команды (100% на баланс)',
  streamUrl: 'https://twitch.tv',
  description: 'Главный сезонный LAN-турнир по CS2 в Омске на сцене CyberX Arena. Команды сразятся за призовой фонд 150,000 ₽, чемпионский кубок CyberX и мерч. Финал комментируют профессиональные кастеры.',
  rules: [
    'Формат: 5х5 Competitive, MR12, Овертаймы MR3 $10,000',
    'Официальный маппул Active Duty CS2',
    'Античит: Внутриаренный LAN сервер 128 Tick Sub-Tick Pro',
    'Все участники играют на сетапах с мониторами BenQ 600Hz / 400Hz',
    'Напитки и снеки из бара CyberX включены для полуфиналистов'
  ],
  prizes: [
    { place: '🥇 1 МЕСТО', reward: '80 000 ₽ + Кубок CyberX Omsk + 50 часов в Premium' },
    { place: '🥈 2 МЕСТО', reward: '45 000 ₽ + Серебряные медали + 25 часов в VIP' },
    { place: '🥉 3 МЕСТО', reward: '25 000 ₽ + Бронзовые медали + Девайсы Dark Project' },
    { place: '🎖 MVP Турнира', reward: 'Именная мышь Logitech G Pro X' }
  ]
};

export const ALL_TOURNAMENTS: Tournament[] = [
  UPCOMING_TOURNAMENT,
  {
    id: 'cyberx-dota-2-omsk',
    title: 'CYBERX DOTA 2 IMMORTAL CLASH',
    game: 'DOTA 2',
    gameTag: 'DOTA 2 // 5v5 CAPTAINS MODE',
    prizePool: '100 000 ₽',
    prizePoolNumeric: 100000,
    date: '4 Октября 2026',
    time: '13:00 Омск',
    location: 'CYBERX ЕВРОПА (просп. Мира, 42к1)',
    format: 'Group Stage + Single Elim Playoff',
    slotsTotal: 16,
    slotsRegistered: 9,
    registrationOpen: true,
    entryFee: '1 500 ₽ с команды',
    description: 'Битва сильнейших дотеров Омска в киберхабе CyberX Европа. Трансляция на большом экране, призы и подарки от партнеров.',
    rules: [
      'Captains Mode, актуальный соревновательный патч',
      'LAN сервер с минимальным пингом'
    ],
    prizes: [
      { place: '🥇 1 МЕСТО', reward: '60 000 ₽ + Aegis CyberX' },
      { place: '🥈 2 МЕСТО', reward: '25 000 ₽' },
      { place: '🥉 3 МЕСТО', reward: '15 000 ₽' }
    ]
  },
  {
    id: 'cyberx-valorant-radiant',
    title: 'CYBERX VALORANT RADIANT CUP',
    game: 'VALORANT',
    gameTag: 'VALORANT // 5v5 TOURNAMENT',
    prizePool: '80 000 ₽',
    prizePoolNumeric: 80000,
    date: '18 Октября 2026',
    time: '14:00 Омск',
    location: 'CYBERX ОКТЯБРЬ (ул. Серова, 19А)',
    format: 'Swiss System 5 Rounds + Playoff',
    slotsTotal: 12,
    slotsRegistered: 7,
    registrationOpen: true,
    entryFee: 'Бесплатно по клубной карте CyberX',
    description: 'Швейцарская система для равной борьбы без вылета после одной случайной карты.',
    rules: [
      'Официальный регламент VCT',
      'Мониторы BenQ 600Hz / 400Hz'
    ],
    prizes: [
      { place: '🥇 1 МЕСТО', reward: '45 000 ₽ + Кубок' },
      { place: '🥈 2 МЕСТО', reward: '25 000 ₽' },
      { place: '🥉 3 МЕСТО', reward: '10 000 ₽' }
    ]
  },
  {
    id: 'cyberx-fc25-omsk',
    title: 'EA FC 25 CONSOLE CHAMPIONSHIP',
    game: 'EA FC 25',
    gameTag: 'PS5 // 1v1 DUEL',
    prizePool: '40 000 ₽',
    prizePoolNumeric: 40000,
    date: '25 Октября 2026',
    time: '16:00 Омск',
    location: 'CYBERX ARENA (PS5 Кино-Лаунж // Ленина, 19)',
    format: '1v1 Double Elim // Экран 150"',
    slotsTotal: 32,
    slotsRegistered: 22,
    registrationOpen: true,
    entryFee: '700 ₽ с участника',
    description: 'Консольный турнир на 150" проекционном экране лаунжа с напитками и кальянами.',
    rules: [
      'Тайм 6 минут, соревновательные составы 95 OVR',
      'Геймпады DualSense'
    ],
    prizes: [
      { place: '🥇 1 МЕСТО', reward: '25 000 ₽ + Кубок' },
      { place: '🥈 2 МЕСТО', reward: '10 000 ₽' },
      { place: '🥉 3 МЕСТО', reward: '5 000 ₽' }
    ]
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'free-hours-welcome',
    title: '2 ЧАСА В ПОДАРОК // НОВЫМ ГОСТЯМ',
    tag: 'АКЦИЯ LANGAME',
    discount: '2 ЧАСА БЕСПЛАТНО',
    period: 'При первой регистрации в CyberX Европа & Октябрь',
    description: 'Зарегистрируйте аккаунт в клубах CyberX Европа (Мира) или CyberX Октябрь (Серова) и получите 2 часа бесплатной игры на баланс сразу!',
    perks: [
      '2 часа бесплатного игрового времени',
      'Действует на любые игры и ПК',
      'Клубная карта CyberX Community в подарок'
    ],
    code: 'CYBERX_WELCOME_2H',
    colorScheme: 'red',
    featured: true,
  },
  {
    id: 'hookah-bonus',
    title: 'КАЛЬЯН + ЧАС ИГРЫ В ПОДАРОК',
    tag: 'ХИТ ЛАУНЖА',
    discount: '+1 ЧАС ИГРЫ',
    period: 'Ежедневно во всех 3 клубах',
    description: 'Закажите кальян у администратора в CyberX Arena, Европе или Октябре и получите 1 час игры на PlayStation 5 или ПК в подарок!',
    perks: [
      'Премиальный табак и авторская чаша',
      '1 час игры в PS5 или ПК бесплатно',
      'Подача прямо к игровому месту или дивану'
    ],
    code: 'HOOKAH_GAME',
    colorScheme: 'dark',
    featured: true,
  },
  {
    id: 'friend-bonus',
    title: 'ПРИВЕДИ ДРУГА // +200 РУБЛЕЙ',
    tag: 'БОНУСНАЯ ПРОГРАММА',
    discount: '+200 ₽ НА БАЛАНС',
    period: 'Постоянная акция в CyberX Arena (Ленина, 19)',
    description: 'Приведите друга, который еще не был в CyberX Arena — и вы оба получите по 200 рублей на игровой баланс при его первой сессии.',
    perks: [
      '200 рублей вам и 200 рублей другу',
      'Количество приглашенных друзей не ограничено',
      'Баллы можно тратить на любое время и пакеты'
    ],
    code: 'FRIEND_200',
    colorScheme: 'steel',
    featured: false,
  }
];
