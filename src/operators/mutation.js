const rand = require("../../lib/rand");

function boundary(chromosome = [], lowerBound, upperBound) {    
    let index = rand.randRange(0, chromosome.length);
    chromosome[index] = [lowerBound, upperBound][rand.randInt(0, 1)];
    return chromosome;
}

function uniform(chromosome = [], lowerBound, upperBound) {    
    let index = rand.randRange(0, chromosome.length);
    chromosome[index] = rand.randInt(lowerBound, upperBound);
    return chromosome;
}

module.exports = {
    boundary: boundary,
    uniform : uniform
};