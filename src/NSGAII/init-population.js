const rand = require("../lib/rand");
const Solution = require("./solution");

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

module.exports = initPopulation;