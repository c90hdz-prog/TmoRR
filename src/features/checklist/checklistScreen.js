import { actions } from "../../state/actions.js";
import { selectActiveShift, selectCompletedCount, selectTasksBySection, selectTotalTaskCount } from "../../state/selectors.js";
import { renderTaskCard } from "./taskCard.js";

export function renderChecklistScreen(state) {
  const shift = selectActiveShift(state);
  if (!shift) {
    return `
      <main class="screen">
        <div class="card panel">
          <h1>No active shift</h1>
          <p class="heroSub">Start an opening or closing shift from Home.</p>
        </div>
      </main>
    `;
  }

  const grouped = selectTasksBySection(state);
  const completed = selectCompletedCount(state);
  const total = selectTotalTaskCount(state);

  return `
    <main class="screen">
      <div class="topbar">
        <button class="iconButton" data-back-home>Back</button>
        <h1 style="margin:0;">${shift.mode === "closing" ? "Closing" : "Opening"}</h1>
        <div style="width:68px;"></div>
      </div>

      <section class="card panel headerCard">
        <div class="rowBetween">
          <div>
            <div class="sectionTitle" style="margin-bottom:8px;">On Shift</div>
            <div class="pillRow">
              ${shift.employeeNames.map((name) => `<span class="pill">${name}</span>`).join("")}
            </div>
          </div>
          <div>
            <div class="sectionTitle" style="margin-bottom:8px;">Progress</div>
            <div class="badge">${completed} / ${total} complete</div>
          </div>
        </div>
        ${
          shift.leadName
            ? `<div style="margin-top:12px;"><span class="badge">Lead: ${shift.leadName}</span></div>`
            : ``
        }
      </section>

      ${Object.entries(grouped)
        .map(
          ([section, tasks]) => `
          <section class="section">
            <h2 class="sectionTitle">${section}</h2>
            <div class="stack">
              ${tasks.map((task) => renderTaskCard(task)).join("")}
            </div>
          </section>
        `
        )
        .join("")}

      <div class="stickyBottom">
        <div class="stickyBottomInner stack">
          <button class="secondaryButton" style="width:100%;" data-add-occasional-task>Add occasional task</button>
          <button class="primaryButton" style="width:100%;" data-end-shift>End Shift</button>
        </div>
      </div>
    </main>
  `;
}

export function bindChecklistScreen(store) {
  document.querySelector("[data-back-home]")?.addEventListener("click", () => {
    store.dispatch(actions.goHome());
  });

  document.querySelectorAll("[data-task-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      store.dispatch(actions.openTaskSheet(btn.getAttribute("data-task-id")));
    });
  });

  document.querySelector("[data-add-occasional-task]")?.addEventListener("click", () => {
    store.dispatch(actions.openAddOccasionalTaskSheet());
  });

  document.querySelector("[data-end-shift]")?.addEventListener("click", () => {
    store.dispatch(actions.openEndShiftReview());
  });
}
