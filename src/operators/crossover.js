const rand = require("../../lib/rand");

function singlePoint(parent1, parent2) {
    let childs = [];
    let crossoverPoint = rand.randRange(0, parent1.length);

    childs.push([
        ...parent1.slice(0, crossoverPoint),
        ...parent2.slice(crossoverPoint, parent2.length)
    ]);
    childs.push([
        ...parent2.slice(0, crossoverPoint),
        ...parent1.slice(crossoverPoint, parent2.length)
    ]);

    return childs[rand.randInt(0, 1)];
}

function twoPoint(parent1, parent2) {
    let childs = [];
    let len = parent1.length;
    let lowerPoint = rand.randRange(0, len);
    let upperPoint = rand.randRange(lowerPoint, len);

    childs.push([
        ...parent1.slice(0, lowerPoint),
        ...parent2.slice(lowerPoint, upperPoint),
        ...parent1.slice(upperPoint, len)
    ]);

    childs.push([
        ...parent2.slice(0, lowerPoint),
        ...parent1.slice(lowerPoint, upperPoint),
        ...parent2.slice(upperPoint, len)
    ]);

    return childs[rand.randInt(0, 1)];
}

function uniform(parent1, parent2, pE = 0.5) {
    let pe = 0;
    let child = [];

    for (let i = 0; i < parent1.length; i++) {
        pe = Math.random();
        if (pe <= pE) {
            child[i] = parent1[i];
        } else {
            child[i] = parent2[i];
        }
    }

    return child;
}

module.exports = {
    singlePoint: singlePoint,
    twoPoint: twoPoint,
    uniform: uniform
}