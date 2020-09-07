
class Solution {
  constructor(chromosome = []) {
    this.chromosome = chromosome;
    this.coordinates = [];
    this.cube = null;
  }

  getCohesion(mdg) {
    let cohesion = 0;

    for (let row = 0; row < mdg.length; row++) {
      for (let col = row + 1; col < mdg.length; col++) {
        if (mdg[row][col] === 1 && this.chromosome[row] === this.chromosome[col])
          cohesion++;
      }
    }

    return cohesion;
  }

  getCoupling(mdg) {
    let coupling = 0;

    for (let row = 0; row < mdg.length; row++) {
      for (let col = row + 1; col < mdg.length; col++) {
        if (mdg[row][col] === 1 && this.chromosome[row] !== this.chromosome[col])
          coupling++;
      }
    }

    return coupling;
  }

  getMQ(mdg) {
    let mq = 0;
    let cohesion = 0;
    let coupling = 0;
    let clusterNum = 0;
    let clusters = this.getClusterList();

    Object.keys(clusters).forEach(key => {
      cohesion = 0;
      coupling = 0;
      clusterNum = Number(key);
      for (let row = 0; row < mdg.length; row++) {
        for (let col = row + 1; col < mdg.length; col++) {
          if (mdg[row][col] === 1 &&
            this.chromosome[row] === this.chromosome[col] &&
            this.chromosome[row] === clusterNum
          ) { cohesion++; }
          if (mdg[row][col] === 1 &&
            this.chromosome[row] !== this.chromosome[col] &&
            (this.chromosome[row] === clusterNum || this.chromosome[col] === clusterNum)
          ) { coupling++; }
        }
      }
      mq += cohesion / (cohesion + 0.5 * coupling);
    });

    return +(mq).toFixed(5);
  }

  getClusterNumber() {
    let clusters = {};
    clusters = this.getClusterList();
    return Object.keys(clusters).length;
  }

  getClusterList() {
    return this.chromosome.reduce(function (acc, cur) {
      if (cur in acc) {
        acc[cur]++;
      } else {
        acc[cur] = 1;
      }
      return acc;
    }, {});
  }

  coordinatesToString() {
    return `(${this.coordinates.reduce((acc, cur, idx) => idx == 0 ? cur : acc + ',' + cur, "")})`;
  }
}

module.exports = Solution;