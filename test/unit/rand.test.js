rand = require("../../lib/rand");

test('rand number between 0 and 1', () => {
    let num = rand(0, 1);
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThanOrEqual(1);
});

test('rand number between 0 and 100', () => {
    let num = rand(1, 5);
    expect(num).toBeGreaterThanOrEqual(1);
    expect(num).toBeLessThanOrEqual(5);
});

test('rand number between 0 and 100', () => {
    let num = rand(0, 100);
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThanOrEqual(100);
});