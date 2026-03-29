import { openingTasks } from "../data/openingTasks.js";
import { closingTasks } from "../data/closingTasks.js";
import { occasionalTasks } from "../data/occasionalTasks.js";

export const types = {
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  REMOVE_EMPLOYEE: "REMOVE_EMPLOYEE",
  TOGGLE_EMPLOYEES_EDIT_MODE: "TOGGLE_EMPLOYEES_EDIT_MODE",

  GO_HOME: "GO_HOME",
  OPEN_EMPLOYEES: "OPEN_EMPLOYEES",
  OPEN_HISTORY: "OPEN_HISTORY",
  OPEN_HISTORY_DETAIL: "OPEN_HISTORY_DETAIL",

  START_SHIFT_SETUP: "START_SHIFT_SETUP",
  TOGGLE_SHIFT_EMPLOYEE: "TOGGLE_SHIFT_EMPLOYEE",
  SET_SHIFT_LEAD: "SET_SHIFT_LEAD",
  CREATE_ACTIVE_SHIFT: "CREATE_ACTIVE_SHIFT",
  CANCEL_ACTIVE_SHIFT: "CANCEL_ACTIVE_SHIFT",

  OPEN_TASK_SHEET: "OPEN_TASK_SHEET",
  OPEN_ASSIGN_EMPLOYEE_SHEET: "OPEN_ASSIGN_EMPLOYEE_SHEET",
  OPEN_ADD_EMPLOYEE_SHEET: "OPEN_ADD_EMPLOYEE_SHEET",
  OPEN_ADD_OCCASIONAL_TASK_SHEET: "OPEN_ADD_OCCASIONAL_TASK_SHEET",
  CLOSE_SHEET: "CLOSE_SHEET",

  ASSIGN_TASK: "ASSIGN_TASK",
  CLEAR_TASK_ASSIGNMENT: "CLEAR_TASK_ASSIGNMENT",
  TOGGLE_TASK_DONE: "TOGGLE_TASK_DONE",

  ADD_OCCASIONAL_TASK: "ADD_OCCASIONAL_TASK",

  OPEN_END_SHIFT_REVIEW: "OPEN_END_SHIFT_REVIEW",
  CLOSE_END_SHIFT_REVIEW: "CLOSE_END_SHIFT_REVIEW",
  CONFIRM_END_SHIFT: "CONFIRM_END_SHIFT",

  LOAD_DEFAULT_TEMPLATES: "LOAD_DEFAULT_TEMPLATES",
};

export const actions = {
  addEmployee: (name) => ({ type: types.ADD_EMPLOYEE, payload: { name } }),
  removeEmployee: (id) => ({ type: types.REMOVE_EMPLOYEE, payload: { id } }),
  toggleEmployeesEditMode: () => ({ type: types.TOGGLE_EMPLOYEES_EDIT_MODE }),

  goHome: () => ({ type: types.GO_HOME }),
  openEmployees: () => ({ type: types.OPEN_EMPLOYEES }),
  openHistory: () => ({ type: types.OPEN_HISTORY }),
  openHistoryDetail: (id) => ({ type: types.OPEN_HISTORY_DETAIL, payload: { id } }),

  startShiftSetup: (mode) => ({ type: types.START_SHIFT_SETUP, payload: { mode } }),
  toggleShiftEmployee: (employeeId) => ({ type: types.TOGGLE_SHIFT_EMPLOYEE, payload: { employeeId } }),
  setShiftLead: (employeeId) => ({ type: types.SET_SHIFT_LEAD, payload: { employeeId } }),
  createActiveShift: () => ({ type: types.CREATE_ACTIVE_SHIFT }),
  cancelActiveShift: () => ({ type: types.CANCEL_ACTIVE_SHIFT }),

  openTaskSheet: (taskId) => ({ type: types.OPEN_TASK_SHEET, payload: { taskId } }),
  openAssignEmployeeSheet: (taskId) => ({ type: types.OPEN_ASSIGN_EMPLOYEE_SHEET, payload: { taskId } }),
  openAddEmployeeSheet: () => ({ type: types.OPEN_ADD_EMPLOYEE_SHEET }),
  openAddOccasionalTaskSheet: () => ({ type: types.OPEN_ADD_OCCASIONAL_TASK_SHEET }),
  closeSheet: () => ({ type: types.CLOSE_SHEET }),

  assignTask: (taskId, employeeId) => ({ type: types.ASSIGN_TASK, payload: { taskId, employeeId } }),
  clearTaskAssignment: (taskId) => ({ type: types.CLEAR_TASK_ASSIGNMENT, payload: { taskId } }),
  toggleTaskDone: (taskId) => ({ type: types.TOGGLE_TASK_DONE, payload: { taskId } }),

  addOccasionalTask: (taskTemplateId) => ({ type: types.ADD_OCCASIONAL_TASK, payload: { taskTemplateId } }),

  openEndShiftReview: () => ({ type: types.OPEN_END_SHIFT_REVIEW }),
  closeEndShiftReview: () => ({ type: types.CLOSE_END_SHIFT_REVIEW }),
  confirmEndShift: () => ({ type: types.CONFIRM_END_SHIFT }),

  loadDefaultTemplates: () => ({
    type: types.LOAD_DEFAULT_TEMPLATES,
    payload: {
      opening: openingTasks,
      closing: closingTasks,
      occasional: occasionalTasks,
    },
  }),
};

export function loadDefaultTemplatesIfMissing(store) {
  const state = store.getState();
  const missing =
    !state.templates.opening.length ||
    !state.templates.closing.length ||
    !state.templates.occasional.length;

  if (missing) {
    store.dispatch(actions.loadDefaultTemplates());
  }
}
