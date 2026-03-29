import { actions } from "../../state/actions.js";

export function renderAssignEmployeeSheet(state, payload) {
  const shift = state.activeShift;
  if (!shift) return "";

  const employees = shift.employeeIds
    .map((id) => state.employees.find((emp) => emp.id === id))
    .filter(Boolean);

  return `
    <div>
      <div class="sheetHandle"></div>
      <h3 class="sheetTitle">Assign task</h3>
      <p class="sheetSub">Choose who should own this task.</p>
      <div class="sheetActions">
        ${employees
          .map(
            (emp) => `
          <button class="secondaryButton" data-assign-employee="${emp.id}">
            ${emp.name}
          </button>
        `
          )
          .join("")}
        <button class="secondaryButton" data-close-sheet>Cancel</button>
      </div>
    </div>
  `;
}

export function bindAssignEmployeeSheet(store, payload) {
  document.querySelectorAll("[data-assign-employee]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const employeeId = btn.getAttribute("data-assign-employee");
      store.dispatch(actions.assignTask(payload.taskId, employeeId));
    });
  });

  document.querySelector("[data-close-sheet]")?.addEventListener("click", () => {
    store.dispatch(actions.closeSheet());
  });
}
