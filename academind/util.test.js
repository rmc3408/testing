const { generateText } = require('./util');

test('should output name and age', () => {
    const txt1 = generateText('max', 29);
    expect(txt1).toBe('max (29 years old)');

    const txt2 = generateText('max', 20);
    expect(txt2).toBe('max (20 years old)');
});

test('should empty', () => {
    const txt = generateText('', null);
    expect(txt).toBe(' (null years old)');
});
