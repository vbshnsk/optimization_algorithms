import Loader from "./loader";
import RandomizedFirstNeighbor from "./randomizedFirstNeighbor";
import * as fs from "fs";
import berlin52 from '../test_data/berlin52.json';
import eil76 from '../test_data/eil76.json';
import eil101 from '../test_data/eil101.json';
import gr96 from '../test_data/gr96.json';
import pr76 from '../test_data/pr76.json';
import {cost} from "./util";
import TwoOpt from "./twoOpt";

describe('load file', () => {

    test('should load file and get a matrix', () => {
        const loader = new Loader();
        loader.load('problems/test.txt');
        console.table(loader.getWeightMatrix());
    });

    test('should calculate path', () => {

    });

});

describe('randomized first neighbor', () => {

    test('should fit', () => {
        const loader = new Loader();
        loader.load('problems/test.txt');
        const m = loader.getWeightMatrix();
        const firstNeighbor = new RandomizedFirstNeighbor(1);
        console.log(firstNeighbor.fit(m));
    });

    test.skip('generator', () => {
        const loader = new Loader();
        loader.load('problems/pr76.txt');
        const m = loader.getWeightMatrix();
        const firstNeighbor = new RandomizedFirstNeighbor(6);
        const testData = [];
        for (let i = 0; i < 10; i++) {
            testData.push(firstNeighbor.fit(m));
        }
        console.log(testData.length, testData[0].length);
        fs.writeFileSync('test_data/pr76.json', JSON.stringify(testData));
    });
});

describe('', () => {
   test.skip('get best cost', () => {
       const loader = new Loader();
       loader.load('problems/eil101.txt');
       console.log(eil101.map(v => cost(v, loader.getWeightMatrix())).reduce((p, v) => Math.min(p, v)));

   });

   test.only('run 2opt', () => {
       const loader = new Loader();
       const twoOpt = new TwoOpt(cost);
       loader.load('problems/eil101.txt');
       const m = loader.getWeightMatrix();
       console.log(1)

       console.log(cost(twoOpt.fit(m, eil101[0]), m))
       const res = eil101.map(v => cost(twoOpt.fit(m, v), m)).reduce((p, v) => Math.min(p, v));
       console.log(res);
   });
});
