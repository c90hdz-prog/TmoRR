import { actions } from "../../state/actions.js";
import { selectIncompleteCriticalTasks, selectIncompleteStandardTasks, selectUnassignedTasks } from "../../state/selectors.js";

export function renderEndShiftReview(state) {
  if (!state.ui.reviewOpen) return "";

  const critical = selectIncompleteCriticalTasks(state);
  const standard = selectIncompleteStandardTasks(state);
  const unassigned = selectUnassignedTasks(state);

  return `
    <div class="reviewModal">
      <div class="reviewCard">
        <h3 class="sheetTitle">Review before ending</h3>
        <p class="sheetSub">You can still end the shift, but these items are unfinished or unassigned.</p>

        ${
          critical.length
            ? `
            <section class="section">
              <h4 class="sectionTitle">Incomplete critical</h4>
              <ul class="listPlain">
                ${critical.map((task) => `<li>${task.label} — ${task.assignedName || "Unassigned"}</li>`).join("")}
              </ul>
            </section>
          `
            : ``
        }

        ${
          standard.length
            ? `
            <section class="section">
              <h4 class="sectionTitle">Incomplete standard</h4>
              <ul class="listPlain">
                ${standard.map((task) => `<li>${task.label} — ${task.assignedName || "Unassigned"}</li>`).join("")}
              </ul>
            </section>
          `
            : ``
        }

        ${
          unassigned.length
            ? `
            <section class="section">
              <h4 class="sectionTitle">Unassigned</h4>
              <ul class="listPlain">
                ${unassigned.map((task) => `<li>${task.label}</li>`).join("")}
              </ul>
            </section>
          `
            : ``
        }

        <div class="stack" style="margin-top:18px;">
          <button class="secondaryButton" data-close-review>Go Back</button>
          <button class="primaryButton" data-confirm-end-shift>End Shift Anyway</button>
        </div>
      </div>
    </div>
  `;
}

export function bindEndShiftReview(store) {
  document.querySelector("[data-close-review]")?.addEventListener("click", () => {
    store.dispatch(actions.closeEndShiftReview());
  });

  document.querySelector("[data-confirm-end-shift]")?.addEventListener("click", () => {
    store.dispatch(actions.confirmEndShift());
  });
}
