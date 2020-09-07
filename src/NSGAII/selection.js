const rand = require("../lib/rand");

function binaryTournament(pop = [], popSize) {

    let a = {};
    let b = {};
    let newPopulation = [];    

    for (let i = 0; i < popSize; i++) {
        a = pop[rand.randRange(0, pop.length)];
        b = pop[rand.randRange(0, pop.length)];

        if (a.rank > b.rank) {
            newPopulation.push(a);
        } else if (a.rank < b.rank) {
            newPopulation.push(b);
        } else if (a.rank === b.rank) {
            if (a.crowdingDistance >= b.crowdingDistance) {
                newPopulation.push(a);
            } else {
                newPopulation.push(b);
            }
        }
    }

    return newPopulation;
}

module.exports = {
    binaryTournament: binaryTournament
}