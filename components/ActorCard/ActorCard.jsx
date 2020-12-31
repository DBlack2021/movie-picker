import React, { useState } from 'react'
import { Modal } from '@material-ui/core'
import styles from './ActorCard.module.css';
import ActorModal from '../ActorModal/ActorModal';

export default function ActorCard({ actor }) {

  const {character, name, profile_path: imgSrc, id} = actor; 
  const [modalOpen, setModalOpen] = useState(false);

  const modalStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div className={styles.container}>
      {imgSrc &&
        <img onClick={() => setModalOpen(true)} className={styles.img} src={`https://image.tmdb.org/t/p/w500${imgSrc}`} />
      }
      <div className={styles.text}>
        <h5 className={styles.name}>{name}</h5>
      </div>
      <Modal style={modalStyles} open={modalOpen} onClose={() => setModalOpen(false)}>
        <ActorModal actorId={id} character={character} />
      </Modal>
    </div>
  )
}
