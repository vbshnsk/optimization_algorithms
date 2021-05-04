import {checkHash} from "./util";

type TabooOptions = {
    iterations?: number,
    size?: number,
    maxNeighbors?: number
}

export default class TabooedTwoOpt {
    private _cost: (Path, Matrix) => number;
    private _size: number;
    private _iterations: number;
    private _maxN: number;

    constructor(costFn: (Path, Matrix) => number, options?: TabooOptions) {
        this._cost = costFn;
        this._size = (options || {}).size || 10;
        this._iterations = (options || {}).iterations || 100;
        this._maxN = (options || {}).maxNeighbors || Infinity;
    }

    fit(weightMatrix: Matrix, path: Path) {
        let cost = this._cost(path, weightMatrix);
        let bestLocalCandidate = path;
        let bestLocalCandidateCost = cost;
        let iterations = 0;
        const tabooList = [path.toString()];
        while (this._checkForStopCondition(iterations)) {
            const neighbors = this._getAllNeighbors(bestLocalCandidate);
            bestLocalCandidate = neighbors[0];
            for (const neighbor of neighbors) {
                console.log(!checkHash(tabooList, neighbor))
                if (!checkHash(tabooList, neighbor) &&
                    bestLocalCandidateCost > this._cost(neighbor, weightMatrix)) {
                    //console.log(bestLocalCandidate.toString() === neighbor.toString())

                    bestLocalCandidate = neighbor;
                    bestLocalCandidateCost = this._cost(neighbor, weightMatrix);
                }
            }

            //console.log(bestLocalCandidateCost, cost)
            if (bestLocalCandidateCost < cost) {
                cost = bestLocalCandidateCost;
                path = bestLocalCandidate
            }
            tabooList.push(bestLocalCandidate.toString());

            if (tabooList.length > this._size) {
                tabooList.shift();
            }
            console.log(bestLocalCandidateCost, cost)
            iterations++;
        }
        return path;
    }

    _checkForStopCondition(iterations: number): boolean {
        if (iterations >= this._iterations) {
            return false;
        }
        return true;
    }

    _getAllNeighbors(path: Path) {
        const neighbourhood = [];
        for (let i = 1; i < path.length - 1; i++) {
            for (let j = i + 1; j < path.length; j++) {
                neighbourhood.push(this._2optSwap(path, i, j));
                if (neighbourhood.length > this._maxN) {
                    break;
                }
            }
            if (neighbourhood.length > this._maxN) {
                break;
            }
        }
        return neighbourhood;
    }

    _2optSwap(path: Path, i: number, j: number): Path {
        return path.slice(0, i)
            .concat(path.slice(i, j).reverse())
            .concat(path.slice(j));
    }
}

