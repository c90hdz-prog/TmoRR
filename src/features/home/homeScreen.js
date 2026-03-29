import { actions } from "../../state/actions.js";

export function renderHomeScreen() {
  return `
    <main class="screen">
      <section class="card panel headerCard">
        <h1 class="heroTitle">Retail Open / Close</h1>
        <p class="heroSub">Simple store opening and closing checklists with assignment, accountability, and history.</p>
      </section>

      <section class="stack">
        <button class="bigButton" data-go-opening>
          <span class="bigButtonTitle">Opening</span>
          <span class="bigButtonMeta">Start opening shift</span>
        </button>

        <button class="bigButton" data-go-closing>
          <span class="bigButtonTitle">Closing</span>
          <span class="bigButtonMeta">Start closing shift</span>
        </button>

        <button class="bigButton" data-go-employees>
          <span class="bigButtonTitle">Employees</span>
          <span class="bigButtonMeta">Manage saved employees</span>
        </button>

        <button class="bigButton" data-go-history>
          <span class="bigButtonTitle">History</span>
          <span class="bigButtonMeta">View last 30 days</span>
        </button>
      </section>
    </main>
  `;
}

export function bindHomeScreen(store) {
  document.querySelector("[data-go-opening]")?.addEventListener("click", () => {
    store.dispatch(actions.startShiftSetup("opening"));
  });

  document.querySelector("[data-go-closing]")?.addEventListener("click", () => {
    store.dispatch(actions.startShiftSetup("closing"));
  });

  document.querySelector("[data-go-employees]")?.addEventListener("click", () => {
    store.dispatch(actions.openEmployees());
  });

  document.querySelector("[data-go-history]")?.addEventListener("click", () => {
    store.dispatch(actions.openHistory());
  });
}
