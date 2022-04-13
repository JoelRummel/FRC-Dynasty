import Student from ".";

export const generateStudent = (): Student => {
    const s: Student = {
        firstName: "Joel",
        lastName: "Rummel",
        year: 2
    };

    return s;
};