jest.mock('axios');

const { printTitle, loadTitle } = require('./util');

test('should print uppercase text', () => {
    expect(printTitle()).toBe('DELECTUS AUT AUTEM');
});

test('should print uppercase text', () => {
    loadTitle().then(r => expect(r).toBe('DELECTUS AUT AUTEM'))
    ;
});
