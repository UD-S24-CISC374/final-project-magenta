export const logBook: Record<string, Array<string[]>> = {};

function arraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

export function addLog(level: string, log: string[]) {
    if (level in logBook) {
        logBook[level].forEach((logArr) => {if (arraysEqual(logArr, log)) return;});
        logBook[level].push(log);
        return;
    }
    logBook[level] = [log];
}
