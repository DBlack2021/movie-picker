import { TestMovies } from '../utils/TestData'

import Carousel from '../components/Carousel'
import SearchResult from '../components/SearchResult'

export default function Playground() {

  const addMovie = (movie) => {
    console.log(movie);
  }

  return (
    <div>
      <Carousel itemsPerPage={3}>
        {TestMovies.map(movie =>
          <SearchResult movie={movie} addMovie={addMovie} />
        )}
      </Carousel>
    </div>
  )
}