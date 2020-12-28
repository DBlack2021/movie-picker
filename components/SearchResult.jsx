import React from 'react'
import { IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function SearchResult({ movie, addMovie }) {

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster}`;

  return (
    <div>
      {poster && 
        <img src={poster} />
      }
      <h3>{movie.title}</h3>
      <IconButton aria-label="delete" disabled={!movie.title && !movie.poster} onClick={() => addMovie(movie)} color="primary">
        <AddCircleIcon />
      </IconButton>
    </div>
  )
}
