import React, { useState, useEffect } from 'react'
import { TextField, Button, IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MovieResults from './MovieResults'
import { getMovieData } from '../utils/utils'
import styles from '../styles/Form.module.css'

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
  const [error, setError] = useState(false);

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
    setError(false);
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
          if(response.title === "") {
            setError(true);
          }
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
    setError(false);
  }

  return (
    <div className={styles.appContainer}>
      <form className={styles.form} autoComplete="off">
        <TextField className={styles.input} id="outlined-basic" label="Enter A Movie..." variant="outlined" onChange={handleInput} value={movie} onKeyDown={preventRefresh} />
        <IconButton className={styles.addMovie} aria-label="delete" disabled={!movie} onClick={addMovie} color="primary">
          <AddCircleIcon />
        </IconButton>
      </form>
      {movies.length > 0 && 
        <div className={styles.dataContainer}>
          <div className={styles.listContainer}>
            <h3>Your Movies:</h3>
            <ul className={styles.list}>
              {movies.map(movie => (
                <li key={movie} onClick={removeMovie}>{movie}</li>
              ))}
            </ul>
            <p><b>Click to remove a movie</b></p>
          </div>

          <div className={styles.submitButtons}>
            <Button variant="contained" disabled={!!chosenMovieData.title} onClick={chooseMovie}>Choose a Movie!</Button>
          </div>

          {error && 
            <div>
              <h3 style={{color: 'red'}}>No movies were found. Please check the titles you entered and try again</h3>
              <Button variant="contained" onClick={reset}>Reset</Button>
            </div>
          }

          {chosenMovieData.title &&
            <div className={styles.results}>
              <MovieResults movieData={chosenMovieData} />
              <Button variant="contained" onClick={reset}>Reset</Button>
            </div>
          }
        </div>   
      }
    </div>
  )
}
