import Task from "../Task";

export type CommonSkills = {
    building: number;
    programming: number;
    marketing: number;
};

type TeamMember = {
    firstName: string;
    lastName: string;
    skills: CommonSkills;
    currentTask: Task | null;
    absent: boolean;
};

export default TeamMember;