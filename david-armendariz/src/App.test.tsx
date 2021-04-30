import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
  screen.debug();
});

test('should select the children is being passed to input in AppForm component', () => {
  render(<App />);
  const inpEl = screen.getByText(/input/);
  expect(inpEl).toBeInTheDocument();

})

test('should select input element by Role', () => {
  render(<App />);
  screen.
})

