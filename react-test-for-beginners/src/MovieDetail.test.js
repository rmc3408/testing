import React from "react";
import { render, cleanup, wait } from "react-testing-library";
import MovieDetail from "./MovieDetail";

global.fetch = require("jest-fetch-mock");

afterEach(cleanup);

const data = {
  params: {
    id: "00545264",
  },
  id: "002",
  title: "Pixels",
  poster_path: "sample.jpg",
  backdrop_path: "backimage.jpg",
  release_date: "2021",
  overview: "Lorem ipsum",
};

test("Movie rendering", async () => {
    await fetch.mockResponseOnce(JSON.stringify(data));
    
    const { getByText, getByTestId } = render(<MovieDetail match={data} />);
    await wait(() => getByText(data.title));
    const h1Title = getByTestId('title');
    expect(h1Title.textContent).toBe(data.title);

});

