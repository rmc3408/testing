function getError() {
  throw new Error('wrong');
}

test('should be null , array', () => {
  const arr = [ 1, 2, 3];

  expect.assertions(5);

  expect(null).toBeNull();
  expect(2).toBeDefined();
  expect(arr).toBeInstanceOf(Array);
  expect(arr).toContain(2);
  expect(arr).toHaveLength(3);
});

test('should Throw error', () => { 
  expect(() => getError()).toThrow('wrong');
  expect(() => getError()).toThrowError("wrong");

});