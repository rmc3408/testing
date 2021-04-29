import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import MovieDetail from "../MovieDetail";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

beforeEach(() => {
  fetch.resetMocks();
});

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
  fetch.mockResponseOnce(JSON.stringify(data));
  const { getByTestId } = render(<MovieDetail match={data} />);
  const h1Title = await waitFor(() => getByTestId("title"));
  expect(h1Title.textContent).toEqual(data.title);
});
