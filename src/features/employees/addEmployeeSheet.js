import { actions } from "../../state/actions.js";

export function renderAddEmployeeSheet() {
  return `
    <div>
      <div class="sheetHandle"></div>
      <h3 class="sheetTitle">Add employee</h3>
      <p class="sheetSub">Save an employee to use for future shifts.</p>
      <div class="sheetActions">
        <input class="input" id="employeeNameInput" placeholder="Enter name" />
        <button class="primaryButton" data-save-employee>Save Employee</button>
        <button class="secondaryButton" data-close-sheet>Cancel</button>
      </div>
    </div>
  `;
}

export function bindAddEmployeeSheet(store) {
  document.querySelector("[data-close-sheet]")?.addEventListener("click", () => {
    store.dispatch(actions.closeSheet());
  });

  document.querySelector("[data-save-employee]")?.addEventListener("click", () => {
    const input = document.getElementById("employeeNameInput");
    const name = input?.value || "";
    store.dispatch(actions.addEmployee(name));
  });
}
