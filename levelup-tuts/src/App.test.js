import { total } from './App';
import { add } from './add';

//const add = jest.fn(() => 10);

jest.mock('./add', () => {
  return {
    add: jest.fn((x, y) => 25)
  }
});

// Integration tests
// Tests things working together
test('total', () => {
  expect(total(5, 20)).toBe('$25');
  
  //expect(add(1, 2)).toBe(26);
  //expect(add).toHaveBeenCalledTimes(1);
  //expect(add).toHaveBeenCalledWith(1, 4);

  // replace new mock function declaration
  add.mockImplementation(() => 30);
  expect(total(5, 25)).toBe('$30');
  // expect(add).toHaveBeenCalledTimes(2);
});
