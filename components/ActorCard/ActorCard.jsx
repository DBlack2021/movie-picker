import React from 'react'
import styles from './ActorCard.module.css';

export default function ActorCard({ actor }) {

  const {character, name, profile_path: imgSrc} = actor; 

  return (
    <div className={styles.container}>
      {imgSrc &&
        <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${imgSrc}`} />
      }
      <div className={styles.text}>
        <h5 className={styles.name}>{name}</h5>
      </div>

    </div>
  )
}
