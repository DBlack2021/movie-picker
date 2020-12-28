import React, { useState } from 'react'

import { IconButton } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import SearchResult from './SearchResult'

import styles from '../styles/SearchResults.module.css';

export default function MovieSearch({ results, addMovie }) {
  const [page, setPage] = useState(0);

  //Code from Grepper
  const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

  const pages = chunk(results, 3);

  const changePage = (increment) => {
    setPage(page + increment);
  }

  return (
    <div>
      <IconButton className={styles.navButton} disabled={page == 0} onClick={() => changePage(-1)} color="primary">
        <NavigateBeforeIcon />
      </IconButton>

      <div>
        {
          pages[page].map(movie => (
            <SearchResult key={movie.title} movie={movie} addMovie={() => addMovie(movie)} />
          ))
        }
      </div>
      
      <IconButton className={styles.navButton} disabled={page == pages.length - 1} onClick={() => changePage(1)} color="primary">
        <NavigateNextIcon />
      </IconButton>
    </div>
  )
}
