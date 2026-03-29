import { actions } from "../../state/actions.js";
import { selectHistoryLast30Days } from "../../state/selectors.js";
import { formatDateLabel } from "../../utils/date.js";
import { renderEmptyState } from "../../ui/emptyState.js";

export function renderHistoryScreen(state) {
  const history = selectHistoryLast30Days(state);

  return `
    <main class="screen">
      <div class="topbar">
        <button class="iconButton" data-back-home>Back</button>
        <h1 style="margin:0;">History</h1>
        <div style="width:68px;"></div>
      </div>

      ${
        history.length
          ? `
            <section class="stack">
              ${history
                .map((item) => {
                  const complete = item.tasks.filter((task) => task.done).length;
                  const total = item.tasks.length;
                  return `
                    <button class="historyRow" data-open-history-detail="${item.id}">
                      <div class="historyTitle">${item.mode === "closing" ? "Closing" : "Opening"}</div>
                      <div class="historyMeta">${formatDateLabel(item.completedAt || item.startedAt)}</div>
                      <div class="historyMeta">${complete} / ${total} complete</div>
                      <div class="historyMeta">${(item.employeeNames || []).join(", ")}</div>
                    </button>
                  `;
                })
                .join("")}
            </section>
          `
          : renderEmptyState("No history yet", "Completed opening and closing shifts will appear here.")
      }
    </main>
  `;
}

export function bindHistoryScreen(store) {
  document.querySelector("[data-back-home]")?.addEventListener("click", () => {
    store.dispatch(actions.goHome());
  });

  document.querySelectorAll("[data-open-history-detail]").forEach((btn) => {
    btn.addEventListener("click", () => {
      store.dispatch(actions.openHistoryDetail(btn.getAttribute("data-open-history-detail")));
    });
  });
}
