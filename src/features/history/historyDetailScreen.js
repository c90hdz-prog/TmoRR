import { actions } from "../../state/actions.js";
import { selectHistoryDetail } from "../../state/selectors.js";

function groupTasks(tasks) {
  const grouped = {};
  for (const task of tasks || []) {
    if (!grouped[task.section]) grouped[task.section] = [];
    grouped[task.section].push(task);
  }
  return grouped;
}

export function renderHistoryDetailScreen(state) {
  const item = selectHistoryDetail(state);

  if (!item) {
    return `
      <main class="screen">
        <div class="topbar">
          <button class="iconButton" data-back-history>Back</button>
          <h1 style="margin:0;">History Detail</h1>
          <div style="width:68px;"></div>
        </div>
        <section class="card panel">
          <p class="heroSub">No history item selected.</p>
        </section>
      </main>
    `;
  }

  const grouped = groupTasks(item.tasks);

  return `
    <main class="screen">
      <div class="topbar">
        <button class="iconButton" data-back-history>Back</button>
        <h1 style="margin:0;">${item.mode === "closing" ? "Closing" : "Opening"}</h1>
        <div style="width:68px;"></div>
      </div>

      <section class="card panel headerCard">
        <div class="taskMeta">Employees: ${(item.employeeNames || []).join(", ")}</div>
        ${item.leadName ? `<div class="taskMeta">Lead: ${item.leadName}</div>` : ``}
      </section>

      ${Object.entries(grouped)
        .map(
          ([section, tasks]) => `
          <section class="section">
            <h2 class="sectionTitle">${section}</h2>
            <div class="stack">
              ${tasks
                .map(
                  (task) => `
                    <div class="taskCard ${task.done ? "done" : ""}">
                      <div class="taskTitle">${task.label}</div>
                      <div class="taskMeta">Assigned: ${task.assignedName || "Unassigned"} • ${task.done ? "Complete" : "Incomplete"}</div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </section>
        `
        )
        .join("")}
    </main>
  `;
}

export function bindHistoryDetailScreen(store) {
  document.querySelector("[data-back-history]")?.addEventListener("click", () => {
    store.dispatch(actions.openHistory());
  });
}
