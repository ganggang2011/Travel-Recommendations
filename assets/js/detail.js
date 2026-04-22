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
    hero.querySelector("[data-title]").innerHTML = d.name + "<em>.</em>";
    hero.querySelector("[data-tagline]").textContent = d.tagline;
    hero.querySelector("[data-eyebrow]").textContent = `${d.country} · ${d.region}`;
    hero.querySelector("[data-meta]").innerHTML = `
      <div class="cell"><span class="k">评分</span><span class="v">★ ${d.rating.toFixed(1)}</span></div>
      <div class="cell"><span class="k">建议</span><span class="v">${d.duration}</span></div>
      <div class="cell"><span class="k">最佳</span><span class="v">${d.bestSeason}</span></div>
      <div class="cell"><span class="k">评价</span><span class="v">${d.reviews.toLocaleString("zh-CN")}</span></div>
    `;
    const crumb = hero.querySelector("[data-crumb-name]");
    if (crumb) crumb.textContent = d.name;
    document.title = `${d.name} · 云游`;

    // Hero 收藏按钮
    const favBtn = hero.querySelector("[data-hero-fav]");
    if (favBtn) {
      const sync = () => {
        const on = window.YY_Wishlist.has(d.id);
        favBtn.classList.toggle("is-on", on);
        favBtn.innerHTML = on ? "♥" : "♡";
        favBtn.setAttribute("aria-label", on ? "已加入心愿单" : "加入心愿单");
      };
      sync();
      favBtn.addEventListener("click", () => {
        const now = window.YY_Wishlist.toggle(d.id);
        sync();
        window.YY_Toast(now ? `已加入心愿单：${d.name}` : `已移出心愿单：${d.name}`);
      });
    }
  }

  function renderGallery(d) {
    const wrap = document.querySelector("[data-gallery]");
    if (!wrap) return;
    const fallback = d.heroImage.replace(/&w=\d+/, "&w=1200");
    wrap.innerHTML = d.gallery.map((src, i) => `
      <figure data-reveal="${i === 0 ? "scale" : "up"}" style="--reveal-delay:${i * 80}ms">
        <img src="${src}" alt="${d.name} 图集 ${i + 1}" loading="lazy"
             onerror="this.onerror=null;this.src='${fallback}'" />
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
      <li data-reveal="up" style="--reveal-delay:${i * 60}ms">
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <span class="txt">${h}</span>
      </li>
    `).join("");
  }

  function renderItinerary(d) {
    const wrap = document.querySelector("[data-itinerary]");
    if (!wrap) return;
    wrap.innerHTML = d.itinerary.map((it, i) => `
      <div class="itinerary-item" data-reveal="up" style="--reveal-delay:${i * 80}ms">
        <div class="day-col"><small>Day</small>${it.day}</div>
        <div>
          <h3>${it.title}</h3>
          <p>${it.detail}</p>
        </div>
      </div>
    `).join("");
  }

  function renderBooking(d) {
    const box = document.querySelector("[data-booking]");
    if (!box) return;
    box.querySelector("[data-price]").setAttribute("data-price-cny", d.priceFrom);
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
      setTimeout(() => { btn.textContent = original; }, 2200);
      window.YY_Toast("行程已锁定，稍后客服将联系你");
    });

    // 加入心愿单
    const wishBtn = box.querySelector("[data-add-wish]");
    const planBtn = box.querySelector("[data-add-plan]");
    if (wishBtn) {
      const sync = () => {
        const on = window.YY_Wishlist.has(d.id);
        wishBtn.classList.toggle("is-on", on);
        wishBtn.innerHTML = on ? "♥ 已收藏" : "♡ 收藏";
      };
      sync();
      wishBtn.addEventListener("click", () => {
        const now = window.YY_Wishlist.toggle(d.id);
        sync();
        window.YY_Toast(now ? "已加入心愿单" : "已移出心愿单");
      });
    }
    if (planBtn) {
      const sync = () => {
        const on = window.YY_Plan.has(d.id);
        planBtn.classList.toggle("is-on", on);
        planBtn.innerHTML = on ? "✓ 已加入行程" : "＋ 加入行程";
      };
      sync();
      planBtn.addEventListener("click", () => {
        if (window.YY_Plan.has(d.id)) {
          window.YY_Plan.remove(d.id);
          window.YY_Toast("已从行程中移除");
        } else {
          window.YY_Plan.add(d.id, parseInt(d.duration, 10) || 4);
          window.YY_Toast(`已加入行程规划：${d.name}`);
        }
        sync();
      });
    }

    if (window.YY_Currency) window.YY_Currency.applyAll();
  }

  function renderRelated(d) {
    const wrap = document.querySelector("[data-related]");
    if (!wrap) return;
    const related = window.DESTINATIONS
      .filter(x => x.id !== d.id)
      .filter(x => x.themes.some(t => d.themes.includes(t)) || x.region === d.region)
      .slice(0, 3);
    const list = related.length ? related : window.DESTINATIONS.filter(x => x.id !== d.id).slice(0, 3);
    wrap.innerHTML = list.map((x, i) => window.renderEditorialCard(x, i, "plain")).join("");
    if (window.YY_Currency) window.YY_Currency.applyAll();
  }

  // -------- 实时数据：天气 + 国家 + 本地时间 --------
  function renderLivePanel(d) {
    // 本地时间：立即渲染并每 30s 刷新
    const tEl = document.querySelector("[data-local-time]");
    const dEl = document.querySelector("[data-local-date]");
    function tick() {
      if (tEl) tEl.textContent = window.YY_Live.formatLocalTime(d.timezone);
      if (dEl) dEl.textContent = window.YY_Live.formatLocalDate(d.timezone);
    }
    tick();
    setInterval(tick, 30 * 1000);

    // 天气
    const wxCell = document.querySelector("[data-weather]");
    const wxDays = document.querySelector("[data-weather-days]");
    const wxSub = document.querySelector("[data-weather-sub]");
    if (wxCell) {
      wxCell.innerHTML = `<span class="v">— <span class="unit">°C</span></span>`;
    }
    window.YY_Live.fetchWeather(d.lat, d.lng, d.timezone).then(data => {
      const cur = data.current || {};
      const sym = window.YY_Live.wmo(cur.weather_code);
      if (wxCell) {
        wxCell.innerHTML = `<span class="v">${Math.round(cur.temperature_2m)}<span class="unit">°C</span></span>`;
      }
      if (wxSub) {
        wxSub.textContent = `${sym.i} ${sym.t} · 湿度 ${cur.relative_humidity_2m}% · 风 ${Math.round(cur.wind_speed_10m)} km/h`;
      }
      if (wxDays && data.daily && data.daily.time) {
        const rows = data.daily.time.map((iso, i) => {
          const s = window.YY_Live.wmo(data.daily.weather_code[i]);
          const tmax = Math.round(data.daily.temperature_2m_max[i]);
          const tmin = Math.round(data.daily.temperature_2m_min[i]);
          const day = window.YY_Live.shortDay(iso, d.timezone);
          return `<div class="wx-day"><div class="d">${day}</div><div class="ic">${s.i}</div><div class="t">${tmax}°/${tmin}°</div></div>`;
        }).join("");
        wxDays.innerHTML = rows;
      }
    }).catch(() => {
      if (wxSub) wxSub.textContent = "天气数据暂不可用";
    });

    // 国家信息
    const flagCell = document.querySelector("[data-country-flag]");
    const flagSub = document.querySelector("[data-country-sub]");
    const curCell = document.querySelector("[data-country-currency]");
    const curSub = document.querySelector("[data-country-currency-sub]");
    window.YY_Live.fetchCountry(d.countryCode).then(c => {
      if (flagCell) {
        const flagUrl = (c.flags && (c.flags.svg || c.flags.png)) || "";
        flagCell.innerHTML = `
          ${flagUrl ? `<img src="${flagUrl}" alt="${d.country} 国旗" />` : ""}
          <div style="display:flex;flex-direction:column;gap:2px;">
            <span class="v" style="font-size:20px;">${c.name && (c.name.common || d.country)}</span>
            <span class="sub">首都 ${(c.capital && c.capital[0]) || "—"} · 人口 ${((c.population || 0) / 1e6).toFixed(1)}M</span>
          </div>
        `;
      }
      if (flagSub) {
        const langs = c.languages ? Object.values(c.languages).slice(0, 2).join(" / ") : "";
        flagSub.textContent = langs;
      }
      if (curCell && c.currencies) {
        const code = Object.keys(c.currencies)[0];
        const info = c.currencies[code];
        curCell.innerHTML = `<span class="v">${info.symbol || ""} <em>${code}</em></span>`;
        if (curSub) curSub.textContent = info.name || "";
      }
    }).catch(() => {
      if (flagCell) flagCell.innerHTML = `<span class="v">${d.country}</span>`;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.YY_renderChrome("dest");
    const id = getId();
    const d = findDest(id);
    renderHero(d);
    renderGallery(d);
    renderDescription(d);
    renderHighlights(d);
    renderItinerary(d);
    renderBooking(d);
    renderRelated(d);
    renderLivePanel(d);
    if (window.observeReveal) window.observeReveal();
    if (window.YY_Currency) window.YY_Currency.onChange(() => window.YY_Currency.applyAll());
  });
})();
