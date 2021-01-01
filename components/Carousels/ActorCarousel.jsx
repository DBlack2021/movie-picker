import React from 'react'
import ActorCard from '../ActorCard/ActorCard'
import { useMediaQuery } from 'react-responsive'
import styles from './SearchResults.module.css';
import Carousel from './Carousel';

export default function ActorCarousel({ results }) {
  const isMobile = useMediaQuery({
    query: '(max-device-width: 600px)'
  })

  return (
    <div style={{ padding: '30px' }} className={styles.container}>
      <Carousel itemsPerPage={isMobile ? 1 : 5}>
        {
          results.filter(result => result.profile_path).map(result => (
            <ActorCard key={result.id} actor={result} />           
          ))
        }
      </Carousel>
    </div>
  )
}
