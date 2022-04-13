import Student, { generateStudent } from "@/engine/Student";

console.log("Hello this is the game");

const student: Student = generateStudent();

console.log("Here is student: ", student);