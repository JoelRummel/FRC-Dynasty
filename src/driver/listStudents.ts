import Team from "../engine/Team";
import { getStudentStateString } from "@/engine/TeamMember/Student";
import { buildStatBars } from "@/util/buildTextBar";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const listStudents = (team: Team, { presentOnly = false, availableOnly = false, listSkills = false, mentorsToo = false, promptChoice = false, excludedIds = [] }:
    { presentOnly?: boolean, availableOnly?: boolean, listSkills?: boolean, mentorsToo?: boolean, promptChoice?: boolean, excludedIds?: string[] } = { excludedIds: [] }): string | undefined => {

    const log = (str: string) => {
        console.log(str);
    }

    const choices: string[] = [];
    log(`All ${presentOnly ? 'present ' : ''}students ${availableOnly ? 'available for tasking' : ''}:`);
    let counter = 1;
    for (const [id, student] of Object.entries(team.students)) {
        if ((!availableOnly || !student.currentTask) && (!presentOnly || !student.absent) && !excludedIds.includes(id)) {
            let str = `    ${promptChoice ? `${counter < 10 ? ' ' : ''}${counter})` : ''}${getStudentStateString(student)}`;
            if (listSkills) str += '        ' + buildStatBars(student.skills);
            choices.push(id);
            log(str);
        }
        counter++;
    }

    if (mentorsToo) {
        log(`\nAll ${presentOnly ? 'present ' : ''}mentors ${availableOnly ? 'available for tasking' : ''}:`);
        for (const [id, mentor] of Object.entries(team.mentors)) {
            if ((!availableOnly || !mentor.currentTask) && (!presentOnly || !mentor.absent) && !excludedIds.includes(id)) {
                let str = `    ${promptChoice ? `${counter < 10 ? ' ' : ''}${counter})` : ''}${mentor.firstName} ${mentor.lastName}`;
                if (listSkills) str += '        ' + buildStatBars(mentor.skills)
                choices.push(id);
                log(str);
            }
            counter++;
        }
    }

    if (promptChoice) {
        const choice = prompt(`Choose a student${mentorsToo ? ' or mentor' : ''}: `);
        return choices[parseInt(choice) - 1];
    }
};

export default listStudents;