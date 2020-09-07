const Objective = require("../../src/objective");
const fitnesses = require('../../src/fitness-functions');
const Solution = require("../../src/solution");
const dominate = require("../../src/dominate");
const mdg = [
  [0, 1, 1, 0, 0, 0],
  [1, 0, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0],
];

const cohObj = new Objective(fitnesses[0], mdg, "max");
const copObj = new Objective(fitnesses[1], mdg, "min");
const mqObj = new Objective(fitnesses[2], mdg, "max");

test('solution [1, 2, 1, 2, 2, 2] dominates solution [1, 1, 2, 2, 1, 1]', () => {
  let slnA = new Solution([1, 2, 1, 2, 2, 2]);
  let slnB = new Solution([1, 1, 2, 2, 1, 1]);
  calcObjectives([slnA,slnB], [cohObj, copObj, mqObj]);

  let res = dominate(slnA, slnB, [cohObj, copObj, mqObj]);
  expect(res).toBe(true);  
});

test('solution [1, 1, 2, 2, 1, 1] is not dominates solution [1, 2, 1, 2, 2, 2]', () => {
  let slnA = new Solution([1, 2, 1, 2, 2, 2]);
  let slnB = new Solution([1, 1, 2, 2, 1, 1]);
  calcObjectives([slnA,slnB], [cohObj, copObj, mqObj]);

  let res = dominate(slnB, slnA, [cohObj, copObj, mqObj]);
  expect(res).toBe(false);  
});


function calcObjectives(pop = [], objectives = []) {
  pop.forEach(sln => {
      let objVal = 0;
      sln.objectives = [];
      objectives.forEach(obj => {
          objVal = obj.func(sln.chromosome);
          sln.objectives.push(objVal);
      });
  })
}
