import promptSync from "prompt-sync";
import League, { createLeague } from "@/engine/League";
import { createTeam } from "@/engine/Team";
import { Profession } from "@/engine/TeamMember/Mentor";
import askChoice from "@/util/askChoice";
import assignTaskMenu from "./assignTaskMenu";
import listStudents from "./listStudents";

const prompt = promptSync({ sigint: true });

const initialize = (): League => {
    console.log("Let's get started by figuring out who you are.");
    console.log("We know that you're starting a new FRC team. But what's your background?");
    const background = askChoice(["Mechanical Engineer", "Software Engineer", "Salesperson", "Sports Coach"], false);
    const team = createTeam(background as Profession);
    const firstName = prompt("OK, now what's your first name? ");
    const lastName = prompt("And your last name, please? ");
    team.mentors[team.coachId].firstName = firstName;
    team.mentors[team.coachId].lastName = lastName;
    console.log("OK, you're all set!");
    return createLeague(team);
};

const executeDay = (league: League) => {
    console.log(`\n===== DAY ${league.day} =====\n`);
    console.log("Team status: \n");
    listStudents(league.userTeam, { mentorsToo: true });
    console.log();
    const choice = askChoice(["Assign students to a new task", "Check inventory/robot", "Order new parts", "See more info about a student", "Expand workshop"], true);
    if (choice === 0) assignTaskMenu(league.userTeam);
};

const mainLoop = () => {
    const league = initialize();
    while (true) {
        executeDay(league);
        league.day += 1;
    }
};

export default mainLoop;