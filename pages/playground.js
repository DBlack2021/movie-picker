import MovieSearch from '../components/MovieSearch'
import { TestMovies } from '../utils/TestData';

export default function Playground () {

  const addMovie = (movie) => {
    console.log(movie)
  }

  return (
    <MovieSearch results={TestMovies} addMovie={addMovie} />
  )
}