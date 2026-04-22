// -------- 首页专属逻辑 --------
(function () {
  // Hero 共享容器 Ken Burns；图层只做 opacity crossfade（修复割裂缩放问题）
  function initHeroSlideshow() {
    const wrap = document.querySelector(".hero-bg-wrap");
    if (!wrap) return;
    const pool = window.DESTINATIONS.slice(0, 5).map(d => d.heroImage);
    pool.forEach((src, idx) => {
      const div = document.createElement("div");
      div.className = "hero-bg" + (idx === 0 ? " is-current" : "");
      div.style.backgroundImage = `url("${src}")`;
      wrap.appendChild(div);
    });
    const items = wrap.querySelectorAll(".hero-bg");
    if (items.length <= 1) return;
    let cur = 0;
    setInterval(() => {
      items[cur].classList.remove("is-current");
      cur = (cur + 1) % items.length;
      items[cur].classList.add("is-current");
    }, 6000);
  }

  // 主题（编号 01-04）
  const THEMES = [
    { n: "01", key: "文化", title: "文化之旅", desc: "古城、寺庙、博物馆与民艺。走进一个城市的古老心跳。",
      img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80" },
    { n: "02", key: "海岛", title: "海岛叙事", desc: "蓝到极致的海、白到发光的屋。为日落留一张空椅子。",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
    { n: "03", key: "自然", title: "山野与荒原", desc: "冰川、森林、峡湾、火山。把呼吸交给一片旷野。",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" },
    { n: "04", key: "美食", title: "餐桌旅行", desc: "从街边夜市到米其林餐桌。用舌尖认识一座城。",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" },
  ];
  function initThemes() {
    const rail = document.querySelector("[data-themes]");
    if (!rail) return;
    rail.innerHTML = THEMES.map((t, i) => `
      <a class="theme-card" href="destinations.html?theme=${encodeURIComponent(t.key)}"
         data-reveal="up" style="--img:url('${t.img}'); --reveal-delay:${i * 80}ms">
        <span class="t-num">${t.n}</span>
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
        <span class="t-arrow">查看系列
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M0 5h14m0 0L10 1m4 4l-4 4"/></svg>
        </span>
      </a>
    `).join("");
  }

  // 精选目的地：非对称网格 1 大 + 2 小 + 3 等分 = 6 张
  function initFeatured() {
    const grid = document.querySelector("[data-featured]");
    if (!grid) return;
    const pick = window.DESTINATIONS.slice(0, 6);
    const variants = ["feature", "plain", "plain", "plain", "plain", "plain"];
    grid.innerHTML = pick.map((d, i) => window.renderEditorialCard(d, i, variants[i])).join("");
  }

  // 编辑手记
  function initJournal() {
    const list = document.querySelector("[data-journal]");
    if (!list || !window.JOURNAL) return;
    list.innerHTML = window.JOURNAL.map((j, i) => `
      <div class="journal-item" data-reveal="up" style="--reveal-delay:${i * 80}ms">
        <div>
          <span class="jm-num">${String(i + 1).padStart(2, "0")}</span>
          <h3 class="jm-title">${j.title}</h3>
        </div>
        <p class="jm-excerpt">${j.excerpt}</p>
        <div class="jm-right">
          <div class="jm-meta">${j.author}<br/>${j.readTime}</div>
          <img class="jm-thumb" src="${j.image}" alt="${j.title}" loading="lazy"
               onerror="this.onerror=null;this.style.background='var(--c-bg-soft)'" />
        </div>
      </div>
    `).join("");
  }

  // 评价
  function initTestimonials() {
    const grid = document.querySelector("[data-testimonials]");
    if (!grid) return;
    grid.innerHTML = window.TESTIMONIALS.map((t, i) => `
      <div class="testimonial" data-reveal="up" style="--reveal-delay:${i * 100}ms">
        <div class="stars">${"★".repeat(t.rating)}</div>
        <blockquote>${t.text}</blockquote>
        <div class="person">
          <img src="${t.avatar}" alt="${t.name}" loading="lazy"
               onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'" />
          <div>
            <div class="name">${t.name}</div>
            <div class="role">${t.role}</div>
          </div>
        </div>
      </div>
    `).join("");
  }

  // marquee（滚动字带）
  function initMarquee() {
    const track = document.querySelector("[data-marquee]");
    if (!track) return;
    const items = [
      "Curated by travelers",
      "<em>Written by editors</em>",
      "Photographed on film",
      "<em>Since 2019</em>",
      "128 destinations",
      "<em>36 countries</em>",
    ];
    const piece = items.map(t => `<span>${t}<span class="dot"></span></span>`).join("");
    track.innerHTML = piece + piece;
  }

  // 搜索 & 订阅
  function initForms() {
    const heroForm = document.querySelector("[data-hero-search]");
    if (heroForm) {
      heroForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(heroForm);
        const qs = new URLSearchParams();
        const q = (fd.get("q") || "").toString().trim();
        const region = (fd.get("region") || "").toString();
        const theme = (fd.get("theme") || "").toString();
        if (q) qs.set("q", q);
        if (region) qs.set("region", region);
        if (theme) qs.set("theme", theme);
        window.location.href = "destinations.html" + (qs.toString() ? "?" + qs.toString() : "");
      });
    }
    const newsletter = document.querySelector("[data-newsletter]");
    if (newsletter) {
      newsletter.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = newsletter.querySelector("input[type=email]");
        if (!input.value) return;
        window.YY_Toast("订阅成功，下周三见。");
        input.value = "";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.YY_renderChrome("home");
    initHeroSlideshow();
    initMarquee();
    initThemes();
    initFeatured();
    initJournal();
    initTestimonials();
    initForms();
    if (window.observeReveal) window.observeReveal();
  });
})();
