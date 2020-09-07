const crossover = require("../../src/crossover");

test('flip-coin crossover [1, 2, 3, 4] and ["a", "b", "c", "d"]', () => {
    let result = crossover.flipCoin([1, 2, 3, 4], ["a", "b", "c", "d"]);
    expect(result).toHaveLength(4);
});

test('cut-point crossover [1, 2, 3, 4] and ["a", "b", "c", "d"]', () => {
    let result = crossover.flipCoin([1, 2, 3, 4], ["a", "b", "c", "d"]);
    expect(result).toHaveLength(4);
});