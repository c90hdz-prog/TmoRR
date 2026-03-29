export function normalizeTemplateToShiftTask(task) {
  return {
    taskId: task.id,
    label: task.label,
    section: task.section,
    critical: task.critical,
    frequency: task.frequency,
    assignedTo: null,
    assignedName: "",
    done: false,
    doneAt: null,
  };
}
