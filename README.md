# 云游 Yunyou · 旅游推荐静态网站

一个纯前端、零构建的旅游推荐网站，用原生 HTML / CSS / JavaScript 实现。

## 特性

- **多页面架构**：首页、目的地列表页、目的地详情页。
- **响应式设计**：桌面 / 平板 / 手机自适应。
- **丰富动画**：
  - Hero 背景 Ken Burns 缓动 + 多图轮播
  - 标题逐字飞入
  - 滚动进入视口 (IntersectionObserver) 的多方向 reveal 动画
  - 数字计数器动画
  - CSS 视差横幅（`background-attachment: fixed`）
  - 卡片悬停放大、主题卡悬停显影
  - 渐变按钮、成功反馈动画
  - 页面载入淡入
- **交互功能**：
  - 搜索 + 区域 / 主题筛选 + 价格 / 评分排序
  - URL 同步查询参数（可分享筛选结果）
  - 详情页动态渲染、日期预订表单
  - 相关目的地智能推荐
- **零依赖**：没有打包器、没有框架，直接打开 `index.html` 就能用。

## 目录结构

```
.
├── index.html              # 首页
├── destinations.html       # 目的地列表
├── detail.html             # 目的地详情（通过 ?id=xxx 跳转）
└── assets/
    ├── css/
    │   ├── main.css        # 全局样式 / header / footer / 通用组件
    │   ├── home.css        # 首页专属
    │   ├── list.css        # 列表页专属
    │   └── detail.css      # 详情页专属
    ├── js/
    │   ├── ui.js           # 公共：header、reveal、counter、card 渲染
    │   ├── home.js         # 首页：Hero 轮播、主题、精选、评价、搜索
    │   ├── list.js         # 列表：筛选 / 搜索 / 排序 / URL 同步
    │   └── detail.js       # 详情：读 id、渲染、预订表单、相关推荐
    └── data/
        └── destinations.js # 数据：8 个目的地 + 评价
```

## 本地预览

直接用任意静态服务器：

```bash
python3 -m http.server 8080
# 打开 http://localhost:8080
```

或用 VSCode Live Server 打开 `index.html`。

## 图片来源

目的地及头像图片均来自 [Unsplash](https://unsplash.com/) 的公开 CDN，版权归原作者。
