export const initialState = {
  employees: [],
  templates: {
    opening: [],
    closing: [],
    occasional: [],
  },
  activeShift: null,
  history: [],
  ui: {
    screen: "home",
    mode: null,
    selectedHistoryId: null,
    employeesEditMode: false,
    sheet: null,
    reviewOpen: false,
    shiftDraft: null,
  },
};
