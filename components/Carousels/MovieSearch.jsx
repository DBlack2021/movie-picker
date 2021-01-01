import React from 'react'
import SearchResult from '../SearchResult/SearchResult'
import { useMediaQuery } from 'react-responsive'
import styles from './SearchResults.module.css';
import Carousel from './Carousel';

export default function MovieSearch({ results, addMovie }) {
  const isMobile = useMediaQuery({
    query: '(max-device-width: 600px)'
  })

  return (
    <div className={styles.container}>
      <Carousel itemsPerPage={isMobile ? 1 : 3}>
        {
          results.map(result => (
            <SearchResult key={result.id} movie={result} addMovie={addMovie} />
          ))
        }
      </Carousel>
    </div>
  )
}
