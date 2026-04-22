// -------- 详情页逻辑 --------
(function () {
  function getId() {
    const p = new URLSearchParams(window.location.search);
    return p.get("id") || "kyoto";
  }

  function findDest(id) {
    return window.DESTINATIONS.find(d => d.id === id) || window.DESTINATIONS[0];
  }

  function renderHero(d) {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    hero.style.setProperty("--hero-img", `url("${d.heroImage}")`);
    hero.querySelector("[data-title]").textContent = d.name;
    hero.querySelector("[data-tagline]").textContent = d.tagline;
    hero.querySelector("[data-meta]").innerHTML = `
      <span>📍 ${d.country} · ${d.region}</span>
      <span class="sep">·</span>
      <span>⭐ ${d.rating} (${d.reviews.toLocaleString("zh-CN")} 条评价)</span>
      <span class="sep">·</span>
      <span>⏱ 建议 ${d.duration}</span>
      <span class="sep">·</span>
      <span>🗓 ${d.bestSeason}</span>
    `;
    hero.querySelector("[data-crumb-name]").textContent = d.name;
    document.title = `${d.name} · 云游`;
  }

  function renderGallery(d) {
    const wrap = document.querySelector("[data-gallery]");
    if (!wrap) return;
    wrap.innerHTML = d.gallery.map((src, i) => `
      <figure data-reveal="${i === 0 ? "scale" : "up"}" style="--reveal-delay:${i * 80}ms">
        <img src="${src}" alt="${d.name} 图集 ${i + 1}" loading="lazy" />
      </figure>
    `).join("");
  }

  function renderDescription(d) {
    const el = document.querySelector("[data-description]");
    if (el) el.textContent = d.description;
  }

  function renderHighlights(d) {
    const ul = document.querySelector("[data-highlights]");
    if (!ul) return;
    ul.innerHTML = d.highlights.map((h, i) => `
      <li data-reveal="left" style="--reveal-delay:${i * 80}ms">
        <span class="dot">${i + 1}</span>
        <span>${h}</span>
      </li>
    `).join("");
  }

  function renderItinerary(d) {
    const wrap = document.querySelector("[data-itinerary]");
    if (!wrap) return;
    wrap.innerHTML = d.itinerary.map((it, i) => `
      <div class="itinerary-item" data-reveal="left" style="--reveal-delay:${i * 100}ms">
        <span class="day-label">Day ${it.day}</span>
        <h3>${it.title}</h3>
        <p>${it.detail}</p>
      </div>
    `).join("");
  }

  function renderBooking(d) {
    const box = document.querySelector("[data-booking]");
    if (!box) return;
    box.querySelector("[data-price]").textContent = "¥" + d.priceFrom.toLocaleString("zh-CN");
    box.querySelector("[data-rating]").textContent = d.rating.toFixed(1);
    box.querySelector("[data-reviews]").textContent = d.reviews.toLocaleString("zh-CN");
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 8);
    const pad = n => String(n).padStart(2, "0");
    const iso = `${nextMonth.getFullYear()}-${pad(nextMonth.getMonth() + 1)}-${pad(nextMonth.getDate())}`;
    const dateInput = box.querySelector("input[type=date]");
    if (dateInput) dateInput.value = iso;
    const form = box.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.textContent = "预订成功 ✓";
      btn.style.background = "#10b981";
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
      }, 2400);
    });
  }

  function renderRelated(d) {
    const wrap = document.querySelector("[data-related]");
    if (!wrap) return;
    const related = window.DESTINATIONS
      .filter(x => x.id !== d.id)
      .filter(x => x.themes.some(t => d.themes.includes(t)) || x.region === d.region)
      .slice(0, 3);
    const list = related.length ? related : window.DESTINATIONS.filter(x => x.id !== d.id).slice(0, 3);
    wrap.innerHTML = list.map((x, i) => window.renderDestinationCard(x, i)).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const id = getId();
    const d = findDest(id);
    renderHero(d);
    renderGallery(d);
    renderDescription(d);
    renderHighlights(d);
    renderItinerary(d);
    renderBooking(d);
    renderRelated(d);
    // 渲染后重新 observe 动画节点
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach(n => io.observe(n));
    }
  });
})();
