// -------- 心愿单页 --------
(function () {
  function render() {
    const ids = window.YY_Wishlist.list();
    const grid = document.querySelector("[data-wish-grid]");
    const empty = document.querySelector("[data-wish-empty]");
    const count = document.querySelector("[data-wish-total]");
    const items = ids.map(id => window.DESTINATIONS.find(d => d.id === id)).filter(Boolean);
    if (count) count.textContent = items.length;
    if (!items.length) {
      if (grid) grid.style.display = "none";
      if (empty) empty.style.display = "block";
      return;
    }
    if (grid) {
      grid.style.display = "grid";
      grid.innerHTML = items.map((d, i) => window.renderEditorialCard(d, i, "plain")).join("");
    }
    if (empty) empty.style.display = "none";
    if (window.observeReveal) window.observeReveal(grid);
    if (window.YY_Currency) window.YY_Currency.applyAll();
  }
  document.addEventListener("DOMContentLoaded", () => {
    window.YY_renderChrome("wish");
    render();
    window.YY_Wishlist.onChange(render);
    const clearBtn = document.querySelector("[data-wish-clear]");
    if (clearBtn) clearBtn.addEventListener("click", () => {
      if (!window.YY_Wishlist.list().length) return;
      if (confirm("清空心愿单？")) { window.YY_Wishlist.clear(); window.YY_Toast("心愿单已清空"); }
    });
  });
})();
