import Task from "../Task"

type Workspace = {
    type: "Desk" | "Workbench",
    currentTask: Task | null
};

export const createWorkspace = (type: "Desk" | "Workbench"): Workspace => {
    return {
        type,
        currentTask: null
    };
};

export default Workspace;