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

export type ComponentId = keyof typeof genericComponents;

export default Component;