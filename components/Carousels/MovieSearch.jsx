import React from 'react'
import SearchResult from '../SearchResult/SearchResult'

import styles from './SearchResults.module.css';
import Carousel from './Carousel';

export default function MovieSearch({ results, addMovie }) {
  return (
    <div className={styles.container}>
      <Carousel itemsPerPage={3}>
        {
          results.map(result => (
            <SearchResult movie={result} addMovie={addMovie} />
          ))
        }
      </Carousel>
    </div>
  )
}
