export function renderTaskCard(task) {
  return `
    <button class="taskCard ${task.done ? "done" : ""}" data-task-id="${task.taskId}">
      <div class="rowBetween">
        <div>
          <div class="taskTitle">${task.label}</div>
          <div class="taskMeta">
            Assigned: ${task.assignedName || "Unassigned"} • ${task.done ? "Complete" : "Incomplete"}
          </div>
        </div>
        ${task.critical ? `<span class="badge badgeCritical">Critical</span>` : ``}
      </div>
    </button>
  `;
}
