import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

import { getUser } from './getUser';
import { mocked } from 'ts-jest/utils';

jest.mock('./getUser.tsx');
const mockedGetUser = mocked(getUser, true);

beforeEach(async() => {
  render(<App />);
  await waitFor(() => expect(mockedGetUser).toHaveBeenCalled());
});


describe('when the FETCH sucessfully', () => {
  beforeEach(() => {
    mockedGetUser.mockClear();
  });

  test('Assure fetch is called ONCE', async() => {
    render(<App />);
    await waitFor(() => {
      expect(mockedGetUser).toHaveBeenCalledTimes(1);
    });
  });
});

test('renders learn react link', () => {
  const linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
});

test('should select the children is being passed to input in AppForm component', () => {
  const inpEl = screen.getByText(/input/);
  expect(inpEl).toBeInTheDocument();

})

test('should select input element by Role', () => {
  
  screen.getByLabelText('input:');
  screen.getByPlaceholderText('Enter text...');

  const nnn = screen.getByRole('textbox');
  expect(nnn).toBeInTheDocument();
});

test('should use queryByRole to check if element is present', () => {
  const r1 = screen.queryByRole('img');
  expect(r1).toBeNull();
});

test('should use findBy to ...', () => {
  const r1 = screen.queryByRole('img');
  expect(r1).toBeNull();
});