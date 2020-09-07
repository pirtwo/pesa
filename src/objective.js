class Objective {

  /**
   * 
   * @param {Function} func Objective function.
   * @param {String} type Objective function type (minmization or maximization).
   */
  constructor(func, mdg = [], type = "min") {
    this.mdg = mdg;
    this.func = func;
    this.type = type;    
  }

  isMinimization() {
    return this.type === "min";
  }

  isMaximization() {
    return this.type === "max";
  }
}

module.exports = Objective;