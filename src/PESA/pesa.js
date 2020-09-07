const rand = require("../../lib/rand");
const Solution = require("./solution");
const mutation = require("../operators/mutation");
const crossover = require("../operators/crossover");
const HyperCube = require("./hyper-cube");
const dominates = require("../operators/dominate");

function pesa(repeat, popSize, archiveSize, gridNum, objectives, chromLen, lowerBound, upperBound, pC = 0.8, pM = 0.2) {
  let nE = archiveSize;
  let nP = popSize;
  let nG = gridNum;
  let itr = 0;

  let parents = [];
  let population = [];
  let extArchive = [];
  let hyperCubes = [];

  population = initPopulation(nP, chromLen, lowerBound, upperBound);

  while (itr < repeat) {

    calcObjectives(population, objectives);
    calcCoordinates(population, nG, objectives.length);

    for (let i = 0; i < nP; i++) {
      let p = population[i];
      let isDiscard = false;

      for (let j = 0; j < extArchive.length; j++) {
        let q = extArchive[j];
        if (dominates(p, q, objectives)) {
          removeSolutionFromHyperCube(q, q.cube);
          extArchive.splice(j, 1);
          j--;
        }
        else if (dominates(q, p, objectives)) {
          isDiscard = true;
          break;
        }
      }

      if (isDiscard)
        continue;
      if (extArchive.length + 1 > nE) {
        hyperCubes.sort((a, b) => b.getDensity() - a.getDensity());
        let sln = hyperCubes[0].solutions[rand.randRange(0, hyperCubes[0].solutions.length)];
        extArchive.splice(extArchive.findIndex(x => x === sln), 1);
        removeSolutionFromHyperCube(sln, sln.cube);
      }

      extArchive.push(population[i]);
      updateHyperCubesMembership(hyperCubes, population[i]);
    }

    parents = binaryTournament(extArchive, nP);
    population = createOffsprings(parents, lowerBound, upperBound, pC, pM);
    itr++;
  }

  return extArchive;

}

function initPopulation(popSize, chromSize, genMinValue, genMaxValue) {
  let pop = [];
  let chr = [];

  for (let i = 0; i < popSize; i++) {
    chr = new Array(chromSize);
    for (let j = 0; j < chromSize; j++) {
      chr[j] = rand.randInt(genMinValue, genMaxValue);
    }
    pop.push(new Solution(chr));
  }

  return pop;
}

function binaryTournament(pop = [], popSize) {
  let a = {};
  let b = {};
  let newPopulation = [];

  for (let i = 0; i < popSize; i++) {
    a = pop[rand.randRange(0, pop.length)];
    b = pop[rand.randRange(0, pop.length)];

    if (a.cube.getDensity() < b.cube.getDensity()) {
      newPopulation.push(a);
    } else {
      newPopulation.push(b);
    }
  }

  return newPopulation;
}

/**
 * 
 * @param {Array} pop 
 * @param {Number} gridNum 
 * @param {Number} objNum 
 */
function calcCoordinates(pop, gridNum, objNum) {
  let ratio = +(1 / gridNum).toFixed(4);
  for (let i = 0; i < pop.length; i++) {
    pop[i].coordinates = new Array(objNum);
    for (let j = 0; j < objNum; j++) {
      pop[i].coordinates[j] = Math.floor(pop[i].objectives[j] / ratio);
    }
  }
}

/**
 * 
 * @param {Array} hyperCubes 
 * @param {Array} solution 
 */
function updateHyperCubesMembership(hyperCubes, solution) {
  let index = hyperCubes.findIndex(x => x.toString() === solution.coordinatesToString());
  let cube = index > -1 ? hyperCubes[index] : new HyperCube(solution.coordinates);
  cube.solutions.push(solution);
  solution.cube = cube;
  if (index < 0)
    hyperCubes.push(cube);
}

function removeSolutionFromHyperCube(solution, cube) {
  cube.solutions.splice(cube.solutions.findIndex(x => x === solution), 1);
}

/**
 * 
 * @param {Array} population 
 * @param {Array} objectives 
 */
function calcObjectives(population, objectives) {
  let sln = {};
  let obj = {};
  for (let i = 0, n = population.length; i < n; i++) {
    sln = population[i];
    sln.objectives = [];
    for (let j = 0, m = objectives.length; j < m; j++) {
      obj = objectives[j];
      sln.objectives.push(obj.func(sln.chromosome));
    }
  }
}

/**
 * 
 * @param {Array} pop 
 * @param {Number} minValue 
 * @param {Number} maxValue 
 * @param {Number} pC 
 * @param {Number} pM 
 */
function createOffsprings(pop, minValue, maxValue, pC, pM) {
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
      childs.push(new Solution(crossover.twoPoint(parent1.chromosome, parent2.chromosome)));
    else childs.push(parent1);

    pm = rand.random();
    if (pm < pM)
      childs[i].chromosome = mutation.uniform(childs[i].chromosome, minValue, maxValue);
    else continue;
  }
  return childs;
}

module.exports = pesa;