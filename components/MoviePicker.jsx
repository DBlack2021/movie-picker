import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'

export default function MoviePicker() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [chosenMovie, setChosenMovie] = useState("");

  useEffect(() => {
    //When the user adds/removes a movie, reset the input and allow them to choose a new movie.
    setChosenMovie("");
    setMovie("");
  }, [movies])

  const addMovie = () => {
    setMovies(movie && [...new Set([...movies, movie])])
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

  const chooseMovie = () => {
    // "~~" for a closest "int"
    if(!chosenMovie) {
      setChosenMovie(movies[~~(movies.length * Math.random())]);
    }
  }

  const reset = () => {
    setMovies([]);
    setMovie("");
    setChosenMovie("");
  }

  return (
    <div>
      <form autoComplete="off">
        <TextField id="outlined-basic" label="Enter A Movie..." variant="outlined" onChange={handleInput} value={movie} onKeyDown={preventRefresh} />
        <Button variant="contained" disabled={!movie} onClick={addMovie}>Add Movie</Button>
      </form>
      {movies.length > 0 && 
        <div>
          <p>Click to remove a movie</p>
          <ol>
            {movies.map(movie => (
              <li key={movie} onClick={removeMovie}>{movie}</li>
            ))}
          </ol>
          <Button variant="contained" onClick={chooseMovie}>Choose a Movie!</Button>
          
          {chosenMovie &&
          <h1>You will be watching...{chosenMovie}!</h1>}
        
          <Button variant="contained" onClick={reset}>Reset</Button>
        </div>   
      }
    </div>
  )
}
