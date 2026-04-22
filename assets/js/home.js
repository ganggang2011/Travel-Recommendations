// -------- 首页专属逻辑 --------
(function () {
  // 首屏背景轮播（Ken Burns 效果）
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
    }, 5000);
  }

  // Hero 主标题按词入场
  function initHeroTitle() {
    const el = document.querySelector("[data-hero-title]");
    if (!el) return;
    const words = el.textContent.trim().split("");
    el.innerHTML = "";
    words.forEach((w, i) => {
      const s = document.createElement("span");
      s.textContent = w === " " ? "\u00A0" : w;
      s.style.animationDelay = (i * 40) + "ms";
      el.appendChild(s);
    });
  }

  // 主题卡
  const THEMES = [
    { key: "文化", title: "文化之旅", desc: "古城、博物馆与手作", img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80" },
    { key: "海岛", title: "海岛度假", desc: "沙滩、潜水与日落", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
    { key: "自然", title: "山野自然", desc: "徒步、冰川与森林", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80" },
    { key: "美食", title: "美食朝圣", desc: "市场、街边与星级", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80" },
  ];
  function initThemes() {
    const grid = document.querySelector("[data-themes]");
    if (!grid) return;
    grid.innerHTML = THEMES.map((t, i) => `
      <a class="theme-card" href="destinations.html?theme=${encodeURIComponent(t.key)}" data-reveal="up" style="--img:url('${t.img}'); --reveal-delay:${i * 90}ms">
        <span class="arrow">→</span>
        <div class="content">
          <h3>${t.title}</h3>
          <p>${t.desc}</p>
        </div>
      </a>
    `).join("");
  }

  // 精选目的地
  function initFeatured() {
    const grid = document.querySelector("[data-featured]");
    if (!grid) return;
    const pick = window.DESTINATIONS.slice(0, 6);
    grid.innerHTML = pick.map((d, i) => window.renderDestinationCard(d, i)).join("");
  }

  // 用户评价
  function initTestimonials() {
    const grid = document.querySelector("[data-testimonials]");
    if (!grid) return;
    grid.innerHTML = window.TESTIMONIALS.map((t, i) => `
      <div class="testimonial" data-reveal="up" style="--reveal-delay:${i * 120}ms">
        <span class="quote-mark">“</span>
        <div class="stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
        <p>${t.text}</p>
        <div class="person">
          <img src="${t.avatar}" alt="${t.name}" loading="lazy" />
          <div>
            <div class="name">${t.name}</div>
            <div class="role">${t.role}</div>
          </div>
        </div>
      </div>
    `).join("");
  }

  // 搜索表单 → 跳到列表页
  function initSearchForms() {
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
        const btn = newsletter.querySelector("button");
        if (!input.value) return;
        btn.textContent = "订阅成功 ✓";
        btn.style.background = "#34d399";
        btn.style.color = "#fff";
        input.value = "";
        setTimeout(() => {
          btn.textContent = "立即订阅";
          btn.style.background = "";
          btn.style.color = "";
        }, 2400);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeroSlideshow();
    initHeroTitle();
    initThemes();
    initFeatured();
    initTestimonials();
    initSearchForms();
  });
})();
