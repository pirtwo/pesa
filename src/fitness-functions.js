function cohesion(chromosome = []) {
    let cohesion = 0;

    for (let row = 0; row < this.mdg.length; row++) {
        for (let col = row + 1; col < this.mdg.length; col++) {
            if (this.mdg[row][col] === 1 && chromosome[row] === chromosome[col])
                cohesion++;
        }
    }

    return +(cohesion / Math.pow(chromosome.length, 2)).toFixed(5);
}

function coupling(chromosome = []) {
    let coupling = 0;

    for (let row = 0; row < this.mdg.length; row++) {
        for (let col = row + 1; col < this.mdg.length; col++) {
            if (this.mdg[row][col] === 1 && chromosome[row] !== chromosome[col])
                coupling++;
        }
    }

    return +(coupling / Math.pow(chromosome.length, 2)).toFixed(5);
}

function mq(chromosome = []) {
    let mq = 0;
    let cohesion = 0;
    let coupling = 0;
    let clusterNum = 0;
    let clusters = getClusterList(chromosome);

    Object.keys(clusters).forEach(key => {
        cohesion = 0;
        coupling = 0;
        clusterNum = Number(key);
        for (let row = 0; row < this.mdg.length; row++) {
            for (let col = row + 1; col < this.mdg.length; col++) {
                if (this.mdg[row][col] === 1 &&
                    chromosome[row] === chromosome[col] &&
                    chromosome[row] === clusterNum
                ) { cohesion++; }
                if (this.mdg[row][col] === 1 &&
                    chromosome[row] !== chromosome[col] &&
                    (chromosome[row] === clusterNum || chromosome[col] === clusterNum)
                ) { coupling++; }
            }
        }
        mq += cohesion / (cohesion + 0.5 * coupling);
    });

    return +(mq / chromosome.length).toFixed(5);
}

function numberOfClusters(chromosome = []) {
    let clusters = {};
    clusters = getClusterList(chromosome);
    return +(Object.keys(clusters).length / chromosome.length).toFixed(5);
}

function clusterSizeStdDev(chromosome = []) {
    let mean = 0;
    let variance = 0;
    let moduleCount = 0;
    let clusterCount = 0;
    let clusters = getClusterList(chromosome);

    moduleCount = chromosome.length;
    clusterCount = Object.keys(clusters).length;
    mean = moduleCount / clusterCount;

    Object.keys(clusters).forEach(key => {
        variance += Math.pow((clusters[key] - mean), 2);
    });

    return +(Math.sqrt(variance / clusterCount) / chromosome.length).toFixed(5);
}

function clusterSizeDiff(chromosome = []) {
    let clusters = getClusterList(chromosome);
    let min = Math.min.apply(null, Object.keys(clusters).map(x => clusters[x]));
    let max = Math.max.apply(null, Object.keys(clusters).map(x => clusters[x]));
    return +((max - min) / chromosome.length).toFixed(5);
}

function singleClusterNum(chromosome = []) {
    let num = 0;
    let clusters = getClusterList(chromosome);
    num = Object.keys(clusters).reduce((acc, cur) => clusters[cur] === 1 ? acc + 1 : acc, 0);
    return +(num / chromosome.length).toFixed(5);
}

function getClusterList(chromosome = []) {
    return chromosome.reduce(function (acc, cur) {
        if (cur in acc) {
            acc[cur]++;
        } else {
            acc[cur] = 1;
        }
        return acc;
    }, {});
}

module.exports = [
    cohesion,
    coupling,
    mq,
    numberOfClusters,
    clusterSizeStdDev,
    singleClusterNum
];