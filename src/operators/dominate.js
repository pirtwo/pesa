const Solution = require("../NSGAII/solution");

/**
 * 
 * @param {Solution} a 
 * @param {Solution} b 
 * @param {Array} objectives 
 */
function isDominate(a, b, objectives) {

  let isMin = false;
  let domA = false;
  let domB = false;
  let valA = 0;
  let valB = 0;

  for (let i = 0; i < objectives.length; i++) {
    isMin = objectives[i].isMinimization();
    valA = isMin ? a.objectives[i] : -a.objectives[i];
    valB = isMin ? b.objectives[i] : -b.objectives[i];
    if (valA < valB)
      domA = true
    if (valB < valA)
      domB = true
  }

  return domA && !domB;
}

module.exports = isDominate;