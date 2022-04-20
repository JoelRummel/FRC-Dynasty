const buildTextBar = (segments: number, { halfLength = false } = {}): string => {
    let str = "";
    for (let i = 0; i < segments; i++) {
        str += "█";
        if (halfLength) {
            i += 1;
            if (i >= segments) str += "▌";
        }
    }
    return str;
};

export const buildStatBars = ({ building, programming }: { building?: number, programming?: number }): string => {
    let buildBar = building !== undefined ? buildTextBar(building) : '';
    let programBar = programming !== undefined ? buildTextBar(programming) : '';
    let str = building ? `🛠️ ${buildBar}${" ".repeat(10 - buildBar.length)} (${building}) ${building < 10 ? ' ' : ''} ` : '';
    str += programming ? `💻 ${programBar}${" ".repeat(10 - programBar.length)} (${programming})` : '';
    return str;
}

export default buildTextBar;