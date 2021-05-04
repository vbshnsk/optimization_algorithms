export function cost(path: Path, matrix: Matrix): number {
    return path.map((value, index, array) => {
       return matrix[array[index]][array[(index + 1) % array.length]];
    }).reduce((a, b) => a + b);
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function checkHash(arr: Array<string>, val: Object) {
    const hash = val.toString();
    return arr.some(v => v === hash);
}
