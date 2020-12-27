import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'

export default function MoviePicker() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");

  const addMovie = () => {
    setMovies(movie && [...movies, movie])
    setMovie("");
  }

  const removeMovie = (event) => {
    let movie = event.target.innerHTML; //TODO: Find better way of doing this
    const newMovies = movies.filter(movieName => movieName != movie)
    setMovies(newMovies);
  }

  const handleInput = (event) => {
    setMovie(event.target.value);
  }

  const preventRefresh = (event) => {
    if(event.keyCode === 13) {
      event.preventDefault();
      addMovie();
    }
  }

  return (
    <div>
      <form autoComplete="off">
        <TextField id="outlined-basic" label="Enter A Movie..." variant="outlined" onChange={handleInput} value={movie} onKeyDown={preventRefresh} />
        <Button variant="contained" onClick={addMovie}>Add Movie</Button>
      </form>
      {movies.length > 0 &&
        <div>
          <p>Click to remove a movie</p>
          <ol>
            {[...new Set(movies)].map(movie => (
              <li key={movie} onClick={removeMovie}>{movie}</li>
            ))}
          </ol>
          <Button variant="contained">Choose a Movie!</Button>
        </div>
      }
      
    </div>
  )
}
