import ensureType from "@/util/ensureType";
import Item, { ItemId } from "..";
import Stats from "./Stats";
import { UpgradeId } from "./Upgrades";

type Component<IngredientId> = {
    recipe: Readonly<{ itemId: IngredientId, altId?: IngredientId, count: number }[]>;
    skillRequirements: {
        building?: number,
        programming?: number
    };
} & Item;

export type RobotReadyComponent = {
    baseStats: Stats,
    upgrades?: Readonly<{ id: UpgradeId, maxLevel?: 1 | 2 | 3 }[]>;
} & Component<ComponentId>;

export const genericComponents = ensureType<Component<ItemId>>()({
    SWERVE_MODULE: {
        name: "Swerve Module",
        description: "A complex mechanism that can both drive a traction wheel and point it in any direction.",
        recipe: [
            { itemId: "WHEEL", count: 1 },
            { itemId: "MOTOR", count: 2 },
            { itemId: "ENCODER", count: 1 },
            { itemId: "GEAR", count: 4 },
            { itemId: "METAL", count: 5 }
        ],
        skillRequirements: { building: 8 }
    },
    VISION_MODULE: {
        name: "Vision Module",
        description: "Mounted camera that enables vision tracking.",
        recipe: [
            { itemId: "CAMERA", count: 1 },
            { itemId: "LED", count: 2 },
            { itemId: "METAL", count: 3 }
        ],
        skillRequirements: { building: 1, programming: 5 }
    },
    ELEVATOR_FRAME: {
        name: "Elevator Frame",
        description: "Frame that can be used to build mechanisms that extend upwards.",
        recipe: [
            { itemId: "METAL", count: 15 }
        ],
        skillRequirements: { building: 3 }
    }
} as const);

export type ComponentId = keyof typeof genericComponents | ItemId;

export const driveTrains = ensureType<RobotReadyComponent>()({
    TANK_DRIVE: {
        name: "Tank Drive",
        description: "A simple six-wheel drive base with traction wheels. Easy to build, easy to drive.",
        recipe: [
            { itemId: "WHEEL", count: 6 },
            { itemId: "MOTOR", count: 4 },
            { itemId: "GEAR", count: 4 },
            { itemId: "METAL", count: 20 }
        ],
        skillRequirements: { building: 1, programming: 1 },
        baseStats: { agility: 3, traction: 9, durability: 9 },
        upgrades: [{ id: "SHIFTING_GEARBOXES" }, { id: "DURABILITY", maxLevel: 1 }]
    },
    WEST_COAST_DRIVE: {
        name: "West Coast Drive",
        description: "An 8-wheel drive base with omni wheels at the corners. Keeps most of the traction of a tank drive while adding mobility.",
        recipe: [
            { itemId: "WHEEL", count: 4 },
            { itemId: "OMNI_WHEEL", count: 4 },
            { itemId: "MOTOR", count: 4 },
            { itemId: "GEAR", count: 6 },
            { itemId: "METAL", count: 30 }
        ],
        skillRequirements: { building: 4, programming: 1 },
        baseStats: { agility: 6, traction: 7, durability: 8 },
        upgrades: [{ id: "SHIFTING_GEARBOXES" }, { id: "DURABILITY", maxLevel: 2 }]
    },
    MECANUM_DRIVE: {
        name: "Mecanum Drive",
        description: "A special drivetrain that exchanges traction for the ability to move in any direction.",
        recipe: [
            { itemId: "OMNI_WHEEL", count: 4 },
            { itemId: "MOTOR", count: 4 },
            { itemId: "GYRO", count: 1 },
            { itemId: "GEAR", count: 6 },
            { itemId: "METAL", count: 25 }
        ],
        skillRequirements: { building: 3, programming: 5 },
        baseStats: { agility: 9, traction: 1, durability: 8 },
        upgrades: [{ id: "DURABILITY", maxLevel: 2 }]
    },
    SWERVE_DRIVE: {
        name: "Swerve Drive",
        description: "A special drivetrain that can move in any direction without sacrificing traction. Very heavy in motor usage.",
        recipe: [
            { itemId: "SWERVE_MODULE", altId: "PREBUILT_SWERVE_MODULE", count: 4 },
            { itemId: "GYRO", count: 1 },
            { itemId: "METAL", count: 25 }
        ],
        skillRequirements: { building: 4, programming: 8 },
        baseStats: { agility: 10, traction: 8, durability: 5 },
        upgrades: [{ id: "DURABILITY", maxLevel: 3 }]
    }
});

export default Component;