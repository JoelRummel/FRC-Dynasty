import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

type Choice = { name: string, val: any };

const askChoice = (list: Array<Choice | string>, returnAsIndex: boolean = false, inputPrompt = "Enter a choice: "): any => {
    const isObjectForm = typeof list[0] === 'object';
    for (let i = 0; i < list.length; i++) {
        console.log(` ${i < 9 ? ' ' : ''}${i + 1}) ${isObjectForm ? (list[i] as Choice).name : list[i]}`);
    }
    console.log();
    let input: string | null = null;
    while (input === null || !parseInt(input) || parseInt(input) > list.length || parseInt(input) < 1) {
        input = prompt(input !== null ? `Please enter a number 1-${list.length}: ` : inputPrompt);
    }
    if (input === null) throw new Error("Bad bad bad");
    if (returnAsIndex) return parseInt(input) - 1;
    else if (!isObjectForm) return list[parseInt(input) - 1];
    else return (list[parseInt(input) - 1] as Choice).val;
}

export default askChoice;