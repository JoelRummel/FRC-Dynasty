export const moodFactorTypes = {
    "ROBOT_PROGRESSING": {
        "rate": 0.6,
        "negativeRate": 0.6,
        "positiveDescription": "Likes to see progress with the robot",
        "negativeDescription": "Wants to see faster robot progress",
        "amount": 1
    },
    "DOING_REAL_WORK": {
        "rate": 0.6,
        "negativeRate": 0.6,
        "positiveDescription": "Is happy to have done work for the robot",
        "negativeDescription": "Wishes their work would appear on the robot",
        "amount": 1
    },
    "LEARNING_SKILLS": {
        "rate": 0.4,
        "negativeRate": 0.4,
        "positiveDescription": "Is glad to be learning new things",
        "negativeDescription": "Feels like they aren't learning new things",
        "amount": 1
    },
    "SURROUNDING_MOOD": {
        "rate": 0.4,
        "negativeRate": 0.4,
        "positiveDescription": "Is feeling uplifted by other happy teammates",
        "negativeDescription": "Is feeling brought down by other negative teammates",
        "amount": 1.5
    },
    "TEAM_SUCCESS": {
        "rate": 0.5,
        "negativeRate": 0.5,
        "positiveDescription": "Is happy to see the team succeeding",
        "negativeDescription": "Wishes the team was more successful",
        "amount": 1
    },
    "LEADERSHIP_POSITION": {
        "rate": 0.8,
        "negativeRate": 0.8,
        "positiveDescription": "Is happy to be in a leadership position",
        "negativeDescription": "Wishes they were in a leadership position",
        "amount": 1
    },
    "DRIVING_POSITION": {
        "rate": 0.9,
        "negativeRate": 0.15,
        "positiveDescription": "Is happy to be driving the robot",
        "negativeDescription": "Wishes they were driving the robot",
        "amount": 1.5
    },
    "POOR_BEHAVIOR": {
        "rate": 0.5,
        "negativeRate": 0.5,
        "positiveDescription": "Is glad that poor behavior was disciplined",
        "negativeDescription": "Is unhappy to see poor behavior go undisciplined",
        "amount": 1
    },
    "WAS_DISCIPLINED": {
        "rate": 0,
        "negativeRate": 1,
        "positiveDescription": "",
        "negativeDescription": "Is unhappy about having been disciplined",
        "amount": 2
    },
    "LED_BY_JUNIOR": {
        "rate": 0,
        "negativeRate": 0.4,
        "positiveDescription": "",
        "negativeDescription": "Is frustrated by their leader being less senior than them",
        "amount": 1
    },
    "TOO_MANY_MEETINGS": {
        "rate": 0,
        "negativeRate": 0.25,
        "positiveDescription": "",
        "negativeDescription": "Is frustrated by the high number of meetings",
        "amount": 1
    }
} as const;

export type MoodFactor = {
    factor: keyof typeof moodFactorTypes;
    data: typeof moodFactorTypes[keyof typeof moodFactorTypes];
    type: "positive" | "negative";
    lifetimeRemaining: number;
};
export default MoodFactor;

export const moodFactorFactory = (type: keyof typeof moodFactorTypes, isPositive = true): MoodFactor => {
    return {
        factor: type,
        data: moodFactorTypes[type],
        type: isPositive ? "positive" : "negative",
        lifetimeRemaining: 3
    };
};
