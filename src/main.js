import { createStore } from "./state/store.js";
import { reducer } from "./state/reducer.js";
import { initialState } from "./state/initialState.js";
import { hydrateState, persistState } from "./state/storage.js";
import { renderApp } from "./app.js";
import { loadDefaultTemplatesIfMissing } from "./state/actions.js";

const persisted = hydrateState();

const mergedState = {
  ...initialState,
  ...persisted,
  templates: {
    ...initialState.templates,
    ...(persisted.templates || {}),
  },
  ui: {
    ...initialState.ui,
    ...(persisted.ui || {}),
  },
};

const store = createStore(reducer, mergedState);

loadDefaultTemplatesIfMissing(store);

store.subscribe(() => {
  persistState(store.getState());
  renderApp(store);
});

renderApp(store);
window.__store = store;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
      console.log("Service worker registered");
    } catch (err) {
      console.warn("Service worker registration failed", err);
    }
  });
}