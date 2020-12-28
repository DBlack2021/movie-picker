
import SearchResult from '../components/SearchResult';
import { TestMovie, TestMovies } from '../utils/TestData';

export default function Playground () {

  const addMovie = (movie) => {
    console.log(movie)
  }

  return (
    <div>
      <h1>Da Playground</h1>
      {/* Random Testing Shtuff goes here */}
      <SearchResult movie={TestMovie} addMovie={addMovie} />
    </div>
  )
}