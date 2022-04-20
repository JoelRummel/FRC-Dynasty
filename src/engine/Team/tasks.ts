import Team from ".";
import { ItemId } from "../Item";
import Component, { ComponentId, genericComponents } from "../Item/Component";
import RobotReadyComponent, { getComponentData, RobotReadyComponentId, robotReadyComponents } from "../Item/Component/RobotReadyComponent";
import { UpgradeId } from "../Item/Component/Upgrades";
import Task, { BuildTask } from "../Task";
import Mentor from "../TeamMember/Mentor";
import Student from "../TeamMember/Student";

const calcTotalWork = (buildReqs: { building?: number, programming?: number }): number => {
    return 100 + ((buildReqs.building || 0) * 10) + ((buildReqs.programming || 0) * 10);
};

export const assignBuildTask = (
    team: Team,
    builders: Student[],
    programmers: Student[],
    componentId: ComponentId | RobotReadyComponentId,
    mentor?: Mentor,
) => {
    const itemData = getComponentData(componentId);

    const task: BuildTask = {
        type: "build",
        mentor,
        students: builders,
        studentsSoftware: programmers,
        componentId,
        workRemaining: calcTotalWork(itemData.skillRequirements)
    }
    for (const workbench of team.workbenches) {
        if (!workbench.currentTask) {
            workbench.currentTask = task;
            break;
        }
    }
    for (const student of [...builders, ...programmers]) student.currentTask = task;
    if (mentor) mentor.currentTask = task;
};

export const assignUpgradeTask = (
    team: Team,
    builderIds: string[],
    programmerIds: string[],
    itemId: RobotReadyComponentId,
    upgradeId: UpgradeId
) => {

}