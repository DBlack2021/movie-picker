import React, { useState } from 'react'

import { IconButton } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import styles from './SearchResults.module.css'

export default function Carousel({ itemsPerPage, children }) {
  const [page, setPage] = useState(0);

  //Code from Grepper, don't ask me how it works 😬
  const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

  const pages = children.length >= itemsPerPage ? chunk(children, itemsPerPage) : [children];

  const changePage = (increment) => {
    setPage(page + increment);
  }

  return (
    <div className={styles.container}>
      <IconButton className={styles.navButton} disabled={page == 0} onClick={() => changePage(-1)} color="primary">
        <NavigateBeforeIcon />
      </IconButton>

      <div className={styles.results}>
        {
          pages[page].map(child => (
            child
          ))
        }
      </div>
      
      <IconButton className={styles.navButton} disabled={page == pages.length - 1} onClick={() => changePage(1)} color="primary">
        <NavigateNextIcon />
      </IconButton>
    </div>
  )
}
