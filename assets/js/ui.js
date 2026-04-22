// -------- 公共交互与动画 --------
(function () {
  // 滚动时切换 header 的透明/实心样式
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

  // 滚动进入视口触发动画
  function initReveal() {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(n => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    nodes.forEach(n => io.observe(n));
  }

  // 数字计数器动画
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.counter);
      const duration = parseInt(el.dataset.duration || "1600", 10);
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

  // 页面载入淡入
  function initPageIn() {
    document.body.classList.add("page-in");
  }

  // 页内锚点点击平滑滚动（对浏览器默认 smooth 的兜底）
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
    initReveal();
    initCounters();
    initPageIn();
    initAnchors();
  });
})();

// 通用卡片渲染，供列表页/首页/相关目的地使用
window.renderDestinationCard = function renderDestinationCard(d, index) {
  const priceTxt = `¥${d.priceFrom.toLocaleString("zh-CN")} 起`;
  const tagsHtml = d.themes.map(t => `<span class="chip">${t}</span>`).join("");
  const delay = typeof index === "number" ? (index * 80) : 0;
  return `
    <a class="dest-card" href="detail.html?id=${d.id}" data-reveal="up" style="--reveal-delay:${delay}ms">
      <div class="dest-card-media">
        <img src="${d.heroImage}" alt="${d.name}" loading="lazy" />
        <span class="price-tag">${priceTxt}</span>
        <button class="fav" aria-label="收藏" onclick="event.preventDefault();event.stopPropagation();this.classList.toggle('is-on');this.innerHTML=this.classList.contains('is-on')?'&#10084;':'&#9825;'">&#9825;</button>
      </div>
      <div class="dest-card-body">
        <div class="dest-card-meta">
          <span>${d.country} · ${d.region}</span>
          <span class="rating">★ ${d.rating} <small style="color:var(--c-text-mute);font-weight:400">(${d.reviews.toLocaleString("zh-CN")})</small></span>
        </div>
        <h3>${d.name}</h3>
        <p class="tagline">${d.tagline}</p>
        <div class="dest-card-tags">${tagsHtml}</div>
      </div>
    </a>
  `;
};
