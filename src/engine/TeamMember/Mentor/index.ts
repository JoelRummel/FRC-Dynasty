import { generateNames } from '@/config/names';
import { randChoice, randRange } from '@/util/rand';
import TeamMember from '..';

export type Profession = "Construction" | "Mechanical Engineer" | "Factory Worker" |
    "Software Engineer" | "Software Developer" | "Salesperson" | "Marketer" | "Manager" | "Sports Coach"

type Mentor = {
    age: number;
    profession: Profession;
    motivator: "To Teach" | "To Compete" | "To Volunteer";
} & TeamMember;

export const createMentor = (background?: Profession): Mentor => {
    const { firstName, lastName } = generateNames(Math.random() < 0.5 ? "M" : "F");
    return {
        firstName,
        lastName,
        skills: {
            building: randRange(3, 9),
            programming: randRange(3, 9),
            marketing: randRange(3, 9)
        },
        currentTask: null,
        age: randRange(28, 65),
        profession: background || randChoice(["Mechanical Engineer", "Software Engineer", "Salesperson"]),
        motivator: randChoice(["To Teach", "To Compete", "To Volunteer"])
    }
};

export default Mentor;