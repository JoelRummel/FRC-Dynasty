export const randChoice = (arr: any[]): any => {
    return arr[~~(Math.random() * arr.length)];
}

export const randRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}