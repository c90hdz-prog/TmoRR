export const selectScreen = (state) => state.ui.screen;
export const selectEmployees = (state) => state.employees;
export const selectActiveShift = (state) => state.activeShift;
export const selectHistory = (state) => state.history;
export const selectSheet = (state) => state.ui.sheet;
export const selectShiftDraft = (state) => state.ui.shiftDraft;
export const selectEmployeesEditMode = (state) => state.ui.employeesEditMode;

export const selectCanContinueShiftSetup = (state) =>
  Boolean(state.ui.shiftDraft?.employeeIds?.length);

export const selectShiftTasks = (state) => state.activeShift?.tasks || [];

export const selectCompletedCount = (state) =>
  selectShiftTasks(state).filter((task) => task.done).length;

export const selectTotalTaskCount = (state) => selectShiftTasks(state).length;

export const selectTasksBySection = (state) => {
  const grouped = {};
  for (const task of selectShiftTasks(state)) {
    if (!grouped[task.section]) grouped[task.section] = [];
    grouped[task.section].push(task);
  }
  return grouped;
};

export const selectIncompleteCriticalTasks = (state) =>
  selectShiftTasks(state).filter((task) => task.critical && !task.done);

export const selectIncompleteStandardTasks = (state) =>
  selectShiftTasks(state).filter((task) => !task.critical && !task.done);

export const selectUnassignedTasks = (state) =>
  selectShiftTasks(state).filter((task) => !task.assignedTo);

export const selectHistoryLast30Days = (state) => {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return state.history.filter((item) => {
    const ts = item.completedAt || item.startedAt || 0;
    return ts >= cutoff;
  });
};

export const selectHistoryDetail = (state) =>
  state.history.find((item) => item.id === state.ui.selectedHistoryId) || null;

export const selectRecentTaskAssignments = (state, taskId, limit = 3) => {
  const hits = [];
  for (const session of state.history) {
    for (const task of session.tasks || []) {
      if (task.taskId === taskId) {
        hits.push({
          date: session.date,
          assignedName: task.assignedName || "Unassigned",
          done: task.done,
        });
      }
    }
  }
  return hits.slice(0, limit);
};
