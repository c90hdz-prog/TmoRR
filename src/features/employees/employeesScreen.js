import { actions } from "../../state/actions.js";
import { selectEmployees, selectEmployeesEditMode } from "../../state/selectors.js";
import { renderEmptyState } from "../../ui/emptyState.js";

export function renderEmployeesScreen(state) {
  const employees = selectEmployees(state);
  const editMode = selectEmployeesEditMode(state);

  return `
    <main class="screen">
      <div class="topbar">
        <button class="iconButton" data-back-home>Back</button>
        <div class="row">
          <h1 style="margin:0;">Employees</h1>
        </div>
        <button class="textButton" data-toggle-edit>${editMode ? "Done" : "Edit"}</button>
      </div>

      ${
        employees.length
          ? `<section class="stack">
              ${employees
                .map(
                  (emp) => `
                <div class="employeeRow rowBetween">
                  <div class="employeeName">${emp.name}</div>
                  ${
                    editMode
                      ? `<button class="dangerButton" data-remove-employee="${emp.id}">Remove</button>`
                      : ``
                  }
                </div>
              `
                )
                .join("")}
            </section>`
          : renderEmptyState("No employees added yet", "Add employees to start assigning tasks.")
      }

      <div class="stickyBottom">
        <div class="stickyBottomInner">
          <button class="primaryButton" style="width:100%;" data-open-add-employee>Add Employee</button>
        </div>
      </div>
    </main>
  `;
}

export function bindEmployeesScreen(store) {
  document.querySelector("[data-back-home]")?.addEventListener("click", () => {
    store.dispatch(actions.goHome());
  });

  document.querySelector("[data-toggle-edit]")?.addEventListener("click", () => {
    store.dispatch(actions.toggleEmployeesEditMode());
  });

  document.querySelector("[data-open-add-employee]")?.addEventListener("click", () => {
    store.dispatch(actions.openAddEmployeeSheet());
  });

  document.querySelectorAll("[data-remove-employee]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-remove-employee");
      store.dispatch(actions.removeEmployee(id));
    });
  });
}
