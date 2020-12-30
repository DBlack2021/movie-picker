import React, { useState, useEffect } from 'react'
import { TextField, Button, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import MovieResults from '../MovieResults/MovieResults'
import { getMovieData, searchMovies } from '../../utils/utils'
import styles from './Form.module.css'
import MovieSearch from '../Carousels/MovieSearch';

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
    title: "",
    starring: [],
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
      title: "",
      starring: [],
    })
    setSearchResults([]);
    setError(false);
  }, [movies])

  const addMovie = (movie) => {
    setMovies([...new Set([...movies, movie])])
  }

  const removeMovie = (event) => {
    let movieID = event.target.value;
    const newMovies = movies.filter(movieFilter => movieFilter.id != movieID)
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
      const randomMovie = movies[~~(movies.length * Math.random())];

      getMovieData(randomMovie.id).then(response => {
        console.log(response);
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
      title: "",
      starring: [],
    })
    setError(false);
  }

  const search = () => {
    if(movie) {
      searchMovies(movie).then(response => {
        if(response.results.length == 0) {
          setError(true);
        } else {
          setSearchResults(response.results);
          setMovie("");
        }
      })
    }  
  }

  const closeNoResults = () => {
    setError(false);
    setMovie("");
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
        <div className={styles.results}>
          <MovieSearch results={searchResults} addMovie={addMovie} />
          <Button variant="contained" onClick={() => setSearchResults([])}>Close Results</Button>
        </div>
      }

      {error && 
        <div className={styles.error}>
          <h3 style={{color: 'red'}}>No movies were found. Please check the titles you entered and try again</h3>
          <Button variant="contained" onClick={closeNoResults}>Close</Button>
        </div>
      }

      {movies.length > 0 && 
        <div className={styles.dataContainer}>
          <div className={styles.listContainer}>
            <h3>Your Movies:</h3>
            <ul className={styles.list}>
              {movies.map(movie => (
                <li key={movie.id} onClick={removeMovie} value={movie.id}>{movie.title}</li>
              ))}
            </ul>
            <p><b>Click to remove a movie</b></p>
          </div>

          <div className={styles.submitButtons}>
            <Button variant="contained" disabled={!!chosenMovieData.title} onClick={chooseMovie}>Choose a Movie!</Button>
          </div>

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
