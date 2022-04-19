import Team from ".";
import { ItemId } from "../Item";
import Component, { ComponentId, genericComponents } from "../Item/Component";
import RobotReadyComponent, { RobotReadyComponentId, robotReadyComponents } from "../Item/Component/RobotReadyComponent";
import { UpgradeId } from "../Item/Component/Upgrades";
import Task from "../Task";

const calcTotalWork = (buildReqs: { building?: number, programming?: number }): number => {
    return 100 + ((buildReqs.building || 0) * 10) + ((buildReqs.programming || 0) * 10);
};

export const assignBuildTask = (
    team: Team,
    builderIds: string[],
    programmerIds: string[],
    item: { componentId?: ComponentId, robotReadyComponentId?: RobotReadyComponentId },
    mentorId?: string,
) => {
    const { componentId, robotReadyComponentId } = item;
    let itemData: RobotReadyComponent | Component<ItemId> | undefined = componentId && genericComponents[componentId];
    if (robotReadyComponentId) itemData = robotReadyComponents[robotReadyComponentId];
    console.log(itemData);

    const task: Task = {
        type: "building",
        mentor: mentorId ? team.mentors[mentorId] : undefined,
        students: builderIds.map(id => team.students[id]),
        studentsSecondary: programmerIds.map(id => team.students[id]),
        componentId,
        robotReadyComponentId,
        workRemaining: calcTotalWork(itemData!.skillRequirements)
    }
    for (const workbench of team.workbenches) {
        if (!workbench.currentTask) {
            workbench.currentTask = task;
            break;
        }
    }
    for (const id of [...builderIds, ...programmerIds]) team.students[id].currentTask = task;
    if (mentorId) team.mentors[mentorId].currentTask = task;
};

export const assignUpgradeTask = (
    team: Team,
    builderIds: string[],
    programmerIds: string[],
    itemId: RobotReadyComponentId,
    upgradeId: UpgradeId
) => {

}