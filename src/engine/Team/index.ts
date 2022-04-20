import { ItemId } from "../Item";
import { ComponentId } from "../Item/Component";
import RobotComponentState from "../Item/Component/RobotComponentState";
import Robot from "../Robot";
import Mentor, { createMentor, Profession } from "../TeamMember/Mentor";
import Student, { createStudent } from "../TeamMember/Student";
import Workspace, { createWorkspace } from "../Workspace";

type Team = {
    students: Record<string, Student>;
    mentors: Record<string, Mentor>;
    workbenches: Workspace[];
    desks: Workspace[];
    robots: Robot[];
    inventory: {
        items: { itemId: ItemId | ComponentId, count: number }[],
        components: RobotComponentState[]
    };
    coachId: string;
};

const addStudentToTeam = (team: Team, student: Student) => {
    team.students[student.id] = student;
};

const addMentorToTeam = (team: Team, mentor: Mentor) => {
    team.mentors[mentor.id] = mentor;
};

export const createTeam = (coachType: Profession): Team => {
    const team: Team = {
        students: {},
        mentors: {},
        robots: [],
        inventory: {
            items: [],
            components: []
        },
        workbenches: [
            createWorkspace("Workbench"),
            createWorkspace("Workbench")
        ],
        desks: [
            createWorkspace("Desk"),
            createWorkspace("Desk"),
            createWorkspace("Desk"),
            createWorkspace("Desk"),
            createWorkspace("Desk")
        ],
        coachId: ""
    };

    for (let i = 0; i < 6; i++) addStudentToTeam(team, createStudent());
    const coach = createMentor(coachType);
    addMentorToTeam(team, coach);
    team.coachId = coach.id;

    addMentorToTeam(team, createMentor());

    return team;
}

export default Team;