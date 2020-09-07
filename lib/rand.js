function random() {
    return Math.random();
}

/**
 * Returns random int value between [min, max].
 * @param {Number} min 
 * @param {Number} max 
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return random int value between [min, max).
 * @param {Number} min 
 * @param {Number} max 
 */
function randRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    random: random,
    randInt: randInt,
    randRange: randRange
};