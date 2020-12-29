import React from 'react'
import { IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styles from '../styles/SearchResult.module.css';

export default function SearchResult({ movie, addMovie }) {

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <div className={styles.container}>
      {movie.poster_path ?
        <img className={styles.poster} src={poster} />
        :
        <h5 className={styles.title}>{movie.title}</h5>
      }
      <IconButton className={styles.addButton} disabled={!movie.title && !movie.poster} onClick={() => addMovie(movie)} color="primary"> 
        <AddCircleIcon />
      </IconButton>
    </div>
  )
}
