import MoodFactor from "./MoodFactor";

type Mood = MoodFactor[];

export const getOverallMood = (mood: Mood): number => {
    let overall = 0;
    for (const factor of mood) {
        if (factor.type === "positive") overall += factor.data?.amount || 1;
        else overall -= factor.data?.amount || 1;
    }
    return overall;
};

export const getOverallMoodEmoji = (mood: Mood): string => {
    const overall = getOverallMood(mood);
    if (overall >= 6) return "🤩";
    if (overall >= 4) return "😁";
    if (overall >= 2) return "😀";
    if (overall <= -6) return "😡";
    if (overall <= -4) return "😒";
    if (overall <= -2) return "😕";
    return "🙂";
}

export const progressMoodState = (mood: Mood): Mood => {
    return mood.map(factor => { factor.lifetimeRemaining--; return factor; }).filter(factor => factor.lifetimeRemaining > 0);
};

export default Mood;