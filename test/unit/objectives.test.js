const Objective = require("../../src/objective");
const fitnesses = require("../../src/fitness-functions");
const mdg = [
    [0, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0],
];

test('cohesion [1, 1, 2, 1, 2, 3] should be 2', () => {
    let cohObj = new Objective(fitnesses[0], mdg, "max");
    let coh = 0;
    coh = cohObj.func([1, 2, 1, 2, 2, 2]);
    expect(coh).toBe(4);
    coh = cohObj.func([1, 2, 1, 2, 3, 3]);
    expect(coh).toBe(3);
    coh = cohObj.func([1, 1, 2, 3, 2, 2]);
    expect(coh).toBe(2);
});

test('coupling of [1, 1, 2, 1, 2, 3] should be 4', () => {
    let copObj = new Objective(fitnesses[1], mdg, "max");
    let cop = 0;
    cop = copObj.func([1, 2, 1, 2, 2, 2]);
    expect(cop).toBe(1);
    cop = copObj.func([1, 2, 1, 2, 3, 3]);
    expect(cop).toBe(2);
    cop = copObj.func([1, 1, 2, 3, 2, 2]);
    expect(cop).toBe(3);
});

test('MQ of [1, 1, 2, 1, 2, 3] should be 0.19', () => {
    let mqObj = new Objective(fitnesses[2], mdg, "max");
    let mq = 0;
    mq = mqObj.func([1, 2, 1, 2, 2, 2]);
    expect(mq).toBeCloseTo(1.523);
    mq = mqObj.func([1, 2, 1, 2, 3, 3]);
    expect(mq).toBeCloseTo(1.833);
    mq = mqObj.func([1, 1, 2, 3, 2, 2]);
    expect(mq).toBeCloseTo(0.9);
});

test('Cluster-Number of [1, 1, 2, 1, 2, 3] should be 3', () => {
    let clusNumObj = new Objective(fitnesses[3], mdg, "max");
    let clusNum = clusNumObj.func([1, 2, 1, 2, 2, 2]);
    clusNum = clusNumObj.func([1, 2, 1, 2, 2, 2]);
    expect(clusNum).toBe(2);
    clusNum = clusNumObj.func([1, 2, 1, 2, 3, 3]);
    expect(clusNum).toBe(3);
    clusNum = clusNumObj.func([1, 1, 2, 3, 2, 2]);
    expect(clusNum).toBe(3);
});

test('Min size of [1, 2, 1, 2, 2, 2] should be 2', () => {
    let minSizeObj = new Objective(fitnesses[5], mdg, "max");
    let minSize = minSizeObj.func([1, 2, 1, 2, 2, 2]);
    expect(minSize).toBe(2);
});