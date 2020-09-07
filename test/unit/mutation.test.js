const mutation = require("../../src/mutation");

test('mutate the [1, 2, 3, 4] with minValue = 0 and maxValue = 4', () => {
    let result = mutation([1, 2, 3, 4], 0.1, 0, 4);
    expect(result).toHaveLength(4);
});
