import ensureType from "@/util/ensureType";

type Item = {
    name: string;
    price?: number;
    description: string;
};

export const items = ensureType<Item>()({
    METAL: {
        name: "Metal",
        price: 5,
        description: "Raw metal to use for fabricating robot parts."
    },
    GEAR: {
        name: "Gear",
        price: 10,
        description: "A common part used to create robot mechanisms."
    },
    WHEEL: {
        name: "Wheel",
        price: 20,
        description: "A textured wheel that can be used in drivetrains, intakes, and outtakes."
    },
    OMNI_WHEEL: {
        name: "Omni Wheel",
        price: 30,
        description: "A special wheel lined with rollers that allow for lateral motion."
    },
    MOTOR: {
        name: "Motor",
        price: 75,
        description: "Motors are what makes things spin!"
    },
    LIMIT_SWITCH: {
        name: "Limit Switch",
        price: 20,
        description: "Limit switches can be used to create physical stopping points for mechanisms."
    },
    CAMERA: {
        name: "Camera",
        price: 50,
        description: "Gives your drivers an extra vantage point. Can also be used to make a vision module."
    },
    LED: {
        name: "LEDs",
        price: 10,
        description: "Can be used to make vision modules, or to make your robot look cooler!"
    },
    ENCODER: {
        name: "Encoder",
        price: 50,
        description: "Measures shaft rotation, allowing robot software to measure its own motion."
    },
    GYRO: {
        name: "Gyro",
        price: 50,
        description: "Measures robot angle, allowing robot software to turn more precisely."
    },
    ELECTRONICS_KIT: {
        name: "Core Electronics Kit",
        price: 750,
        description: "Includes a robot controller, power board, battery, and everything else needed to get your robot up and running!"
    },
    PREBUILT_SWERVE_MODULE: {
        name: "Pre-built Swerve Module",
        price: 450,
        description: "Fully pre-assembled swerve module for use on a swerve drivetrain."
    }
} as const);

export type ItemId = keyof typeof items;

export default Item;