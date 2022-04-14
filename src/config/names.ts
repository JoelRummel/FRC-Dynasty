import { randRange } from '@/util/rand';
import fs from 'fs';
import Papa from 'papaparse';
import lastnames from '@/data/lastnames.json';

let csvData = fs.readFileSync("./build/data/firstnames.csv", "utf8");
csvData = csvData.trim(); // .replace(/([^,]+),\s*([^,]+),\s*/gi, '$1,$2\n');

const { data } = Papa.parse(csvData, { header: true });

const maleNames = data.filter((row: any) => row.gender === 'M');
const maleCount = maleNames.reduce((acc: number, row: any) => acc + parseInt(row.count), 0);
console.log("Male count: ", maleCount);

const femaleNames = data.filter((row: any) => row.gender === 'F');
const femaleCount = femaleNames.reduce((acc: number, row: any) => acc + parseInt(row.count), 0);

const lastNameKeys = Object.keys(lastnames);
let lastNameCount = 0;
for (const key of lastNameKeys) {
    lastNameCount += lastnames[key as keyof typeof lastnames];
}

const generateFirstName = (gender: 'M' | 'F'): string => {
    let num = randRange(0, gender === 'M' ? maleCount : femaleCount);
    let names = gender === 'M' ? maleNames : femaleNames;
    for (const name of names) {
        num -= (name as any).count as number;
        if (num < 0) return (name as any).name;
    }
    return (names[0] as any).name;
};

const generateLastName = (): string => {
    let num = randRange(0, lastNameCount);
    for (const lastname of lastNameKeys) {
        num -= lastnames[lastname as keyof typeof lastnames];
        if (num < 0) return lastname
    }
    return lastNameKeys[0];
};

export const generateNames = (gender: 'M' | 'F'): { firstName: string, lastName: string } => {
    const firstName = generateFirstName(gender);
    const lastName = generateLastName();
    return { firstName, lastName };
};