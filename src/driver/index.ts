import promptSync from "prompt-sync";
import League, { createLeague } from "@/engine/League";
import Team, { createTeam } from "@/engine/Team";
import { Profession } from "@/engine/TeamMember/Mentor";
import { getOverallMoodEmoji } from "@/engine/TeamMember/Student/Mood";
import askChoice from "@/util/askChoice";

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
    console.log("STUDENTS:");
    for (const student of Object.values(league.userTeam.students)) {
        console.log(`    ${getOverallMoodEmoji(student.state.mood)} ${student.firstName} ${student.lastName}`);
    }
    console.log("\nMENTORS:");
    for (const mentor of Object.values(league.userTeam.mentors)) {
        console.log(`    ${mentor.firstName} ${mentor.lastName}`);
    }
    prompt("Now do something");
};

const mainLoop = () => {
    const league = initialize();
    while (true) {
        executeDay(league);
    }
};

export default mainLoop;