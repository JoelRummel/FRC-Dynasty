import { randRange } from "@/util/rand";
import { RobotReadyComponentId, robotReadyComponents } from "./RobotReadyComponent";
import Stats from "./Stats";
import { UpgradeId, UPGRADES } from "./Upgrades"

type RobotComponentState = {
    id: number,
    componentId: RobotReadyComponentId,
    upgrades: { type: UpgradeId, level: 1 | 2 | 3 }[],
    broken: boolean
};

export const getRobotComponentStats = (component: RobotComponentState): Stats => {
    const { baseStats } = robotReadyComponents[component.componentId];
    for (const upgrade of component.upgrades) {
        const upgradePath = UPGRADES[upgrade.type];
        const statChanges = upgradePath.upgrades[upgrade.level - 1].statChanges;
        for (const [stat, value] of Object.entries(statChanges)) {
            baseStats[stat as keyof typeof baseStats] += value;
        }
    }
    return baseStats;
};

export const createRobotComponent = (componentId: RobotReadyComponentId): RobotComponentState => {
    return {
        id: randRange(1, 999999),
        componentId: componentId,
        upgrades: [],
        broken: false
    };
};

export default RobotComponentState;