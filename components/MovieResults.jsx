import React from 'react'
import StarRatingComponent from 'react-star-rating-component';

export default function MovieResults({ movieData }) {
  const {title, poster, stars, description, genres} = movieData;

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500${poster}`} />
      <h1>You'll be watching...{title}!</h1>
      <p>{description}</p>
      {genres.length === 1 ?
        <h2>Genre: {genres[0]}</h2>
        :
        <>
        <h2>Genres:</h2>
        <ul>
          {genres.map(genre => (
            <li>{genre}</li>
          ))}
        </ul>
        </>
      }
      <h2>What did critics think?</h2>
      <div style={{ fontSize: '50px' }}>
        <StarRatingComponent name="rating" value={stars} starCount={10} editing={false} />
      </div>
      <h3>{stars}/10 stars</h3>
    </div>
  )
}
