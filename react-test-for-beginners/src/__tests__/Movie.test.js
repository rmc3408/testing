import React from 'react';
import { render, cleanup, findByTestId } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from '../Movie';

console.error = jest.fn();

afterEach(() => {
    console.log('---------log END still works------------------')
    cleanup();
});


beforeEach(() => {
    console.error.mockClear();
});



const data = { id: '002', title: 'Pixels', poster_path: 'sample.jpg' };



test('Movie rendering', () => {
    console.clear();
    render(
        <MemoryRouter>
            <Movie movie={data} />
        </MemoryRouter>);
    expect(console.error).not.toHaveBeenCalled();
});


test('Movie ID link', async () => {
    const { getByTestId, getAllByTestId } = render(
        <MemoryRouter>
            <Movie movie={data} />
        </MemoryRouter>);
    
    expect(console.error).toHaveBeenCalled();
    
    const mlink = getByTestId('movie-link');
    const mlink_href = mlink.getAttribute('href');
    expect(mlink_href).toBe("/" + data.id);
    
    const mImage = getAllByTestId('movie-img');
    expect(mImage[0].getAttribute('src')).toBe(`${POSTER_PATH}${data.poster_path}`)
});