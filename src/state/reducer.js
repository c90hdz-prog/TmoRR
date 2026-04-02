import { types } from "./actions.js";
import { makeId } from "../utils/id.js";
import { todayISO } from "../utils/date.js";
import { normalizeTemplateToShiftTask } from "../utils/tasks.js";
import { createHistorySnapshot } from "../utils/history.js";

function uniqById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function reducer(state, action) {
  switch (action.type) {
    case types.LOAD_DEFAULT_TEMPLATES: {
      return {
        ...state,
        templates: action.payload,
      };
    }

    case types.ADD_EMPLOYEE: {
      const name = String(action.payload.name || "").trim();
      if (!name) return state;

      const exists = state.employees.some(
        (emp) => emp.name.toLowerCase() === name.toLowerCase()
      );
      if (exists) {
        return {
          ...state,
          ui: { ...state.ui, sheet: null },
        };
      }

      return {
        ...state,
        employees: uniqById([...state.employees, { id: makeId("emp"), name }]),
        ui: { ...state.ui, sheet: null },
      };
    }

    case types.REMOVE_EMPLOYEE: {
      const id = action.payload.id;
      const employees = state.employees.filter((emp) => emp.id !== id);

      let activeShift = state.activeShift;
      if (activeShift) {
        const employeeIds = activeShift.employeeIds.filter((empId) => empId !== id);
        const employeeNames = activeShift.employeeNames.filter(
          (_, idx) => activeShift.employeeIds[idx] !== id
        );

        let leadId = activeShift.leadId;
        let leadName = activeShift.leadName;
        if (leadId === id) {
          leadId = null;
          leadName = "";
        }

        activeShift = {
          ...activeShift,
          employeeIds,
          employeeNames,
          leadId,
          leadName,
        };
      }

      let shiftDraft = state.ui.shiftDraft;
      if (shiftDraft) {
        const employeeIds = shiftDraft.employeeIds.filter((empId) => empId !== id);
        let leadId = shiftDraft.leadId;
        if (leadId === id) leadId = null;
        shiftDraft = { ...shiftDraft, employeeIds, leadId };
      }

      return {
        ...state,
        employees,
        activeShift,
        ui: {
          ...state.ui,
          shiftDraft,
        },
      };
    }

    case types.TOGGLE_EMPLOYEES_EDIT_MODE: {
      return {
        ...state,
        ui: {
          ...state.ui,
          employeesEditMode: !state.ui.employeesEditMode,
        },
      };
    }

    case types.GO_HOME: {
      return {
        ...state,
        ui: {
          ...state.ui,
          screen: "home",
          mode: null,
          selectedHistoryId: null,
          sheet: null,
          reviewOpen: false,
          shiftDraft: null,
        },
      };
    }

    case types.OPEN_EMPLOYEES: {
      return {
        ...state,
        ui: {
          ...state.ui,
          screen: "employees",
          sheet: null,
        },
      };
    }

    case types.OPEN_HISTORY: {
      return {
        ...state,
        ui: {
          ...state.ui,
          screen: "history",
          selectedHistoryId: null,
          sheet: null,
        },
      };
    }

    case types.OPEN_HISTORY_DETAIL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          screen: "historyDetail",
          selectedHistoryId: action.payload.id,
          sheet: null,
        },
      };
    }

    case types.START_SHIFT_SETUP: {
      return {
        ...state,
        ui: {
          ...state.ui,
          screen: "shiftSetup",
          mode: action.payload.mode,
          shiftDraft: {
            mode: action.payload.mode,
            employeeIds: [],
            leadId: null,
          },
          sheet: null,
        },
      };
    }

    case types.TOGGLE_SHIFT_EMPLOYEE: {
      const draft = state.ui.shiftDraft;
      if (!draft) return state;

      const { employeeId } = action.payload;
      const exists = draft.employeeIds.includes(employeeId);
      const employeeIds = exists
        ? draft.employeeIds.filter((id) => id !== employeeId)
        : [...draft.employeeIds, employeeId];

      let leadId = draft.leadId;
      if (exists && leadId === employeeId) leadId = null;

      return {
        ...state,
        ui: {
          ...state.ui,
          shiftDraft: {
            ...draft,
            employeeIds,
            leadId,
          },
        },
      };
    }

    case types.SET_SHIFT_LEAD: {
      const draft = state.ui.shiftDraft;
      if (!draft) return state;
      const { employeeId } = action.payload;
      if (!draft.employeeIds.includes(employeeId)) return state;

      return {
        ...state,
        ui: {
          ...state.ui,
          shiftDraft: {
            ...draft,
            leadId: employeeId,
          },
        },
      };
    }

    case types.CREATE_ACTIVE_SHIFT: {
      const draft = state.ui.shiftDraft;
      if (!draft || !draft.employeeIds.length) return state;

      const employees = draft.employeeIds
        .map((id) => state.employees.find((emp) => emp.id === id))
        .filter(Boolean);

      const lead = employees.find((emp) => emp.id === draft.leadId) || null;

      const templateTasks =
        draft.mode === "opening"
          ? state.templates.opening
          : state.templates.closing;

      const activeShift = {
        id: makeId("shift"),
        mode: draft.mode,
        date: todayISO(),
        startedAt: Date.now(),
        completedAt: null,
        employeeIds: employees.map((emp) => emp.id),
        employeeNames: employees.map((emp) => emp.name),
        leadId: lead?.id || null,
        leadName: lead?.name || "",
        tasks: templateTasks.map(normalizeTemplateToShiftTask),
      };

      return {
        ...state,
        activeShift,
        ui: {
          ...state.ui,
          screen: "checklist",
          sheet: null,
          reviewOpen: false,
        },
      };
    }

    case types.CANCEL_ACTIVE_SHIFT: {
      return {
        ...state,
        activeShift: null,
        ui: {
          ...state.ui,
          screen: "home",
          mode: null,
          shiftDraft: null,
          sheet: null,
          reviewOpen: false,
        },
      };
    }

    case types.OPEN_TASK_SHEET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          sheet: { type: "taskActions", payload: action.payload },
        },
      };
    }

    case types.OPEN_ASSIGN_EMPLOYEE_SHEET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          sheet: { type: "assignEmployee", payload: action.payload },
        },
      };
    }

    case types.OPEN_ASSIGN_SECTION_SHEET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          sheet: { type: "assignSection", payload: action.payload },
        },
      };
    }

    case types.OPEN_ADD_EMPLOYEE_SHEET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          sheet: { type: "addEmployee", payload: null },
        },
      };
    }

    case types.OPEN_ADD_OCCASIONAL_TASK_SHEET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          sheet: { type: "addOccasionalTask", payload: null },
        },
      };
    }

    case types.CLOSE_SHEET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          sheet: null,
        },
      };
    }

    case types.ASSIGN_TASK: {
      if (!state.activeShift) return state;
      const { taskId, employeeId } = action.payload;
      const employee = state.employees.find((emp) => emp.id === employeeId);
      if (!employee) return state;

      return {
        ...state,
        activeShift: {
          ...state.activeShift,
          tasks: state.activeShift.tasks.map((task) =>
            task.taskId === taskId
              ? {
                  ...task,
                  assignedTo: employee.id,
                  assignedName: employee.name,
                }
              : task
          ),
        },
        ui: {
          ...state.ui,
          sheet: null,
        },
      };
    }

    case types.ASSIGN_SECTION: {
      if (!state.activeShift) return state;

      const { section, employeeId } = action.payload;
      const employee = state.employees.find((emp) => emp.id === employeeId);
      if (!employee) return state;

      return {
        ...state,
        activeShift: {
          ...state.activeShift,
          tasks: state.activeShift.tasks.map((task) =>
            task.section === section
              ? {
                  ...task,
                  assignedTo: employee.id,
                  assignedName: employee.name,
                }
              : task
          ),
        },
        ui: {
          ...state.ui,
          sheet: null,
        },
      };
    }

    case types.CLEAR_TASK_ASSIGNMENT: {
      if (!state.activeShift) return state;
      const { taskId } = action.payload;

      return {
        ...state,
        activeShift: {
          ...state.activeShift,
          tasks: state.activeShift.tasks.map((task) =>
            task.taskId === taskId
              ? {
                  ...task,
                  assignedTo: null,
                  assignedName: "",
                }
              : task
          ),
        },
        ui: {
          ...state.ui,
          sheet: null,
        },
      };
    }

    case types.TOGGLE_TASK_DONE: {
      if (!state.activeShift) return state;
      const { taskId } = action.payload;

      return {
        ...state,
        activeShift: {
          ...state.activeShift,
          tasks: state.activeShift.tasks.map((task) => {
            if (task.taskId !== taskId) return task;
            const nextDone = !task.done;
            return {
              ...task,
              done: nextDone,
              doneAt: nextDone ? Date.now() : null,
            };
          }),
        },
        ui: {
          ...state.ui,
          sheet: null,
        },
      };
    }

    case types.COMPLETE_SECTION: {
      if (!state.activeShift) return state;
      const { section } = action.payload;
      const now = Date.now();

      return {
        ...state,
        activeShift: {
          ...state.activeShift,
          tasks: state.activeShift.tasks.map((task) =>
            task.section === section
              ? {
                  ...task,
                  done: true,
                  doneAt: now,
                }
              : task
          ),
        },
      };
    }

    case types.UNCOMPLETE_SECTION: {
      if (!state.activeShift) return state;
      const { section } = action.payload;

      return {
        ...state,
        activeShift: {
          ...state.activeShift,
          tasks: state.activeShift.tasks.map((task) =>
            task.section === section
              ? {
                  ...task,
                  done: false,
                  doneAt: null,
                }
              : task
          ),
        },
      };
    }

    case types.ADD_OCCASIONAL_TASK: {
      if (!state.activeShift) return state;
      const template = state.templates.occasional.find(
        (task) => task.id === action.payload.taskTemplateId
      );
      if (!template) return state;

      const alreadyExists = state.activeShift.tasks.some(
        (task) => task.taskId === template.id
      );
      if (alreadyExists) {
        return {
          ...state,
          ui: { ...state.ui, sheet: null },
        };
      }

      return {
        ...state,
        activeShift: {
          ...state.activeShift,
          tasks: [...state.activeShift.tasks, normalizeTemplateToShiftTask(template)],
        },
        ui: {
          ...state.ui,
          sheet: null,
        },
      };
    }

    case types.OPEN_END_SHIFT_REVIEW: {
      return {
        ...state,
        ui: {
          ...state.ui,
          reviewOpen: true,
        },
      };
    }

    case types.CLOSE_END_SHIFT_REVIEW: {
      return {
        ...state,
        ui: {
          ...state.ui,
          reviewOpen: false,
        },
      };
    }

    case types.CONFIRM_END_SHIFT: {
      if (!state.activeShift) return state;
      const snapshot = createHistorySnapshot(state.activeShift);

      return {
        ...state,
        history: [snapshot, ...state.history],
        activeShift: null,
        ui: {
          ...state.ui,
          screen: "home",
          mode: null,
          shiftDraft: null,
          sheet: null,
          reviewOpen: false,
          selectedHistoryId: null,
        },
      };
    }

    default:
      return state;
  }
}
