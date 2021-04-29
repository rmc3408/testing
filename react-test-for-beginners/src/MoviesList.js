
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends PureComponent {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=d2cbb8174a5c4d9f624441cd1d1e1188&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
      );
      const movies = await res.json();
      //console.log(movies)
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.movies < 1) return <h1 data-testid='loading'>Loading...</h1>;

    return (
      <MovieGrid>
        {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
