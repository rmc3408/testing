import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library';
import NewMovie from './NewMovie'

afterEach(cleanup);

test('<NewMovie 1/>', () => {
    const { debug, getByTestId } = render(<NewMovie />);
    const h1 = getByTestId('title');
    debug();
    expect(h1.innerHTML).toBe('New Movie');
})


