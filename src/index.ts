import Loader from "./loader";
import TwoOpt from "./twoOpt";
import {cost} from "./util";
import eil101 from "../test_data/eil101.json";
import berlin52 from "../test_data/berlin52.json";
import eil76 from "../test_data/eil76.json";
import gr96 from "../test_data/gr96.json";
import pr76 from "../test_data/pr76.json";
import Stopwatch from 'statman-stopwatch';
import TabooedTwoOpt from "./tabooedTwoOpt";

const loader = new Loader();
const twoOpt = new TabooedTwoOpt(cost, {iterations: 100, size: 30});
const sw = new Stopwatch();

loader.load('problems/eil101.txt');
let m = loader.getWeightMatrix();

// sw.start();
// const r = eil101.map(v => cost(twoOpt.fit(m, v), m));
// let res = r.reduce((p, v) => Math.min(p, v));
// let i = r.findIndex(v => v === res);
// console.log('EIL101')
// console.log(res);
// console.log(i);
// console.log(sw.stop());
// sw.reset();

// loader.load('problems/berlin52.txt');
// m = loader.getWeightMatrix();
// sw.start();
// const r = berlin52.map(v => cost(twoOpt.fit(m, v), m));
// let res = r.reduce((p, v) => Math.min(p, v));
// let i = r.findIndex(v => v === res);
// console.log('BERLIN52')
// console.log(res);
// console.log(i);
// console.log(sw.stop());
// sw.reset();


// loader.load('problems/eil76.txt');
// m = loader.getWeightMatrix();
// sw.start();
// const r = eil76.map(v => cost(twoOpt.fit(m, v), m));
// let res = r.reduce((p, v) => Math.min(p, v));
// let i = r.findIndex(v => v === res);
// console.log('EIL76')
// console.log(res);
// console.log(i);
// console.log(sw.stop());
// sw.reset();

loader.load('problems/berlin52.txt');
m = loader.getWeightMatrix();
sw.start();
let r = berlin52.map(v => twoOpt.fit(m, v));
let rr = r.map(v => cost(v, m));
let res = rr.reduce((p, v) => Math.min(p, v));
let i = rr.findIndex(v => v === res);
console.log('GR96')
console.log(res);
console.log(r[i].join('->'));
console.log(sw.stop());
sw.reset();

//
// loader.load('problems/pr76.txt');
// m = loader.getWeightMatrix();
// sw.start();
// res = pr76.map(v => cost(twoOpt.fit(m, v), m)).reduce((p, v) => Math.min(p, v));
// i = pr76.findIndex(v => cost(twoOpt.fit(m, v), m) === res);
// console.log('PR76')
// console.log(res);
// console.log(i);
// console.log(sw.stop());
// sw.reset();
