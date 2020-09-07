function crowdingDistance(solutions = [], objectives = []) {
    let zMin = 0;
    let zMax = 0;
    let dist = 0;
    let topNeibor = 0;
    let downNeibor = 0;

    if (solutions.length === 0)
        return;

    for (let i = 0, n = solutions.length; i < n; i++) {
        solutions[i].crowdingDistance = 0
    }

    for (let i = 0, n = objectives.length; i < n; i++) {

        solutions.sort((a, b) => {
            return b.objectives[i] - a.objectives[i];
        });

        zMin = solutions[solutions.length - 1].objectives[i];
        zMax = solutions[0].objectives[i];
        solutions[0].crowdingDistance = solutions[solutions.length - 1].crowdingDistance = 100;

        for (let j = 1, m = solutions.length - 1; j < m; j++) {
            if (zMax - zMin === 0) break;
            topNeibor = solutions[j - 1].objectives[i];
            downNeibor = solutions[j + 1].objectives[i];
            solutions[j].crowdingDistance += (topNeibor - downNeibor) / (zMax - zMin);
        }
    }
}

module.exports = crowdingDistance;