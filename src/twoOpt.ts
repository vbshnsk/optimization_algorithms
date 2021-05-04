export default class TwoOpt implements Fittable {
    private _cost: (Path, Matrix) => number;
    private _lastCost: number = Infinity;

    constructor(costFn: (Path, Matrix) => number) {
        this._cost = costFn;
    }

    fit(weightMatrix: Matrix, path: Path) {
        let cost = this._cost(path, weightMatrix);
        while (this._checkForStopCondition(cost)) {
            let restart = false;
            for (let i = 1; i < path.length - 1; i++) {
                for (let j = i + 1; j < path.length; j++) {
                    const newPath = this._2optSwap(path, i, j);
                    const newCost = this._cost(newPath, weightMatrix);

                    if (newCost < cost) {
                        path = newPath;
                        cost = newCost;
                        restart = true;
                        break;
                    }
                    this._lastCost = cost;
                }
                if (restart) {
                    break;
                }
            }
        }
        this._reset()
        return path;
    }

    _reset() {
        this._lastCost = Infinity;
    }

    _checkForStopCondition(cost: number): boolean {
        if (cost === this._lastCost) {
            return false;
        }
        return true;
    }

    _2optSwap(path: Path, i: number, j: number): Path {
        return path.slice(0, i)
            .concat(path.slice(i, j).reverse())
            .concat(path.slice(j));
    }
}
