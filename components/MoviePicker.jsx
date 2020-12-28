import React, { useState, useEffect } from 'react'
import { TextField, Button, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import MovieResults from './MovieResults'
import { getMovieData, searchMovies } from '../utils/utils'
import styles from '../styles/Form.module.css'
import MovieSearch from './MovieSearch';

export default function MoviePicker() {
  const [movies, setMovies] = useState([]); //the list of movies (an array of objects)
  const [movie, setMovie] = useState(""); //the current search query

  const [searchResults, setSearchResults] = useState([]) //results

  const [chosenMovieData, setChosenMovieData] = useState({
    description: "", 
    genres: [], 
    id: 0, 
    poster: "", 
    stars: "", 
    title: ""
  }) //the randomly chosen movie

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
    setSearchResults([]);
    setError(false);
  }, [movies])

  const addMovie = (movie) => {
    setMovies([...new Set([...movies, movie])])
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
      search();
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

  const search = () => {
    if(movie) {
      searchMovies(movie).then(response => {
        setSearchResults(response);
      })
    }
  }

  return (
    <div className={styles.appContainer}>
      <form className={styles.form} autoComplete="off">
        <TextField className={styles.input} id="outlined-basic" label="Enter A Movie..." variant="outlined" onChange={handleInput} value={movie} onKeyDown={preventRefresh} />
        <IconButton className={styles.addMovie} disabled={!movie} onClick={search} color="primary">
          <SearchIcon />
        </IconButton>
      </form>

      {searchResults.length != 0 && 
        <MovieSearch results={searchResults.results} addMovie={addMovie} /> 
      }

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
