import * as fs from "fs";

export default class Loader {
    private points: number[][];

    constructor(path?: string) {
        if (path) {
            this.load(path);
        }
    }

    load(path: string) {
        const fileContents = fs.readFileSync(path, 'utf-8');
        this.points = fileContents.split('\n')
            .map(v => v.split(' ').map(Number));
    }

    getWeightMatrix(): Matrix {
        if (this.points) {
            return this.points.map((value, _, array) => {
                const [x1, y1] = value;
                return array.map(([x2, y2]) => this._dist(x1, y1, x2, y2));
            });
        }
        return null;
    }

    _dist(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

}