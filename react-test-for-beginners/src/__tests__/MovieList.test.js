import React from "react";
import MovieList from "../MoviesList";
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup, waitFor } from "@testing-library/react";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

beforeEach(() => {
  fetch.resetMocks();
});

afterEach(cleanup);

const data = {
    results: [
        { id: '212', title: 'Pixels', poster_path: 'sample.jpg' },
        { id: '443', title: 'Tomatoes', poster_path: 'sample2.jpg' }
    ]
};


test("Movie List API", async () => {
    fetch.mockResponseOnce(JSON.stringify(data));
    
    const { getByTestId, queryByTestId } = render(<MemoryRouter><MovieList /></MemoryRouter>);
    //debug();
    expect(getByTestId('loading')).toBeTruthy();
    
    waitFor(() => {
        expect(getByTestId('movie-img')).toBeInTheDocument();
        expect(getByTestId('movie-link').getAttribute('href')).toEqual(`/${data.results[0].id}`);
    });
    //expect(queryByTestId('loading')).toBeFalsy();  

});

