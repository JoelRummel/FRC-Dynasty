import { ComponentId } from "../Item/Component"
import { RobotReadyComponentId } from "../Item/Component/RobotReadyComponent";
import { UpgradeId } from "../Item/Component/Upgrades";
import Mentor from "../TeamMember/Mentor"
import Student from "../TeamMember/Student"

type Task = {
    type: "building" | "upgrading" | "skills",
    componentId?: ComponentId,
    robotReadyComponentId?: RobotReadyComponentId,      // Only one component ID should be specified.
    upgradeId?: UpgradeId,
    mentor?: Mentor,
    students: Student[],
    studentsSecondary?: Student[],  // For things like software.
    workRemaining: number
};

export const advanceTask = (task: Task) => {
    // TODO: reduce workRemaining based on students/mentors working
}

export default Task;