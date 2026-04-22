// -------- 公共 UI 行为：header、reveal、counter、锚点、卡片渲染 --------
(function () {
  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const mode = header.dataset.headerMode || "auto";
    const apply = () => {
      if (mode === "solid") {
        header.classList.add("is-solid");
        header.classList.remove("is-transparent");
        return;
      }
      if (window.scrollY > 40) {
        header.classList.add("is-solid");
        header.classList.remove("is-transparent");
      } else {
        header.classList.remove("is-solid");
        header.classList.add("is-transparent");
      }
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
  }

  // 复用单一 IO，动态节点插入后调用 window.observeReveal(scope)
  let revealIO = null;
  function ensureRevealIO() {
    if (revealIO || !("IntersectionObserver" in window)) return revealIO;
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealIO.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    return revealIO;
  }
  function observeReveal(scope) {
    const root = scope || document;
    const nodes = root.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(n => n.classList.add("is-visible"));
      return;
    }
    const io = ensureRevealIO();
    nodes.forEach(n => io.observe(n));
  }
  window.observeReveal = observeReveal;

  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.counter);
      const duration = parseInt(el.dataset.duration || "1800", 10);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const startTime = performance.now();
      const step = (now) => {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = target * eased;
        el.textContent = decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toLocaleString("zh-CN");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    observeReveal();
    initCounters();
    initAnchors();
  });
})();

// -------- 杂志风目的地卡片 (editorial) --------
// variant: "plain" | "feature" | "tall"；index 用于编号、延迟
window.renderEditorialCard = function renderEditorialCard(d, index, variant) {
  const tagsHtml = d.themes.slice(0, 2).map(t => `<span class="chip">${t}</span>`).join("");
  const delay = typeof index === "number" ? (index * 80) : 0;
  const cls = ["ed-card", variant === "feature" ? "is-feature" : "", variant === "tall" ? "is-tall" : ""].join(" ");
  const idxTxt = String(index + 1).padStart(2, "0");
  return `
    <a class="${cls}" href="detail.html?id=${d.id}" data-reveal="up" style="--reveal-delay:${delay}ms" data-dest-id="${d.id}">
      <div class="media">
        <img src="${d.heroImage}" alt="${d.name}" loading="lazy" />
        <span class="corner">${d.region}</span>
        <span class="index">${idxTxt}</span>
      </div>
      <div class="info">
        <div class="place-meta">
          <span>${d.country} · ${d.duration}</span>
          <span class="rating">★ ${d.rating.toFixed(1)}</span>
        </div>
        <h3>${d.name}<em>.</em></h3>
        <p class="tagline">${d.tagline}</p>
        <div class="info-foot">
          <span class="price"><span data-price-cny="${d.priceFrom}">¥${d.priceFrom.toLocaleString("zh-CN")}</span> · 起</span>
          <span class="view">View —&gt;</span>
        </div>
      </div>
    </a>
  `;
};

// 公共头部/脚部渲染（统一 4 个页面的导航）
window.YY_renderChrome = function renderChrome(activePage) {
  const headerMode = activePage === "home" ? "auto" : "solid";
  const headerClass = activePage === "home" ? "is-transparent" : "is-solid";
  const nav = [
    { href: "index.html",        key: "home",     label: "首页" },
    { href: "destinations.html", key: "dest",     label: "目的地" },
    { href: "wishlist.html",     key: "wish",     label: "心愿单" },
    { href: "planner.html",      key: "plan",     label: "行程规划" },
  ];
  const navHtml = nav.map(n => `<a href="${n.href}" class="${n.key === activePage ? "is-active" : ""}">${n.label}</a>`).join("");

  const header = `
    <header class="site-header ${headerClass}" data-header-mode="${headerMode}">
      <div class="container">
        <a class="brand" href="index.html">
          <span class="brand-mark">Y</span>
          <span>YUNYOU · 云游</span>
        </a>
        <nav class="nav">${navHtml}</nav>
        <div class="header-tools">
          <select class="currency-select" data-currency-select aria-label="货币">
            <option value="CNY">CNY ¥</option>
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
            <option value="JPY">JPY ¥</option>
            <option value="GBP">GBP £</option>
            <option value="HKD">HKD</option>
          </select>
          <button class="tool-btn" data-theme-toggle aria-label="切换深色">☾</button>
          <a class="tool-btn" href="wishlist.html" aria-label="心愿单">
            ♡<span class="badge" data-wishlist-count>0</span>
          </a>
          <a class="tool-btn" href="planner.html" aria-label="行程规划">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 4h10M3 8h10M3 12h6"/></svg>
            <span class="badge" data-plan-count>0</span>
          </a>
          <button class="nav-toggle" aria-label="菜单"><span></span></button>
        </div>
      </div>
    </header>
  `;

  const footer = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a class="brand" href="index.html">
              <span class="brand-mark">Y</span>
              <span>YUNYOU · 云游</span>
            </a>
            <p>发现下一段值得出发的旅程。我们挑选最好看的目的地，写最有温度的攻略。</p>
            <div class="socials">
              <a href="#" aria-label="微博">W</a>
              <a href="#" aria-label="小红书">R</a>
              <a href="#" aria-label="Instagram">Ig</a>
              <a href="#" aria-label="YouTube">Yt</a>
            </div>
          </div>
          <div class="footer-cols">
            <div class="footer-col">
              <h4>探索</h4>
              <ul>
                <li><a href="destinations.html">全部目的地</a></li>
                <li><a href="destinations.html?theme=%E6%96%87%E5%8C%96">文化之旅</a></li>
                <li><a href="destinations.html?theme=%E8%87%AA%E7%84%B6">山野自然</a></li>
                <li><a href="destinations.html?theme=%E6%B5%B7%E5%B2%9B">海岛度假</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>工具</h4>
              <ul>
                <li><a href="wishlist.html">心愿单</a></li>
                <li><a href="planner.html">行程规划器</a></li>
                <li><a href="destinations.html">币种换算</a></li>
                <li><a href="destinations.html">天气预报</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>关于</h4>
              <ul>
                <li><a href="index.html">云游故事</a></li>
                <li><a href="#">编辑部</a></li>
                <li><a href="#">合作伙伴</a></li>
                <li><a href="#">联系我们</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 YUNYOU · 所有图片版权归原作者所有</span>
          <span>实时数据 · Open-Meteo · REST Countries · Frankfurter</span>
        </div>
      </div>
    </footer>
  `;

  // 插入到占位节点
  const headHost = document.querySelector("[data-chrome='header']");
  const footHost = document.querySelector("[data-chrome='footer']");
  if (headHost) headHost.outerHTML = header;
  if (footHost) footHost.outerHTML = footer;
};
