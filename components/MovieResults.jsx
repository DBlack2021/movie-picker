import React from 'react'
import StarRatingComponent from 'react-star-rating-component';
import styles from '../styles/Results.module.css';

export default function MovieResults({ movieData }) {
  const {title, poster, stars, description, genres} = movieData;

  return (
    <div className={styles.resultsContainer}>
      <img src={`https://image.tmdb.org/t/p/w500${poster}`} />
      <h1>You'll be watching...</h1>
      <h1>{title}!</h1>
      <p>{description}</p>
      <div className={styles.genreAndStars}>
        <div className={styles.genres}>
          {genres.length === 1 ?
            <h2 className={styles.subtitle}>Genre: {genres[0]}</h2>
            :
            <div className={styles.listContainer}>
              <h2 className={styles.subtitle}>Genres:</h2>
              <ul>
                {genres.map(genre => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          }
        </div>
        
        <div className={styles.stars}>
          <h2 className={styles.subtitle}>What did critics think?</h2>
          <div style={{ fontSize: '50px' }}>
            <StarRatingComponent name="rating" value={stars} starCount={10} editing={false} />
          </div>
          <h3 style={{ marginTop: '-10px' }}>{stars}/10 stars</h3>
        </div>
      </div>
      
    </div>
  )
}
