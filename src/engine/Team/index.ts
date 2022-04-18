import Mentor, { createMentor, Profession } from "../TeamMember/Mentor";
import Student, { createStudent } from "../TeamMember/Student";
import Workspace, { createWorkspace } from "../Workspace";

type Team = {
    students: Record<string, Student>;
    mentors: Record<string, Mentor>;
    workbenches: Workspace[];
    desks: Workspace[];
    coachId: "COACH";
};

export const createTeam = (coachType: Profession): Team => {
    return {
        students: {
            "student1": createStudent(),
            "student2": createStudent(),
            "student3": createStudent(),
            "student4": createStudent(),
            "student5": createStudent(),
            "student6": createStudent()
        },
        mentors: {
            "COACH": createMentor(coachType),
            "mentor1": createMentor()
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
        coachId: "COACH"
    }
}

export default Team;