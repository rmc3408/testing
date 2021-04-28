import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library';
import NewMovie from './NewMovie'

afterEach(cleanup);


test('<NewMovie Snapshot/>', () => {
    const { debug, getByTestId, queryByTestId } = render(<NewMovie />);
    const h1 = getByTestId('title');
    
    expect(h1.innerHTML).toBe('New Movie');
    debug();
    
    const form = queryByTestId('form'); //Can exist or not. 
    expect(form).toBeTruthy();
})


test('<NewMovie 1/>', () => {
    const { debug, getByTestId, queryByTestId } = render(<NewMovie />);
    const h1 = getByTestId('title');
    
    expect(h1.innerHTML).toBe('New Movie');
    debug();

    const form = queryByTestId('form'); //Can exist or not. 
    expect(form).toBeTruthy();
})


