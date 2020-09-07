const dominates = require("../operators/dominate");

function fastNondominatedSort(pop = [], objectives = []) {
    fronts = new Array([]);

    for (let i = 0, n = pop.length; i < n; i++) {
        let p = pop[i];
        let q = {};
        p.dominatedSolutions = [];
        p.dominationCount = 0;

        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            q = pop[j];
            if (dominates(p, q, objectives)) {
                p.dominatedSolutions.push(q);
            } else if (dominates(q, p, objectives)) {
                p.dominationCount++;
            }
        }

        if (p.dominationCount === 0) {
            p.rank = 1;
            fronts[0].push(p);
        }
    }

    let i = 0;
    while (fronts[i].length > 0) {
        let nextFront = [];
        for (let j = 0, n = fronts[i].length; j < n; j++) {
            let p = fronts[i][j];
            let q = {};

            for (let k = 0, m = p.dominatedSolutions.length; k < m; k++) {
                q = p.dominatedSolutions[k];
                q.dominationCount--;
                if (q.dominationCount === 0) {
                    q.rank = i + 2;
                    nextFront.push(q);
                }
            }
        }

        fronts.push(nextFront);
        i++;
    }

    return fronts;
}

module.exports = fastNondominatedSort;