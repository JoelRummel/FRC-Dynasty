import ensureType from "@/util/ensureType";
import { ComponentId } from ".";
import { ItemId } from "..";
import Stats from "./Stats";

type Upgrade = {
    cost: Readonly<{ itemId: ComponentId | ItemId, count: number }[]>,
    skillReqChanges: { building?: number, programming?: number },
    statChanges: Stats,
    descriptionOverride?: string
};

type UpgradePath = {
    name: string,
    description: string,
    upgrades: Upgrade[]
};

export const UPGRADES = ensureType<UpgradePath>()({
    DURABILITY: {
        name: "Durability",
        description: "Reinforces the mechanism, making it less likely to break during a match.",
        upgrades: [
            {
                cost: [{ itemId: "METAL", count: 5 }],
                skillReqChanges: { building: -1 },
                statChanges: { durability: 1 }
            },
            {
                cost: [{ itemId: "METAL", count: 10 }],
                skillReqChanges: { building: 1 },
                statChanges: { durability: 2 }
            },
            {
                cost: [{ itemId: "METAL", count: 15 }],
                skillReqChanges: { building: 2 },
                statChanges: { durability: 4 }
            }
        ]
    },
    ACCURACY: {
        name: "Accuracy",
        description: "Improves the construction quality of the shooter, making it more likely to score.",
        upgrades: [
            {
                cost: [{ itemId: "METAL", count: 5 }],
                skillReqChanges: { building: 1 },
                statChanges: { lowAccuracy: 1, highAccuracy: 1 }
            },
            {
                cost: [{ itemId: "METAL", count: 5 }, { itemId: "ENCODER", count: 1 }],
                skillReqChanges: { building: 3, programming: 2 },
                statChanges: { lowAccuracy: 3, highAccuracy: 3 },
                descriptionOverride: "Adds a shaft encoder to ensure consistent flywheel speed."
            },
            {
                cost: [{ itemId: "METAL", count: 5 }, { itemId: "VISION_MODULE", count: 1 }],
                skillReqChanges: { building: 2, programming: 5 },
                statChanges: { lowAccuracy: 3, highAccuracy: 5 },
                descriptionOverride: "Vision tracking allows accurate high-goal firing at multiple ranges."
            }
        ]
    },
    SPEED: {
        name: "Efficiency",
        description: "Increases the speed at which the mechanism can perform, making it more efficient.",
        upgrades: [
            {
                cost: [{ itemId: "METAL", count: 5 }],
                skillReqChanges: { building: -1 },
                statChanges: { speed: 1 }
            },
            {
                cost: [{ itemId: "METAL", count: 10 }, { itemId: "ENCODER", count: 1 }],
                skillReqChanges: { building: 1, programming: 2 },
                statChanges: { speed: 3 }
            }
        ]
    },
    SHIFTING_GEARBOXES: {
        name: "Shifting Gearboxes",
        description: "Adds shifting gearboxes, allowing the driver to switch between speed and strength.",
        upgrades: [
            {
                cost: [{ itemId: "METAL", count: 10 }, { itemId: "GEAR", count: 6 }],
                skillReqChanges: { building: 3, programming: 0 },
                statChanges: { agility: 1, traction: 1 }
            }
        ]
    }
});

export type UpgradeId = keyof typeof UPGRADES;

export default UpgradePath;