const STORAGE_KEYS = {
  EMPLOYEES: "roc_v1_employees",
  TEMPLATES: "roc_v1_templates",
  ACTIVE_SHIFT: "roc_v1_active_shift",
  HISTORY: "roc_v1_history",
};

export function hydrateState() {
  try {
    const employees = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || "[]");
    const templates = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEMPLATES) || '{"opening":[],"closing":[],"occasional":[]}');
    const activeShift = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_SHIFT) || "null");
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || "[]");

    return {
      employees,
      templates,
      activeShift,
      history,
    };
  } catch (err) {
    console.warn("Failed to hydrate state", err);
    return {};
  }
}

export function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(state.employees));
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(state.templates));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SHIFT, JSON.stringify(state.activeShift));
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
  } catch (err) {
    console.warn("Failed to persist state", err);
  }
}
