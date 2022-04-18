import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const askChoice = (list: string[], returnAsIndex: boolean = false, inputPrompt = "Enter a choice: "): number | string => {
    for (let i = 0; i < list.length; i++) {
        console.log(` ${i < 9 ? ' ' : ''}${i + 1}) ${list[i]}`);
    }
    console.log();
    let input: string | null = null;
    while (input === null || !parseInt(input) || parseInt(input) > list.length || parseInt(input) < 1) {
        input = prompt(input !== null ? `Please enter a number 1-${list.length}: ` : inputPrompt);
    }
    if (input === null) throw new Error("Bad bad bad");
    if (returnAsIndex) return parseInt(input) - 1;
    else return list[parseInt(input) - 1];
}

export default askChoice;