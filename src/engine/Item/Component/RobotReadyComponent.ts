import ensureType from "@/util/ensureType";
import Component, { ComponentId, genericComponents } from ".";
import { ItemId } from "..";
import Stats from "./Stats";
import { UpgradeId } from "./Upgrades";

export type ComponentType = "DRIVETRAIN" | "SHOOTER" | "CLIMBER" | "INTAKE";

export type RobotReadyComponent = {
    baseStats: Stats;
    upgrades?: Readonly<{ id: UpgradeId, maxLevel?: 1 | 2 | 3 }[]>;
    type: ComponentType;
} & Component<ComponentId | ItemId>;

export const robotReadyComponents = ensureType<RobotReadyComponent>()({
    TANK_DRIVE: {
        type: "DRIVETRAIN",
        name: "Tank Drive",
        description: "A simple six-wheel drive base with traction wheels. Easy to build, easy to drive.",
        recipe: [
            { itemId: "WHEEL", count: 6 },
            { itemId: "MOTOR", count: 4 },
            { itemId: "GEAR", count: 4 },
            { itemId: "METAL", count: 20 }
        ],
        skillRequirements: { building: 2, programming: 2 },
        baseStats: { agility: 2, traction: 9, durability: 9 },
        upgrades: [{ id: "SHIFTING_GEARBOXES" }, { id: "DURABILITY", maxLevel: 1 }]
    },
    WEST_COAST_DRIVE: {
        type: "DRIVETRAIN",
        name: "West Coast Drive",
        description: "An 8-wheel drive base with omni wheels at the corners. Keeps most of the traction of a tank drive while adding mobility.",
        recipe: [
            { itemId: "WHEEL", count: 4 },
            { itemId: "OMNI_WHEEL", count: 4 },
            { itemId: "MOTOR", count: 4 },
            { itemId: "GEAR", count: 6 },
            { itemId: "METAL", count: 30 }
        ],
        skillRequirements: { building: 4, programming: 2 },
        baseStats: { agility: 6, traction: 6, durability: 8 },
        upgrades: [{ id: "SHIFTING_GEARBOXES" }, { id: "DURABILITY", maxLevel: 2 }]
    },
    MECANUM_DRIVE: {
        type: "DRIVETRAIN",
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
        type: "DRIVETRAIN",
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
    },

    PASSIVE_INTAKE: {
        type: "INTAKE",
        name: "Passive Intake",
        description: "A bucket that carries balls dropped by human players. Very poor cycle time but extremely simple.",
        recipe: [
            { itemId: "METAL", count: 5 }
        ],
        skillRequirements: { building: 1 },
        baseStats: { pickupEase: 1, durability: 10 }
    },
    FLOOR_INTAKE: {
        type: "INTAKE",
        name: "Floor Intake",
        description: "An active floor intake that sits within the robot frame.",
        recipe: [
            { itemId: "MOTOR", count: 2 },
            { itemId: "WHEEL", count: 4 },
            { itemId: "GEAR", count: 4 },
            { itemId: "METAL", count: 5 }
        ],
        skillRequirements: { building: 3, programming: 1 },
        baseStats: { pickupEase: 6, durability: 8 },
        upgrades: [{ id: "DURABILITY", maxLevel: 1 }]
    },
    EXTERNAL_INTAKE: {
        type: "INTAKE",
        name: "External Floor Intake",
        description: "Active floor intake that extends outside the robot frame, allowing maximum pickup range.",
        recipe: [
            { itemId: "MOTOR", count: 3 },
            { itemId: "WHEEL", count: 6 },
            { itemId: "GEAR", count: 6 },
            { itemId: "METAL", count: 10 }
        ],
        skillRequirements: { building: 5, programming: 2 },
        baseStats: { pickupEase: 10, durability: 4 },
        upgrades: [{ id: "DURABILITY" }]
    },

    LOW_SHOOTER: {
        type: "SHOOTER",
        name: "Low-Goal Ball Shooter",
        description: "Fires balls into the low goal with good accuracy.",
        recipe: [
            { itemId: "MOTOR", count: 2 },
            { itemId: "WHEEL", count: 2 },
            { itemId: "GEAR", count: 2 },
            { itemId: "METAL", count: 5 }
        ],
        skillRequirements: { building: 3, programming: 1 },
        baseStats: { lowAccuracy: 7, durability: 9 },
        upgrades: [{ id: "DURABILITY", maxLevel: 1 }, { id: "ACCURACY", maxLevel: 2 }]
    },
    HIGH_SHOOTER: {
        type: "SHOOTER",
        name: "High-Goal Ball Shooter",
        description: "Compact mechanism that fires balls into the high goal. Cannot fire into the low goal.",
        recipe: [
            { itemId: "MOTOR", count: 4 },
            { itemId: "WHEEL", count: 4 },
            { itemId: "GEAR", count: 4 },
            { itemId: "METAL", count: 10 }
        ],
        skillRequirements: { building: 5, programming: 1 },
        baseStats: { highAccuracy: 1, durability: 7 },
        upgrades: [{ id: "DURABILITY", maxLevel: 1 }, { id: "ACCURACY" }]
    },
    HYBRID_SHOOTER: {
        type: "SHOOTER",
        name: "Hybrid Ball Shooter",
        description: "Adjustable shooting mechanism that can fire into both low and high goals.",
        recipe: [
            { itemId: "MOTOR", count: 5 },
            { itemId: "WHEEL", count: 4 },
            { itemId: "GEAR", count: 8 },
            { itemId: "METAL", count: 15 }
        ],
        skillRequirements: { building: 6, programming: 2 },
        baseStats: { lowAccuracy: 6, highAccuracy: 1, durability: 5 },
        upgrades: [{ id: "DURABILITY", maxLevel: 2 }, { id: "ACCURACY" }]
    }
});

export type RobotReadyComponentId = keyof typeof robotReadyComponents;

export const getComponentData = (id: ComponentId | RobotReadyComponentId): Component<ItemId | ComponentId> => {
    if (!!robotReadyComponents[id as RobotReadyComponentId]) return robotReadyComponents[id as RobotReadyComponentId];
    return genericComponents[id as ComponentId];
}

export default RobotReadyComponent;