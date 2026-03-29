import { actions } from "../../state/actions.js";
import { selectEmployees, selectShiftDraft, selectCanContinueShiftSetup } from "../../state/selectors.js";
import { renderEmptyState } from "../../ui/emptyState.js";

export function renderShiftSetupScreen(state) {
  const employees = selectEmployees(state);
  const draft = selectShiftDraft(state);
  const mode = draft?.mode || state.ui.mode;
  const title = mode === "closing" ? "Who is closing today?" : "Who is opening today?";
  const canContinue = selectCanContinueShiftSetup(state);

  const selectedIds = draft?.employeeIds || [];
  const leadId = draft?.leadId || null;

  return `
    <main class="screen">
      <div class="topbar">
        <button class="iconButton" data-back-home>Back</button>
        <h1 style="margin:0;">${mode === "closing" ? "Closing" : "Opening"}</h1>
        <div style="width:68px;"></div>
      </div>

      <section class="card panel headerCard">
        <h2 style="margin:0 0 6px;">${title}</h2>
        <p class="heroSub">Select employees for this shift. Lead is optional.</p>
      </section>

      ${
        employees.length
          ? `
            <section class="stack">
              ${employees
                .map((emp) => {
                  const selected = selectedIds.includes(emp.id);
                  const isLead = leadId === emp.id;
                  return `
                    <button class="selectRow rowBetween ${selected ? "isSelected" : ""}" data-toggle-shift-employee="${emp.id}">
                      <div>
                        <div class="employeeName">${emp.name}</div>
                        <div class="taskMeta">${selected ? "Selected" : "Not selected"}${isLead ? " • Lead" : ""}</div>
                      </div>
                      <div class="row">
                        ${
                          selected
                            ? `<button class="secondaryButton" type="button" data-set-lead="${emp.id}">${isLead ? "Lead" : "Make Lead"}</button>`
                            : ``
                        }
                      </div>
                    </button>
                  `;
                })
                .join("")}
            </section>
          `
          : renderEmptyState("No employees saved", "Add employees first before starting a shift.")
      }

      <div class="stickyBottom">
        <div class="stickyBottomInner">
          <button class="primaryButton" style="width:100%;" data-continue-shift ${canContinue ? "" : "disabled"}>
            Continue
          </button>
        </div>
      </div>
    </main>
  `;
}

export function bindShiftSetupScreen(store) {
  document.querySelector("[data-back-home]")?.addEventListener("click", () => {
    store.dispatch(actions.goHome());
  });

  document.querySelectorAll("[data-toggle-shift-employee]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.closest("[data-set-lead]")) return;
      store.dispatch(actions.toggleShiftEmployee(btn.getAttribute("data-toggle-shift-employee")));
    });
  });

  document.querySelectorAll("[data-set-lead]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      store.dispatch(actions.setShiftLead(btn.getAttribute("data-set-lead")));
    });
  });

  document.querySelector("[data-continue-shift]")?.addEventListener("click", () => {
    store.dispatch(actions.createActiveShift());
  });
}
