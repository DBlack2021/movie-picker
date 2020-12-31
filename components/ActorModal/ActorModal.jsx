import React, { useEffect, useState } from 'react'
import { getActorData } from '../../utils/utils';
import styles from './ActorModalBody.module.css'

export default function ActorModal({ actorId, character, movie }) {
  //This component is just the BODY of the Modal. The actual <Modal> component will be used in a different component
  const [actorData, setActorData] = useState({
    biography: "",
    name: "",
    profile_path: "",
  });

  useEffect(() => {
    getActorData(actorId).then((response) => {
      setActorData(response);
      return response;
    })
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{actorData.name}</h1>
          <h3 style={{ color: 'darkgrey' }}>{character}</h3>
        </div>
        <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${actorData.profile_path}`} />
      </div>

      <div className={styles.bio}>
        {actorData.biography 
        ?
          <p>{actorData.biography}</p>
        :
          <h2>No Biography Found 😢</h2>
        }
      </div>
    </div>  
  )
}
