import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import { getGenres, getMovieData } from '../utils/utils'

export default function MoviePicker() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [chosenMovieData, setChosenMovieData] = useState({
    description: "", 
    genres: [], 
    id: 0, 
    poster: "", 
    stars: "", 
    title: ""
  })

  useEffect(() => {
    //When the user adds/removes a movie, reset the input and allow them to choose a new movie.
    setMovie("");
    setChosenMovieData({
      description: "", 
      genres: [], 
      id: 0, 
      poster: "", 
      stars: "", 
      title: ""
    })
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
    if(!chosenMovieData.title) {
      const randomMovieTitle = movies[~~(movies.length * Math.random())];

      getMovieData(randomMovieTitle).then((response) => {
        setChosenMovieData(response)
      })
    } 
  }

  const reset = () => {
    setMovies([]);
    setMovie("");
    setChosenMovieData({
      description: "", 
      genres: [], 
      id: 0, 
      poster: "", 
      stars: "", 
      title: ""
    })
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
          <Button variant="contained" disabled={!!chosenMovieData.title} onClick={chooseMovie}>Choose a Movie!</Button>
          
          {/* TODO: move to separate MovieResults component */}
          {chosenMovieData.title &&
            <div>
              <h1>You will be watching...{chosenMovieData.title}!</h1>
              {console.log(chosenMovieData)}
              <p>{chosenMovieData.description}</p>
            </div>
          }
        
          <Button variant="contained" onClick={reset}>Reset</Button>
        </div>   
      }
    </div>
  )
}
