import Student from ".";

export const generateStudent = (): Student => {
    const s: Student = {
        firstName: "Joel",
        lastName: "Rummel",
        year: 0
    };

    return s;
};