// -------- 行程规划器页 --------
(function () {
  let draggedId = null;

  function renderList(items) {
    const wrap = document.querySelector("[data-plan-list]");
    if (!wrap) return;
    wrap.innerHTML = items.map(it => {
      const d = window.DESTINATIONS.find(x => x.id === it.id);
      if (!d) return "";
      return `
        <div class="plan-item" draggable="true" data-id="${d.id}">
          <span class="handle" aria-label="拖动排序">⋮⋮</span>
          <img class="thumb" src="${d.heroImage}" alt="${d.name}" loading="lazy" />
          <div class="info">
            <p class="name">${d.name}</p>
            <p class="sub">${d.country} · ${d.region}</p>
          </div>
          <label class="days">
            停留 <input type="number" min="1" max="30" value="${it.days}" data-days /> 天
          </label>
          <span class="price">${window.YY_Currency.format(d.priceFrom * it.days / 4)}</span>
          <button class="remove" data-remove aria-label="移除">×</button>
        </div>
      `;
    }).join("");

    wrap.querySelectorAll(".plan-item").forEach(el => {
      const id = el.dataset.id;
      el.querySelector("[data-remove]").addEventListener("click", () => {
        window.YY_Plan.remove(id);
        window.YY_Toast("已从行程中移除");
      });
      el.querySelector("[data-days]").addEventListener("change", (e) => {
        window.YY_Plan.setDays(id, e.target.value);
      });
      el.addEventListener("dragstart", (e) => {
        draggedId = id;
        el.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });
      el.addEventListener("dragend", () => {
        el.classList.remove("dragging");
        wrap.querySelectorAll(".drop-target").forEach(x => x.classList.remove("drop-target"));
        draggedId = null;
      });
      el.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!draggedId || draggedId === id) return;
        el.classList.add("drop-target");
      });
      el.addEventListener("dragleave", () => el.classList.remove("drop-target"));
      el.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!draggedId || draggedId === id) return;
        const curIds = Array.from(wrap.querySelectorAll(".plan-item")).map(n => n.dataset.id);
        const from = curIds.indexOf(draggedId);
        const to = curIds.indexOf(id);
        if (from < 0 || to < 0) return;
        curIds.splice(to, 0, curIds.splice(from, 1)[0]);
        window.YY_Plan.reorder(curIds);
      });
    });
  }

  function renderSummary(items) {
    const destCountEl = document.querySelector("[data-plan-destinations]");
    const daysEl = document.querySelector("[data-plan-days]");
    const subtotalEl = document.querySelector("[data-plan-subtotal]");
    const feeEl = document.querySelector("[data-plan-fee]");
    const totalEl = document.querySelector("[data-plan-total]");
    const headCountEl = document.querySelector("[data-plan-head-count]");
    const totalCny = items.reduce((sum, it) => {
      const d = window.DESTINATIONS.find(x => x.id === it.id);
      if (!d) return sum;
      return sum + d.priceFrom * it.days / 4;
    }, 0);
    const totalDays = items.reduce((s, it) => s + it.days, 0);
    const fee = totalCny * 0.08;
    if (destCountEl) destCountEl.textContent = items.length;
    if (daysEl) daysEl.textContent = totalDays + " 天";
    if (subtotalEl) subtotalEl.textContent = window.YY_Currency.format(totalCny);
    if (feeEl) feeEl.textContent = window.YY_Currency.format(fee);
    if (totalEl) totalEl.textContent = window.YY_Currency.format(totalCny + fee);
    if (headCountEl) headCountEl.textContent = items.length;
  }

  function renderEmpty(show) {
    const empty = document.querySelector("[data-plan-empty]");
    const body = document.querySelector("[data-plan-body]");
    if (empty) empty.style.display = show ? "block" : "none";
    if (body) body.style.display = show ? "none" : "grid";
  }

  function exportPlan(items) {
    const lines = ["# 云游行程规划", ""];
    let totalDays = 0;
    items.forEach((it, idx) => {
      const d = window.DESTINATIONS.find(x => x.id === it.id);
      if (!d) return;
      totalDays += it.days;
      lines.push(`${String(idx + 1).padStart(2, "0")}. ${d.name}（${d.country}）· ${it.days} 天`);
      lines.push(`    ${d.tagline}`);
      lines.push(`    建议季节：${d.bestSeason}`);
      lines.push("");
    });
    lines.push(`合计 ${items.length} 个目的地 · ${totalDays} 天`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "yunyou-plan.txt";
    a.click();
    URL.revokeObjectURL(a.href);
    window.YY_Toast("行程已导出");
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.YY_renderChrome("plan");
    const sync = () => {
      const items = window.YY_Plan.list();
      renderEmpty(!items.length);
      renderList(items);
      renderSummary(items);
    };
    window.YY_Plan.onChange(sync);
    window.YY_Currency.onChange(sync);

    const exportBtn = document.querySelector("[data-plan-export]");
    if (exportBtn) exportBtn.addEventListener("click", () => {
      const items = window.YY_Plan.list();
      if (!items.length) return;
      exportPlan(items);
    });
    const clearBtn = document.querySelector("[data-plan-clear]");
    if (clearBtn) clearBtn.addEventListener("click", () => {
      if (!window.YY_Plan.list().length) return;
      if (confirm("清空整份行程？")) { window.YY_Plan.clear(); window.YY_Toast("已清空行程"); }
    });
  });
})();
