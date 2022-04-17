import Mentor from "../TeamMember/Mentor";
import Student from "../TeamMember/Student";

type Team = {
    students: Student[];
    mentors: Mentor[];
    coach: Mentor;
};

export default Team;