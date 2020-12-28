import SearchResult from '../components/SearchResult'
import MovieSearch from '../components/MovieSearch'
import { TestMovie1, TestMovie2, TestMovies } from '../utils/TestData';

export default function Playground () {

  const addMovie = (movie) => {
    console.log(movie)
  }

  return (
    <MovieSearch results={TestMovies} addMovie={addMovie} />
    
  )
}