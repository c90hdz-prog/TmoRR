import { actions } from "../../state/actions.js";

export function renderAssignSectionSheet(state, payload) {
  const shift = state.activeShift;
  if (!shift) return "";

  const employees = shift.employeeIds
    .map((id) => state.employees.find((emp) => emp.id === id))
    .filter(Boolean);

  return `
    <div>
      <div class="sheetHandle"></div>
      <h3 class="sheetTitle">Assign Group</h3>
      <p class="sheetSub">Assign all tasks in ${payload.section} to one employee.</p>

      <div class="sheetActions">
        ${employees
          .map(
            (emp) => `
            <button class="secondaryButton" data-assign-section-employee="${emp.id}">
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

export function bindAssignSectionSheet(store, payload) {
  document.querySelectorAll("[data-assign-section-employee]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const employeeId = btn.getAttribute("data-assign-section-employee");
      store.dispatch(actions.assignSection(payload.section, employeeId));
    });
  });

  document.querySelector("[data-close-sheet]")?.addEventListener("click", () => {
    store.dispatch(actions.closeSheet());
  });
}