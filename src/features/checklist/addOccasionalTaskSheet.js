import { actions } from "../../state/actions.js";
import { selectRecentTaskAssignments } from "../../state/selectors.js";

export function renderAddOccasionalTaskSheet(state) {
  const tasks = state.templates.occasional || [];

  return `
    <div>
      <div class="sheetHandle"></div>
      <h3 class="sheetTitle">Add occasional task</h3>
      <p class="sheetSub">Add a non-daily task to this shift.</p>
      <div class="sheetActions">
        ${tasks
          .map((task) => {
            const history = selectRecentTaskAssignments(state, task.id, 3);
            return `
              <button class="secondaryButton" data-add-occasional="${task.id}">
                <div style="text-align:left;">
                  <div class="taskTitle">${task.label}</div>
                  <div class="taskMeta">
                    ${
                      history.length
                        ? history.map((item) => `${item.assignedName} (${item.date})`).join(" • ")
                        : "No recent history"
                    }
                  </div>
                </div>
              </button>
            `;
          })
          .join("")}
        <button class="secondaryButton" data-close-sheet>Cancel</button>
      </div>
    </div>
  `;
}

export function bindAddOccasionalTaskSheet(store) {
  document.querySelectorAll("[data-add-occasional]").forEach((btn) => {
    btn.addEventListener("click", () => {
      store.dispatch(actions.addOccasionalTask(btn.getAttribute("data-add-occasional")));
    });
  });

  document.querySelector("[data-close-sheet]")?.addEventListener("click", () => {
    store.dispatch(actions.closeSheet());
  });
}
