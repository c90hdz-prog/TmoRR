export function renderEmptyState(title, subtitle = "") {
  return `
    <section class="card panel emptyState">
      <div style="font-weight:700; color:var(--text); margin-bottom:8px;">${title}</div>
      <div>${subtitle}</div>
    </section>
  `;
}
