class HyperCube {
  constructor(coordinates) {    
    this.solutions = [];
    this.coordinates = coordinates;
  }

  getDensity(){
    return this.solutions.length;
  }

  toString() {
    return `(${this.coordinates.reduce((acc, cur, idx) => idx == 0 ? cur : acc + ',' + cur, "")})`;
  }
}

module.exports = HyperCube;