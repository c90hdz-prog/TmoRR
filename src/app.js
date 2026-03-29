import { selectScreen } from "./state/selectors.js";
import { renderHomeScreen, bindHomeScreen } from "./features/home/homeScreen.js";
import { renderEmployeesScreen, bindEmployeesScreen } from "./features/employees/employeesScreen.js";
import { renderShiftSetupScreen, bindShiftSetupScreen } from "./features/shifts/shiftSetupScreen.js";
import { renderChecklistScreen, bindChecklistScreen } from "./features/checklist/checklistScreen.js";
import { renderHistoryScreen, bindHistoryScreen } from "./features/history/historyScreen.js";
import { renderHistoryDetailScreen, bindHistoryDetailScreen } from "./features/history/historyDetailScreen.js";
import { renderBottomSheet } from "./ui/bottomSheet.js";
import { renderTaskActionSheet, bindTaskActionSheet } from "./features/checklist/taskActionSheet.js";
import { renderAssignEmployeeSheet, bindAssignEmployeeSheet } from "./features/checklist/assignEmployeeSheet.js";
import { renderAddEmployeeSheet, bindAddEmployeeSheet } from "./features/employees/addEmployeeSheet.js";
import { renderAddOccasionalTaskSheet, bindAddOccasionalTaskSheet } from "./features/checklist/addOccasionalTaskSheet.js";
import { renderEndShiftReview, bindEndShiftReview } from "./features/review/endShiftReview.js";

export function renderApp(store) {
  const root = document.getElementById("app");
  const sheetRoot = document.getElementById("sheet-root");
  const state = store.getState();
  const screen = selectScreen(state);

  let html = "";

  switch (screen) {
    case "employees":
      html = renderEmployeesScreen(state);
      break;
    case "shiftSetup":
      html = renderShiftSetupScreen(state);
      break;
    case "checklist":
      html = renderChecklistScreen(state);
      break;
    case "history":
      html = renderHistoryScreen(state);
      break;
    case "historyDetail":
      html = renderHistoryDetailScreen(state);
      break;
    case "home":
    default:
      html = renderHomeScreen(state);
      break;
  }

  html += renderEndShiftReview(state);
  root.innerHTML = html;

  switch (screen) {
    case "employees":
      bindEmployeesScreen(store);
      break;
    case "shiftSetup":
      bindShiftSetupScreen(store);
      break;
    case "checklist":
      bindChecklistScreen(store);
      break;
    case "history":
      bindHistoryScreen(store);
      break;
    case "historyDetail":
      bindHistoryDetailScreen(store);
      break;
    case "home":
    default:
      bindHomeScreen(store);
      break;
  }

  bindEndShiftReview(store);

  const sheet = state.ui.sheet;
  if (!sheet) {
    sheetRoot.innerHTML = "";
    return;
  }

  let sheetHtml = "";
  if (sheet.type === "taskActions") {
    sheetHtml = renderTaskActionSheet(state, sheet.payload);
  } else if (sheet.type === "assignEmployee") {
    sheetHtml = renderAssignEmployeeSheet(state, sheet.payload);
  } else if (sheet.type === "addEmployee") {
    sheetHtml = renderAddEmployeeSheet();
  } else if (sheet.type === "addOccasionalTask") {
    sheetHtml = renderAddOccasionalTaskSheet(state);
  }

  sheetRoot.innerHTML = renderBottomSheet(sheetHtml);

  if (sheet.type === "taskActions") {
    bindTaskActionSheet(store, sheet.payload);
  } else if (sheet.type === "assignEmployee") {
    bindAssignEmployeeSheet(store, sheet.payload);
  } else if (sheet.type === "addEmployee") {
    bindAddEmployeeSheet(store);
  } else if (sheet.type === "addOccasionalTask") {
    bindAddOccasionalTaskSheet(store);
  }
}
