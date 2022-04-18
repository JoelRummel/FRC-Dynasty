import { generateNames } from '@/config/names';
import { randChoice, randRange } from '@/util/rand';
import TeamMember, { CommonSkills } from '..';
import Mood from './Mood';
import { moodFactorTypes } from './MoodFactor';

type halfRange = 0 | 1 | 2 | 3 | 4 | 5;
type fullRange = halfRange | 6 | 7 | 8 | 9 | 10;

type MoodTraits = {
    [key in keyof typeof moodFactorTypes]?: "positive" | "negative" | "both";
};

type Student = {
    year: 0 | 1 | 2 | 3;
    desiredSkill: "building" | "programming" | "marketing";
    skills: {
        scouting: halfRange;
        driving: fullRange;
    } & CommonSkills;

    hiddenStats: {
        discipline: halfRange;
        passion: halfRange;
    }

    moodTraits: MoodTraits;
    state: {
        motivation: number;
        mood: Mood;
    }
} & TeamMember;

export const createStudent = (): Student => {
    let moodTraits: MoodTraits = {};
    for (const key of Object.keys(moodFactorTypes)) {
        const tKey = key as keyof typeof moodFactorTypes;
        const moodFactorType = moodFactorTypes[tKey];
        let rand = Math.random();
        if (rand < moodFactorType.negativeRate && rand < moodFactorType.rate) moodTraits = { ...moodTraits, [key]: "both" };
        else if (rand < moodFactorType.negativeRate) moodTraits = { ...moodTraits, [key]: "negative" };
        else if (rand < moodFactorType.rate) moodTraits = { ...moodTraits, [key]: "positive" };
    }

    const { firstName, lastName } = generateNames(Math.random() < 0.5 ? 'M' : 'F');
    return {
        firstName,
        lastName,
        year: randChoice([0, 1, 2, 3]),
        desiredSkill: randChoice(["building", "programming", "marketing"]),
        skills: {
            building: randRange(0, 6) as fullRange,
            programming: randRange(0, 6) as fullRange,
            marketing: randRange(0, 6) as fullRange,
            scouting: randRange(0, 5) as halfRange,
            driving: randRange(0, 5) as halfRange
        },

        hiddenStats: {
            discipline: randRange(0, 5) as halfRange,
            passion: randRange(0, 5) as halfRange
        },

        moodTraits,
        state: {
            motivation: 0,
            mood: []
        },

        currentTask: null
    }
};

export default Student;