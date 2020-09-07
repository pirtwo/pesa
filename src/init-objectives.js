const Objective = require("../src/objective");
const fitnesses = require("../src/fitness-functions");

function initObjectives(mdg) {
  let objs = [];

  // Cohesion
  objs.push(new Objective(fitnesses[0], mdg, "max"));

  // Coupling
  objs.push(new Objective(fitnesses[1], mdg, "min"));

  // MQ
  objs.push(new Objective(fitnesses[2], mdg, "max"));

  // Cluster Number
  objs.push(new Objective(fitnesses[3], mdg, "min"));

  // Cluster Size StdDev
  objs.push(new Objective(fitnesses[4], mdg, "min"));

  // Single module clusters
  objs.push(new Objective(fitnesses[5], mdg, "min"));

  return objs;
}

module.exports = initObjectives;