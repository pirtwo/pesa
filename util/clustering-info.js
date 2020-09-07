function cohesion(chromosome, mdg) {
  let cohesion = 0;

  for (let row = 0; row < mdg.length; row++) {
    for (let col = row + 1; col < mdg.length; col++) {
      if (mdg[row][col] === 1 && chromosome[row] === chromosome[col])
        cohesion++;
    }
  }

  return cohesion;
}

function coupling(chromosome, mdg) {
  let coupling = 0;

  for (let row = 0; row < mdg.length; row++) {
    for (let col = row + 1; col < mdg.length; col++) {
      if (mdg[row][col] === 1 && chromosome[row] !== chromosome[col])
        coupling++;
    }
  }

  return coupling;
}

function mq(chromosome = [], mdg) {
  let mq = 0;
  let cohesion = 0;
  let coupling = 0;
  let clusterNum = 0;
  let clusters = getClusterList(chromosome);

  Object.keys(clusters).forEach(key => {
    cohesion = 0;
    coupling = 0;
    clusterNum = Number(key);
    for (let row = 0; row < mdg.length; row++) {
      for (let col = row + 1; col < mdg.length; col++) {
        if (mdg[row][col] === 1 &&
          chromosome[row] === chromosome[col] &&
          chromosome[row] === clusterNum
        ) { cohesion++; }
        if (mdg[row][col] === 1 &&
          chromosome[row] !== chromosome[col] &&
          (chromosome[row] === clusterNum || chromosome[col] === clusterNum)
        ) { coupling++; }
      }
    }
    mq += cohesion / (cohesion + 0.5 * coupling);
  });

  return +(mq.toFixed(5));
}

function clusterCount(chromosome = []) {
  return Object.keys(getClusterList(chromosome)).length;
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

  return +(Math.sqrt(variance / clusterCount)).toFixed(5);
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

module.exports = {
  mq: mq,
  cohesion: cohesion,
  coupling: coupling,
  clusterCount: clusterCount,
  clusterStdDev: clusterSizeStdDev
}