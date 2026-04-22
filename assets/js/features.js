// -------- 跨页面通用特性：主题、币种、心愿单、规划器、Toast --------

// -------- theme (dark mode) --------
(function () {
  const KEY = "yy.theme";
  const apply = (t) => {
    if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  };
  const saved = localStorage.getItem(KEY);
  if (saved) apply(saved);
  window.YY_Theme = {
    toggle() {
      const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = cur === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      apply(next);
      return next;
    },
    current() { return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  };
})();

// -------- toast --------
(function () {
  function ensureHost() {
    let h = document.querySelector(".toast-host");
    if (!h) {
      h = document.createElement("div");
      h.className = "toast-host";
      document.body.appendChild(h);
    }
    return h;
  }
  window.YY_Toast = function (msg) {
    const host = ensureHost();
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  };
})();

// -------- currency (Frankfurter) --------
// 免费、无 key、支持 CORS，基础货币 CNY。失败时退回静态汇率表。
(function () {
  const KEY_CUR = "yy.currency";
  const KEY_RATES = "yy.rates";
  const TTL = 6 * 60 * 60 * 1000;
  const FALLBACK = { CNY: 1, USD: 0.14, EUR: 0.13, JPY: 21, GBP: 0.11, HKD: 1.08 };
  const SYMBOLS = { CNY: "¥", USD: "$", EUR: "€", JPY: "¥", GBP: "£", HKD: "HK$" };

  let state = {
    currency: localStorage.getItem(KEY_CUR) || "CNY",
    rates: null,
    listeners: [],
  };
  try {
    const cached = JSON.parse(localStorage.getItem(KEY_RATES) || "null");
    if (cached && Date.now() - cached.ts < TTL) state.rates = cached.rates;
  } catch (e) {}

  async function fetchRates() {
    try {
      const res = await fetch("https://api.frankfurter.dev/v1/latest?base=CNY&symbols=USD,EUR,JPY,GBP,HKD");
      if (!res.ok) throw new Error("bad");
      const data = await res.json();
      const rates = Object.assign({ CNY: 1 }, data.rates || {});
      state.rates = rates;
      localStorage.setItem(KEY_RATES, JSON.stringify({ ts: Date.now(), rates }));
    } catch (e) {
      state.rates = state.rates || FALLBACK;
    }
    notify();
  }
  function notify() { state.listeners.forEach(fn => { try { fn(state.currency); } catch (e) {} }); }

  function convert(cnyAmount, target) {
    const cur = target || state.currency;
    const rates = state.rates || FALLBACK;
    const r = rates[cur] || FALLBACK[cur] || 1;
    return cnyAmount * r;
  }
  function format(cnyAmount, target) {
    const cur = target || state.currency;
    const v = convert(cnyAmount, cur);
    const sym = SYMBOLS[cur] || "";
    let display;
    if (cur === "JPY") display = Math.round(v).toLocaleString("en-US");
    else if (v >= 1000) display = Math.round(v).toLocaleString("en-US");
    else display = v.toFixed(2);
    return sym + display;
  }
  function setCurrency(code) {
    if (!SYMBOLS[code]) return;
    state.currency = code;
    localStorage.setItem(KEY_CUR, code);
    applyAll();
    notify();
  }
  function applyAll() {
    document.querySelectorAll("[data-price-cny]").forEach(el => {
      const amt = parseFloat(el.dataset.priceCny);
      if (!isNaN(amt)) el.textContent = format(amt);
    });
  }
  function onChange(fn) { state.listeners.push(fn); }

  window.YY_Currency = {
    current: () => state.currency,
    set: setCurrency,
    format,
    convert,
    onChange,
    applyAll,
  };

  // 初始化：先渲染（用缓存或 fallback），再异步拉取最新汇率
  document.addEventListener("DOMContentLoaded", () => {
    applyAll();
    fetchRates().then(applyAll);
  });
})();

// -------- wishlist --------
(function () {
  const KEY = "yy.wishlist";
  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch (e) { return []; }
  };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));
  const listeners = [];
  function notify() {
    const arr = load();
    listeners.forEach(fn => { try { fn(arr); } catch (e) {} });
    updateBadge(arr.length);
  }
  function updateBadge(n) {
    document.querySelectorAll("[data-wishlist-count]").forEach(el => {
      el.textContent = n;
      el.classList.toggle("is-on", n > 0);
    });
  }
  window.YY_Wishlist = {
    list: load,
    has: (id) => load().includes(id),
    toggle(id) {
      const arr = load();
      const idx = arr.indexOf(id);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(id);
      save(arr);
      notify();
      return arr.includes(id);
    },
    remove(id) {
      const arr = load().filter(x => x !== id);
      save(arr);
      notify();
    },
    clear() { save([]); notify(); },
    onChange(fn) { listeners.push(fn); fn(load()); },
  };
  document.addEventListener("DOMContentLoaded", () => notify());
})();

// -------- planner --------
(function () {
  const KEY = "yy.plan";
  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch (e) { return []; }
  };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));
  const listeners = [];
  function notify() {
    const arr = load();
    listeners.forEach(fn => { try { fn(arr); } catch (e) {} });
    updateBadge(arr.length);
  }
  function updateBadge(n) {
    document.querySelectorAll("[data-plan-count]").forEach(el => {
      el.textContent = n;
      el.classList.toggle("is-on", n > 0);
    });
  }
  window.YY_Plan = {
    list: load,
    has(id) { return load().some(x => x.id === id); },
    add(id, days) {
      const arr = load();
      if (arr.some(x => x.id === id)) return false;
      arr.push({ id, days: days || 4 });
      save(arr);
      notify();
      return true;
    },
    remove(id) {
      save(load().filter(x => x.id !== id));
      notify();
    },
    setDays(id, days) {
      const arr = load();
      const it = arr.find(x => x.id === id);
      if (!it) return;
      it.days = Math.max(1, Math.min(60, Number(days) || 4));
      save(arr);
      notify();
    },
    reorder(newIds) {
      const arr = load();
      const map = new Map(arr.map(x => [x.id, x]));
      save(newIds.filter(id => map.has(id)).map(id => map.get(id)));
      notify();
    },
    clear() { save([]); notify(); },
    onChange(fn) { listeners.push(fn); fn(load()); },
  };
  document.addEventListener("DOMContentLoaded", () => notify());
})();

// -------- header tools (theme toggle + currency select + badges) --------
document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    const sync = () => {
      themeBtn.innerHTML = window.YY_Theme.current() === "dark" ? "☀" : "☾";
      themeBtn.setAttribute("aria-label", window.YY_Theme.current() === "dark" ? "切换浅色" : "切换深色");
    };
    sync();
    themeBtn.addEventListener("click", () => { window.YY_Theme.toggle(); sync(); });
  }
  const curSel = document.querySelector("[data-currency-select]");
  if (curSel) {
    curSel.value = window.YY_Currency.current();
    curSel.addEventListener("change", (e) => {
      window.YY_Currency.set(e.target.value);
      window.YY_Toast(`货币已切换到 ${e.target.value}`);
    });
  }
});
