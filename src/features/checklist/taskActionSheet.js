import { actions } from "../../state/actions.js";

export function renderTaskActionSheet(state, payload) {
  const task = state.activeShift?.tasks.find((item) => item.taskId === payload.taskId);
  if (!task) return "";

  return `
    <div>
      <div class="sheetHandle"></div>
      <h3 class="sheetTitle">${task.label}</h3>
      <p class="sheetSub">Assigned: ${task.assignedName || "Unassigned"} • ${task.done ? "Complete" : "Incomplete"}</p>

      <div class="sheetActions">
        <button class="secondaryButton" data-open-assign-sheet="${task.taskId}">Assign to...</button>
        <button class="secondaryButton" data-toggle-task-done="${task.taskId}">
          ${task.done ? "Mark incomplete" : "Mark complete"}
        </button>
        <button class="secondaryButton" data-clear-task-assignment="${task.taskId}">Clear assignment</button>
        <button class="secondaryButton" data-close-sheet>Cancel</button>
      </div>
    </div>
  `;
}

export function bindTaskActionSheet(store, payload) {
  document.querySelector("[data-open-assign-sheet]")?.addEventListener("click", () => {
    store.dispatch(actions.openAssignEmployeeSheet(payload.taskId));
  });

  document.querySelector("[data-toggle-task-done]")?.addEventListener("click", () => {
    store.dispatch(actions.toggleTaskDone(payload.taskId));
  });

  document.querySelector("[data-clear-task-assignment]")?.addEventListener("click", () => {
    store.dispatch(actions.clearTaskAssignment(payload.taskId));
  });

  document.querySelector("[data-close-sheet]")?.addEventListener("click", () => {
    store.dispatch(actions.closeSheet());
  });
}
