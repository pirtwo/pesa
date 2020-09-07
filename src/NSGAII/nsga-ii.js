const rand = require("../../lib/rand");
const solution = require("./solution");
const selection = require("./selection");
const crossover = require("../operators/crossover");
const mutation = require("../operators/mutation");
const fastNondomSort = require("./fast-nondominated-sort");
const crowdingDist = require("../operators/crowding-distance");

function nsga2(repeat, initPop, popSize, numberOfClusters, pC, pM, objectives) {
    let itr = 0;
    let fronts = [];
    let parents = initPop;
    let offsprings = [];
    let middlePop = [];
    let population = [];

    offsprings = createOffsprings(parents, pC, pM, 1, numberOfClusters);

    while (itr <= repeat) {
        middlePop = [];
        population = [...parents, ...offsprings];

        calcObjectives(population, objectives);
        fronts = fastNondomSort(population, objectives);

        for (let i = 0, n = fronts.length; i < n; i++) {
            let front = fronts[i];
            crowdingDist(front, objectives);
            if (middlePop.length + front.length <= popSize) {
                middlePop = [...middlePop, ...front];
            } else {
                let emptySpace = popSize - middlePop.length;
                let leastCrowded = front.sort((a, b) => b.crowdingDistance - a.crowdingDistance);
                middlePop = [...middlePop, ...leastCrowded.slice(0, emptySpace)];
            }
        }

        parents = selection.binaryTournament(middlePop, popSize);
        offsprings = createOffsprings(parents, pC, pM, 1, numberOfClusters);
        itr++;
    }

    return fronts;
}

function createOffsprings(pop = [], pC, pM, minValue, maxValue) {
    let pc = 0;
    let pm = 0;
    let parent1 = {};
    let parent2 = {};
    let childs = [];

    for (let i = 0, n = pop.length; i < n; i++) {
        parent1 = pop[i];
        parent2 = pop[rand.randRange(0, pop.length)];

        pc = rand.random();
        if (pc <= pC)
            childs.push(new solution(crossover.twoPoint(parent1.chromosome, parent2.chromosome)));
        else childs.push(parent1);

        pm = rand.random();
        if (pm < pM)
            childs[i].chromosome = mutation.uniform(childs[i].chromosome, minValue, maxValue);
        else continue;
    }
    return childs;
}

function calcObjectives(pop = [], objectives = []) {
    let sln = {};
    let obj = {};
    for (let i = 0, n = pop.length; i < n; i++) {
        sln = pop[i];
        sln.objectives = [];
        for (let j = 0, m = objectives.length; j < m; j++) {
            obj = objectives[j];
            sln.objectives.push(obj.func(sln.chromosome));
        }
    }
}

module.exports = nsga2;