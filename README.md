# 云游 Yunyou · 旅游推荐静态网站

一个纯前端、零构建的旅游推荐网站。用原生 HTML / CSS / JavaScript 实现，
通过多个免费开放 API 带来实时数据。

## 特性

### 视觉 · 杂志编辑风
- 米白 + 深墨 + 陶土色的克制配色，告别渐变色滥用
- Fraunces 可变衬线体做大标题，斜体点缀关键词
- 非对称编辑网格（大封面 + 小卡），编号式章节分段
- 深色 interlude 段落打破纯白平铺

### 真实 API · 无后端
- **Open-Meteo** — 目的地当前天气 + 7 天预报（气温、天气码、湿度、风速）
- **REST Countries** — 国旗、货币、首都、人口、语言
- **Frankfurter** — 实时汇率（CNY / USD / EUR / JPY / GBP / HKD 切换）
- **Intl.DateTimeFormat** — 目的地当地实时时间

### 功能
- **心愿单** — localStorage 持久化，♥ 图标 + 独立页面
- **行程规划器** — 添加 / 拖拽排序 / 调整天数 / 多币种预算 / 导出为文本
- **深色模式** — 可持久化切换
- **URL 同步筛选** — 列表页搜索条件可分享
- **多页面** — 首页 / 目的地 / 详情 / 心愿单 / 行程规划 5 个页面

### 动画
- Hero 共享容器 Ken Burns（多图 crossfade 不再有缩放割裂）
- 滚动进入视口 reveal（IntersectionObserver，多方向 + stagger）
- 数字计数器缓动
- 卡片悬停图像放大、主题卡悬停显影、按钮平滑过渡
- 页面入场淡入、标题逐行揭幕
- 滚动字幕条（marquee）
- 详情页 Hero 缩放入场

## 目录结构

```
.
├── index.html             # 首页（杂志风）
├── destinations.html      # 目的地列表
├── detail.html            # 目的地详情（?id=xxx）
├── wishlist.html          # 心愿单
├── planner.html           # 行程规划器
└── assets/
    ├── css/
    │   ├── main.css       # 全局 / header / footer / 工具
    │   ├── home.css       # 首页
    │   ├── list.css       # 列表
    │   ├── detail.css     # 详情
    │   └── tools.css      # 心愿单 + 规划器
    ├── js/
    │   ├── ui.js          # 公共：header / reveal / counter / 卡片渲染 / 导航
    │   ├── features.js    # 主题 / 币种 / 心愿单 / 规划器 / Toast（跨页）
    │   ├── live.js        # Open-Meteo / REST Countries / 本地时间
    │   ├── home.js        # 首页专属逻辑
    │   ├── list.js        # 列表筛选 / URL 同步
    │   ├── detail.js      # 详情 + 实时数据拼装
    │   ├── wishlist.js    # 心愿单页
    │   └── planner.js     # 规划器页（含拖拽排序、导出）
    └── data/
        └── destinations.js # 8 个目的地 + 评价 + 编辑手记
```

## 本地预览

```bash
python3 -m http.server 8080
# 打开 http://localhost:8080
```

零依赖、零构建、零 API Key。所有数据接口都是公开且开放 CORS 的：
`api.open-meteo.com` · `restcountries.com` · `api.frankfurter.dev`。

## 致谢 / 版权

- 字体：Google Fonts 的 [Fraunces](https://fonts.google.com/specimen/Fraunces)
- 目的地图片：[Unsplash](https://unsplash.com/) 公开 CDN，版权归原作者
- 国旗图片：[FlagCDN](https://flagcdn.com/)（经 REST Countries 代理返回）
