import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library';
import NewMovie from './NewMovie'

afterEach(cleanup);


test('<NewMovie Snapshot/>', () => {
    const { container } = render(<NewMovie />);
    expect(container.firstChild).toMatchSnapshot();
})

test('<NewMovie True/>', () => {
    const { debug, queryByTestId } = render(<NewMovie />);
    const form = queryByTestId('form'); //Can exist or not. 
    expect(form).toBeTruthy();
})


test('<NewMovie Title/>', () => {
    const { debug, getByTestId } = render(<NewMovie />);
    const h1 = getByTestId('title');
    expect(h1.innerHTML).toBe('New Movie');
    //debug();
})


