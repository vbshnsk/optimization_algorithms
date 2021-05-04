import {getRandomInt} from "./util";

export default class RandomizedFirstNeighbor implements Fittable {
    private k: number;

    constructor(k: number) {
        this.k = k;
    }

    fit(weightMatrix: Matrix): Path {
        const path: Path = [];
        let current = getRandomInt(0, weightMatrix.length - 1);
        while (true) {
            path.push(current);
            if (path.length === weightMatrix.length) {
                break;
            }
            const neighbors = weightMatrix[current].map((v, _, arr) => path.some(vv => v === arr[vv]) ? Infinity : v);
            const minimums = [];
            for (let i = 0; i < this.k; i++) {
                const v = neighbors.reduce((p, v, i, arr) => v <= arr[p] && !minimums.some(vv => v === vv) ? i : p, 0);
                if (v !== null) {
                    minimums.push(v);
                }
            }
            current = minimums[getRandomInt(0, minimums.length - 1)];
        }

        return path;
    }

}

