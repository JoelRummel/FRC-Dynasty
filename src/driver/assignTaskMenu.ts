import chalk from "chalk";
import { ComponentId, genericComponents } from "@/engine/Item/Component";
import Team from "../engine/Team";
import { assignBuildTask } from "@/engine/Team/tasks";
import askChoice from "@/util/askChoice";
import { buildStatBars } from "@/util/buildTextBar";
import listStudents from "./listStudents";
import Mentor from "../engine/TeamMember/Mentor";
import Student from "../engine/TeamMember/Student";
import promptSync from "prompt-sync";
import TeamMember from "../engine/TeamMember";

const prompt = promptSync({ sigint: true });

type TaskForce = {
    mentor?: Mentor,
    students: Student[],
    softwareStudents?: Student[]
};

const memberSkillLine = (member: TeamMember, skills: { building?: number, programming?: number }): string => {
    let str = `${member.firstName} ${member.lastName}`;
    str += ' '.repeat(26 - str.length) + buildStatBars(skills);
    return str;
}

const printTaskForce = (force: TaskForce, hasSecondary: boolean) => {
    const tab = "             ";

    console.log("All team members currently assigned to this task:\n");
    console.log("MENTOR:      " + (force.mentor ? memberSkillLine(force.mentor, force.mentor.skills) : chalk.dim('<none>')));
    console.log();

    let first = true;
    for (const student of force.students) {
        console.log((first ? "BUILDERS:    " : tab) + memberSkillLine(student, { building: student.skills.building }));
        if (first) first = false;
    }
    console.log();

    if (hasSecondary) {
        first = true;
        for (const student of force.softwareStudents!) {
            console.log((first ? "PROGRAMMERS: " : tab) + memberSkillLine(student, { programming: student.skills.programming }));
            if (first) first = false;
        }
    }
    console.log();
};

const selectTaskForce = (team: Team, hasSecondary: boolean, currentForce: TaskForce): TaskForce => {
    console.log("Select a student or mentor to add to the team working on this task:");
    const excludedIds = [
        ...currentForce.students,
        ...(currentForce.softwareStudents || []),
        ...(currentForce.mentor ? [currentForce.mentor] : [])
    ].map(s => s.id);
    const chosenId = listStudents(team, { availableOnly: true, mentorsToo: true, promptChoice: true, listSkills: true, excludedIds }) as string;
    if (team.mentors[chosenId]) {
        currentForce.mentor = team.mentors[chosenId];
    } else if (team.students[chosenId]) {
        let chosenSide = hasSecondary ? "" : "b";
        while (chosenSide !== "b" && chosenSide !== "p")
            chosenSide = prompt(`Should ${team.students[chosenId].firstName} be assigned to [b]uilding or [p]rogramming? `).toLowerCase().trim();
        if (chosenSide === "b") currentForce.students.push(team.students[chosenId]);
        else currentForce.softwareStudents?.push(team.students[chosenId]);
    }

    printTaskForce(currentForce, hasSecondary);

    if (currentForce.students.length === 0 || (hasSecondary && currentForce.softwareStudents!.length === 0)) {
        console.log(chalk.red("You need to assign at least 1 " + (hasSecondary ? 'builder and 1 programmer' : 'student') + '.'));
        prompt("Press Enter to continue...");
        return selectTaskForce(team, hasSecondary, currentForce);
    } else {
        console.log(chalk.yellowBright("Estimated task completion time: 3 - 5 days."));
        let choice = "";
        while (choice !== "a" && choice !== "s")
            choice = prompt("Would you like to [a]ssign more members or [s]tart the task with this group? ").toLowerCase().trim();
        if (choice === "a") return selectTaskForce(team, hasSecondary, currentForce);
        else return currentForce;
    }
};

const buildTaskMenu = (team: Team) => {
    console.log("What type of component would you like to build?");
    const choice = askChoice([
        "Base Component " + chalk.dim("- smaller component used for building bigger mechanisms"),
        "Drivetrain " + chalk.dim("- chassis that serves as the base of a robot"),
        "Robot Mechanism" + chalk.dim("- component that can be mounted to a robot and used in gameplay"),
        "Back"
    ], true);

    let choices = [];

    console.log("Items that can be built: ");
    if (choice === 0) {
        for (const component of Object.values(genericComponents)) {
            choices.push(component.name + chalk.dim(" - " + component.description) + "\n     "
                + buildStatBars(component.skillRequirements) + "\n");
        }
    }
    const chosenComponent = askChoice(choices, true) as number;
    const baseTaskForce: TaskForce = { students: [], softwareStudents: [] };
    if (choice === 0) {
        const chosenComponentId = Object.keys(genericComponents)[chosenComponent];
        const componentData = genericComponents[chosenComponentId as ComponentId];
        const taskForce = selectTaskForce(team, Object.keys(componentData.skillRequirements).length > 1, baseTaskForce);
        assignBuildTask(team, taskForce.students, taskForce.softwareStudents!, chosenComponentId as ComponentId, taskForce.mentor);
    }
    console.log(chalk.green("All set - task begun!\n"));
};

const assignTaskMenu = (team: Team) => {
    console.log("What kind of task would you like to assign?");
    const choice = askChoice(["Build component", "Upgrade component", "Skills development", "Back"], true);
    if (choice === 0) buildTaskMenu(team);
    else if (choice === 1) buildTaskMenu(team);
    else if (choice === 2) buildTaskMenu(team);
};

export default assignTaskMenu;