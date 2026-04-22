// 目的地数据源，所有页面共享
// 字段说明：
//   lat/lng      Open-Meteo 查询经纬度
//   countryCode  REST Countries 使用的 cca2
//   timezone     IANA 时区，用于 Intl.DateTimeFormat 本地时间
//   baseCurrency 价格的原始币种（用于 Frankfurter 换算）
window.DESTINATIONS = [
  {
    id: "kyoto",
    name: "京都",
    country: "日本",
    countryCode: "JP",
    region: "东亚",
    themes: ["文化", "历史", "摄影"],
    rating: 4.9,
    reviews: 12480,
    priceLevel: 3,
    priceFrom: 5980,
    baseCurrency: "CNY",
    duration: "5-7 天",
    bestSeason: "3-4 月 / 10-11 月",
    tagline: "千年古都，枫红樱白",
    lat: 35.0116,
    lng: 135.7681,
    timezone: "Asia/Tokyo",
    heroImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583400739880-b6d26bdff395?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "京都是日本的文化心脏，保留了 1200 年的皇家传统。漫步岚山竹林、登临清水寺，在祇园古街邂逅艺伎，每一帧都像浮世绘。",
    highlights: [
      "伏见稻荷千本鸟居",
      "岚山竹林小径与渡月桥",
      "金阁寺镜湖倒影",
      "祇园花见小路夜色"
    ],
    itinerary: [
      { day: 1, title: "东山文化漫步", detail: "清水寺 → 二年坂 → 八坂神社 → 祇园" },
      { day: 2, title: "金阁与岚山", detail: "金阁寺 → 竹林小径 → 渡月桥 → 野宫神社" },
      { day: 3, title: "伏见与宇治", detail: "伏见稻荷 → 宇治平等院 → 抹茶体验" },
      { day: 4, title: "御所与鸭川", detail: "京都御所 → 鸭川散步 → 先斗町夜宴" },
      { day: 5, title: "近郊一日", detail: "奈良公园喂鹿 → 东大寺 → 返程" }
    ]
  },
  {
    id: "santorini",
    name: "圣托里尼",
    country: "希腊",
    countryCode: "GR",
    region: "欧洲",
    themes: ["海岛", "浪漫", "摄影"],
    rating: 4.8,
    reviews: 9820,
    priceLevel: 4,
    priceFrom: 12800,
    baseCurrency: "CNY",
    duration: "5-6 天",
    bestSeason: "5-9 月",
    tagline: "爱琴海上的蓝白童话",
    lat: 36.3932,
    lng: 25.4615,
    timezone: "Europe/Athens",
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515861461225-1488dfdaf0a8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "白墙蓝顶的房屋层叠于悬崖之上，伊亚的日落被誉为世界第一。乘船探访火山温泉，或在红沙滩边品一杯冰镇 Assyrtiko。",
    highlights: [
      "伊亚（Oia）悬崖日落",
      "火山岛徒步与温泉浴",
      "红沙滩、黑沙滩漂流",
      "费拉缆车俯瞰爱琴海"
    ],
    itinerary: [
      { day: 1, title: "抵达费拉", detail: "办理入住 → 缆车上下港口 → 黄昏漫步" },
      { day: 2, title: "伊亚日落", detail: "伊亚小镇游览 → 风车观景 → 日落派对" },
      { day: 3, title: "火山与温泉", detail: "Nea Kameni 火山徒步 → 温泉海浴 → Thirasia 小岛午餐" },
      { day: 4, title: "沙滩与酒庄", detail: "红沙滩 → Perissa 黑沙滩 → Santo Wines 品酒" },
      { day: 5, title: "悠闲离岛", detail: "早餐悬崖泳池 → 返程" }
    ]
  },
  {
    id: "reykjavik",
    name: "雷克雅未克",
    country: "冰岛",
    countryCode: "IS",
    region: "欧洲",
    themes: ["自然", "极光", "探险"],
    rating: 4.9,
    reviews: 6430,
    priceLevel: 4,
    priceFrom: 15800,
    baseCurrency: "CNY",
    duration: "7-10 天",
    bestSeason: "9-3 月（极光）/ 6-8 月（午夜阳光）",
    tagline: "冰与火的极光之国",
    lat: 64.1466,
    lng: -21.9426,
    timezone: "Atlantic/Reykjavik",
    heroImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486944936320-044d441619f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "追逐北极光、驾车环岛公路、泡在蓝湖温泉里看雪落。冰岛是地理课本的活标本，也是摄影师的终极梦想。",
    highlights: [
      "蓝湖（Blue Lagoon）地热温泉",
      "黄金圈：间歇泉、黄金瀑布、辛格维利尔",
      "南岸：塞里雅兰瀑布、黑沙滩",
      "追寻北极光与冰川徒步"
    ],
    itinerary: [
      { day: 1, title: "抵达雷克雅未克", detail: "哈尔格林姆教堂 → 老港口 → 蓝湖温泉" },
      { day: 2, title: "黄金圈", detail: "辛格维利尔国家公园 → Geysir → Gullfoss 瀑布" },
      { day: 3, title: "南岸瀑布群", detail: "Seljalandsfoss → Skógafoss → Reynisfjara 黑沙滩" },
      { day: 4, title: "冰川与冰洞", detail: "Sólheimajökull 冰川徒步 → 杰古沙龙冰湖" },
      { day: 5, title: "极光守候", detail: "极光团 → 夜空摄影" },
      { day: 6, title: "环岛或离境", detail: "自由活动 / 返程" }
    ]
  },
  {
    id: "banff",
    name: "班夫",
    country: "加拿大",
    countryCode: "CA",
    region: "北美",
    themes: ["自然", "徒步", "雪山"],
    rating: 4.9,
    reviews: 7820,
    priceLevel: 3,
    priceFrom: 9980,
    baseCurrency: "CNY",
    duration: "6-8 天",
    bestSeason: "6-9 月（徒步）/ 12-3 月（滑雪）",
    tagline: "落基山脉的翡翠湖光",
    lat: 51.1784,
    lng: -115.5708,
    timezone: "America/Edmonton",
    heroImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609762694912-62f6b13b1d9f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483030524875-d1d1634ce21c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "露易丝湖如镜，梦莲湖翠蓝，班夫小镇在落基山脚下熠熠生辉。夏天湖畔徒步，冬天雪道飞驰。",
    highlights: [
      "露易丝湖划独木舟",
      "梦莲湖（Moraine Lake）日出",
      "班夫上温泉 Upper Hot Springs",
      "硫磺山缆车 360° 雪山景观"
    ],
    itinerary: [
      { day: 1, title: "卡尔加里入境", detail: "机场接机 → 自驾前往班夫" },
      { day: 2, title: "露易丝湖", detail: "露易丝湖徒步 → 梦莲湖赏景" },
      { day: 3, title: "班夫小镇", detail: "硫磺山缆车 → 上温泉 → 小镇漫步" },
      { day: 4, title: "冰原大道", detail: "Peyto Lake → Athabasca 冰川 → Jasper" },
      { day: 5, title: "回程之路", detail: "Bow Lake → Kananaskis → 卡尔加里" }
    ]
  },
  {
    id: "marrakech",
    name: "马拉喀什",
    country: "摩洛哥",
    countryCode: "MA",
    region: "非洲",
    themes: ["文化", "美食", "探险"],
    rating: 4.7,
    reviews: 5340,
    priceLevel: 2,
    priceFrom: 7280,
    baseCurrency: "CNY",
    duration: "5-7 天",
    bestSeason: "3-5 月 / 9-11 月",
    tagline: "红色之城的千年集市",
    lat: 31.6295,
    lng: -7.9811,
    timezone: "Africa/Casablanca",
    heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531104985437-603d6490e6d4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1489493512598-d08130f49bea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "在麦地那老城的迷宫里迷路，闻皮革坊的阵阵香料，听德吉玛广场的鼓声，看沙漠骆驼踏出长长影子。",
    highlights: [
      "马若雷勒花园（Jardin Majorelle）",
      "德吉玛广场夜市（Jemaa el-Fnaa）",
      "巴西亚宫与本尤素福经学院",
      "撒哈拉沙漠骑骆驼夜宿帐篷"
    ],
    itinerary: [
      { day: 1, title: "抵达红城", detail: "入住 Riad → 老城漫步 → 德吉玛广场晚餐" },
      { day: 2, title: "宫殿与花园", detail: "巴西亚宫 → 马若雷勒花园 → YSL 博物馆" },
      { day: 3, title: "阿特拉斯山", detail: "Ourika 河谷徒步 → 柏柏尔村落" },
      { day: 4, title: "撒哈拉之路", detail: "翻越阿特拉斯 → 瓦尔扎扎特 → 沙漠帐篷" },
      { day: 5, title: "沙丘日出", detail: "骆驼看日出 → 返回马拉喀什" }
    ]
  },
  {
    id: "queenstown",
    name: "皇后镇",
    country: "新西兰",
    countryCode: "NZ",
    region: "大洋洲",
    themes: ["探险", "自然", "雪山"],
    rating: 4.8,
    reviews: 8210,
    priceLevel: 3,
    priceFrom: 11800,
    baseCurrency: "CNY",
    duration: "7-10 天",
    bestSeason: "12-2 月（夏）/ 6-8 月（雪）",
    tagline: "南半球的极限冒险之都",
    lat: -45.0312,
    lng: 168.6626,
    timezone: "Pacific/Auckland",
    heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537815749002-de6a533c64db?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "瓦卡蒂普湖畔的小镇，蹦极、跳伞、喷射快艇通通能满足。从这里出发，还能探访魔戒取景地米佛峡湾。",
    highlights: [
      "Kawarau 大桥蹦极发源地",
      "米佛峡湾（Milford Sound）巡航",
      "皇冠峰滑雪与雪地摩托",
      "瓦卡蒂普湖老蒸汽船 TSS Earnslaw"
    ],
    itinerary: [
      { day: 1, title: "抵达皇后镇", detail: "天空缆车 → Fergburger 汉堡" },
      { day: 2, title: "肾上腺素", detail: "Nevis 蹦极 → 喷射快艇 Shotover Jet" },
      { day: 3, title: "米佛峡湾", detail: "Te Anau → 米佛峡湾巡航" },
      { day: 4, title: "格林诺奇", detail: "魔戒取景地徒步 → Paradise 牧场" },
      { day: 5, title: "葡萄酒之路", detail: "Gibbston Valley 酒庄 → Arrowtown 淘金小镇" }
    ]
  },
  {
    id: "lisbon",
    name: "里斯本",
    country: "葡萄牙",
    countryCode: "PT",
    region: "欧洲",
    themes: ["文化", "美食", "城市"],
    rating: 4.7,
    reviews: 6120,
    priceLevel: 2,
    priceFrom: 8980,
    baseCurrency: "CNY",
    duration: "5-6 天",
    bestSeason: "4-6 月 / 9-10 月",
    tagline: "大航海起点的彩色坡城",
    lat: 38.7223,
    lng: -9.1393,
    timezone: "Europe/Lisbon",
    heroImage: "https://images.unsplash.com/photo-1588535265092-a642a3fcfa5c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513735429613-f4b73afe8b91?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1569144157581-b65fe4f66e39?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "坐上 28 路黄色电车穿过阿尔法玛老城，听一场 Fado 吟唱，再去贝伦区吃一枚热腾腾的葡式蛋挞。",
    highlights: [
      "贝伦塔与热罗尼莫斯修道院",
      "28 路电车与阿尔法玛老城",
      "辛特拉佩纳宫与罗卡角",
      "Time Out Market 美食盛宴"
    ],
    itinerary: [
      { day: 1, title: "老城漫游", detail: "商业广场 → 圣胡斯塔升降机 → 阿尔法玛" },
      { day: 2, title: "贝伦区", detail: "贝伦塔 → 发现者纪念碑 → Pastéis de Belém 蛋挞" },
      { day: 3, title: "辛特拉", detail: "佩纳宫 → 摩尔人城堡 → 罗卡角" },
      { day: 4, title: "LX Factory", detail: "创意园区 → 市场午餐 → 夜晚 Fado 酒馆" }
    ]
  },
  {
    id: "chiangmai",
    name: "清迈",
    country: "泰国",
    countryCode: "TH",
    region: "东南亚",
    themes: ["文化", "美食", "放松"],
    rating: 4.6,
    reviews: 14560,
    priceLevel: 1,
    priceFrom: 3280,
    baseCurrency: "CNY",
    duration: "4-6 天",
    bestSeason: "11-2 月",
    tagline: "泰北的温柔慢生活",
    lat: 18.7883,
    lng: 98.9853,
    timezone: "Asia/Bangkok",
    heroImage: "https://images.unsplash.com/photo-1512553353614-82a7370096dc?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552550049-db097c9480d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "三百多座寺庙散落在古城之中，素贴山俯瞰整座城市。黄昏时到周末夜市淘一件手作，再泡一杯清迈咖啡。",
    highlights: [
      "双龙寺 Doi Suthep 俯瞰清迈",
      "古城塔佩门与周日步行街",
      "宁曼路咖啡与手作小店",
      "大象保护营与泰式按摩课"
    ],
    itinerary: [
      { day: 1, title: "古城漫步", detail: "塔佩门 → 契迪龙寺 → 周日夜市" },
      { day: 2, title: "山上寺庙", detail: "双龙寺 → 蒲屏皇宫 → 宁曼路" },
      { day: 3, title: "丛林体验", detail: "大象保护营 → 泰式烹饪课" },
      { day: 4, title: "悠闲一日", detail: "咖啡馆 → 泰式按摩 → 返程" }
    ]
  }
];

