export type CommonSkills = {
    building: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    programming: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    marketing: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

type TeamMember = {
    firstName: string;
    lastName: string;
    skills: CommonSkills;
    currentTask: any;
};

export default TeamMember;