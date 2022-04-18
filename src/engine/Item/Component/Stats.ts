export type DrivetrainStats = {
    agility?: number,
    traction?: number,
    durability?: number
};

export type ClimberStats = {
    level?: "low" | "mid" | "high",
    speed?: number,
    durability?: number
};

export type IntakeStats = {
    pickupEase?: number,
    durability?: number
};

export type ShooterStats = {
    lowAccuracy?: number,
    highAccuracy?: number
}

type Stats = DrivetrainStats | ClimberStats | IntakeStats | ShooterStats;

export default Stats;