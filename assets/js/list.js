// -------- 列表页逻辑 --------
(function () {
  const state = {
    q: "",
    region: "",
    theme: "",
    sort: "recommend",
  };

  function readQuery() {
    const p = new URLSearchParams(window.location.search);
    state.q = p.get("q") || "";
    state.region = p.get("region") || "";
    state.theme = p.get("theme") || "";
    state.sort = p.get("sort") || "recommend";
  }

  function writeQuery() {
    const p = new URLSearchParams();
    if (state.q) p.set("q", state.q);
    if (state.region) p.set("region", state.region);
    if (state.theme) p.set("theme", state.theme);
    if (state.sort && state.sort !== "recommend") p.set("sort", state.sort);
    const next = p.toString();
    const url = window.location.pathname + (next ? "?" + next : "");
    window.history.replaceState({}, "", url);
  }

  function applyFilters() {
    let items = window.DESTINATIONS.slice();
    if (state.q) {
      const q = state.q.toLowerCase();
      items = items.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.themes.some(t => t.toLowerCase().includes(q))
      );
    }
    if (state.region) items = items.filter(d => d.region === state.region);
    if (state.theme) items = items.filter(d => d.themes.includes(state.theme));
    switch (state.sort) {
      case "price-asc": items.sort((a, b) => a.priceFrom - b.priceFrom); break;
      case "price-desc": items.sort((a, b) => b.priceFrom - a.priceFrom); break;
      case "rating": items.sort((a, b) => b.rating - a.rating); break;
      case "reviews": items.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }
    return items;
  }

  function render() {
    const grid = document.querySelector("[data-dest-grid]");
    const meta = document.querySelector("[data-result-meta]");
    const items = applyFilters();
    if (meta) {
      const parts = [];
      if (state.region) parts.push(state.region);
      if (state.theme) parts.push(state.theme);
      if (state.q) parts.push(`“${state.q}”`);
      meta.innerHTML = `共 <strong>${items.length}</strong> 个目的地${parts.length ? " · " + parts.join(" · ") : ""}`;
    }
    if (!grid) return;
    if (!items.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>这里暂时空空如也</h3>
          <p>调整筛选条件，或 <a href="destinations.html">查看全部目的地</a></p>
        </div>
      `;
      return;
    }
    grid.innerHTML = items.map((d, i) => window.renderEditorialCard(d, i, "plain")).join("");
    if (window.observeReveal) window.observeReveal(grid);
    if (window.YY_Currency) window.YY_Currency.applyAll();
  }

  function initControls() {
    const searchInput = document.querySelector("[data-filter-search]");
    const regionSel = document.querySelector("[data-filter-region]");
    const sortSel = document.querySelector("[data-filter-sort]");
    const chipWrap = document.querySelector("[data-filter-themes]");
    const themes = ["", "文化", "海岛", "自然", "美食", "探险", "浪漫", "放松", "雪山", "极光", "摄影", "城市", "徒步", "历史"];
    if (chipWrap) {
      chipWrap.innerHTML = themes.map(t => `
        <button type="button" data-theme="${t}" class="${state.theme === t ? "is-active" : ""}">
          ${t || "全部主题"}
        </button>
      `).join("");
      chipWrap.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-theme]");
        if (!btn) return;
        state.theme = btn.dataset.theme;
        chipWrap.querySelectorAll("button").forEach(b => b.classList.toggle("is-active", b.dataset.theme === state.theme));
        writeQuery();
        render();
      });
    }
    if (searchInput) {
      searchInput.value = state.q;
      let t;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(t);
        t = setTimeout(() => {
          state.q = e.target.value;
          writeQuery();
          render();
        }, 220);
      });
    }
    if (regionSel) {
      regionSel.value = state.region;
      regionSel.addEventListener("change", (e) => { state.region = e.target.value; writeQuery(); render(); });
    }
    if (sortSel) {
      sortSel.value = state.sort;
      sortSel.addEventListener("change", (e) => { state.sort = e.target.value; writeQuery(); render(); });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.YY_renderChrome("dest");
    readQuery();
    initControls();
    render();
    if (window.YY_Currency) window.YY_Currency.onChange(() => window.YY_Currency.applyAll());
  });
})();
