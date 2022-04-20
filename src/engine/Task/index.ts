import { ComponentId } from "../Item/Component"
import RobotComponentState from "../Item/Component/RobotComponentState";
import { getComponentData, RobotReadyComponentId } from "../Item/Component/RobotReadyComponent";
import { UpgradeId } from "../Item/Component/Upgrades";
import Mentor from "../TeamMember/Mentor"
import Student from "../TeamMember/Student"

type GenericTask = {
    type: string,
    mentor?: Mentor,
    students: Student[],
    workRemaining: number
};

export type BuildTask = {
    type: "build",
    componentId: ComponentId | RobotReadyComponentId,
    studentsSoftware: Student[]
} & GenericTask;

export type UpgradeTask = {
    type: "upgrade",
    robotComponent: RobotComponentState,
    upgradeId?: UpgradeId,
    studentsSoftware: Student[]
} & GenericTask;

export type SkillsTask = {
    type: "skills",
    skill: "building" | "programming" | "marketing"
}

type Task = BuildTask | UpgradeTask | SkillsTask;

export const getTaskName = (task: Task): string => {
    if (task.type === "build") return `Building ${getComponentData(task.componentId).name}`;
    if (task.type === "upgrade") return `Upgrading ${getComponentData(task.robotComponent.componentId).name}`;
    return `Developing ${task.skill} skills`;
}

export const advanceTask = (task: Task) => {
    // TODO: reduce workRemaining based on students/mentors working
}

export default Task;