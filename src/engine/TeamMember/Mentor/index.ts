import TeamMember from '..';

type Profession = "Construction" | "Mechanical Engineer" | "Factory Worker" |
    "Software Engineer" | "Software Developer" | "Salesperson" | "Marketer" | "Manager";

type Mentor = {
    age: number;
    profession: Profession;
    motivator: "To Teach" | "To Compete";
} & TeamMember;

export default Mentor;