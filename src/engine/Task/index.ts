import { ComponentId } from "../Item/Component"
import { UpgradeId } from "../Item/Component/Upgrades";
import Mentor from "../TeamMember/Mentor"
import Student from "../TeamMember/Student"

type Task = {
    type: "building" | "upgrading" | "skills",
    itemId?: ComponentId,
    upgradeId?: UpgradeId,
    mentor?: Mentor,
    students: Student[],
    daysRemaining: number
};

export default Task;