window.TESTIMONIALS = [
  {
    name: "林思远",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "摄影师 · 上海",
    text: "云游给我推荐的冰岛路线避开了所有游客团，我拍到了人生最壮观的一次极光。",
    rating: 5
  },
  {
    name: "Amelia Chen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    role: "数字游民 · 深圳",
    text: "从清迈到里斯本，我的远程办公生活被云游安排得明明白白，连咖啡馆都贴心推荐。",
    rating: 5
  },
  {
    name: "周野",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    role: "自由作家 · 成都",
    text: "马拉喀什的 Riad 是我住过最惊艳的民宿，深夜在天台听集市的鼓声，像进入另一个时空。",
    rating: 5
  }
];

// 编辑短札：首页用的「编辑手记」栏目
window.JOURNAL = [
  {
    id: "j-cherry",
    eyebrow: "Field Notes · 01",
    title: "写给樱花的一封迟到的情书",
    excerpt: "在京都哲学之道走完三公里，我才明白日本人说「物哀」到底是什么意思。",
    author: "编辑 · 柏原",
    readTime: "6 分钟",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "j-iceland",
    eyebrow: "Field Notes · 02",
    title: "当极光只出现了 37 秒",
    excerpt: "我把 4 天的等待、冻僵的指尖和两杯热巧克力，换成了一卷胶片。",
    author: "编辑 · 南桥",
    readTime: "9 分钟",
    image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "j-marrakech",
    eyebrow: "Field Notes · 03",
    title: "我在马拉喀什迷路的第四个下午",
    excerpt: "老城是活的迷宫，但每一堵红墙背后都有一杯薄荷茶在等你。",
    author: "编辑 · 阿舟",
    readTime: "7 分钟",
    image: "https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?auto=format&fit=crop&w=1400&q=80"
  }
];
