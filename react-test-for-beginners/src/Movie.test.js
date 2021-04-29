import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from './Movie';


afterEach(cleanup);

beforeEach(() => {
    console.error.mockClear();
});

console.error = jest.fn();

const data = { id: '002', title: 'Pixels', poster_path: 'sample.jpg' };

// test('Movie 01', () => {
//     render(<Movie />);
//     expect(console.error).toHaveBeenCalled();
// });

test('Movie rendering', () => {
    const { debug } = render(
        <MemoryRouter>
            <Movie movie={data} />
        </MemoryRouter>);
    expect(console.error).not.toHaveBeenCalled();
});

test('Movie ID link', () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <Movie movie={data} />
        </MemoryRouter>);
    
    expect(console.error).toHaveBeenCalled();
    
    const mlink = getByTestId('movie-link');
    const mlink_href = mlink.getAttribute('href');
    expect(mlink_href).toBe("/" + data.id);
    
    const mImage = getByTestId('movie-img').src;
    expect(mImage).toBe(`${POSTER_PATH}${data.poster_path}`)
});