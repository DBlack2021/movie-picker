import MoviePicker from '../components/MoviePicker'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Can't Decide What To Watch?</h1>
        <h2 className={styles.subtitle}>Enter Movies Below And Let Technology Decide Your Fate...</h2>
      </div>
      <MoviePicker />
    </div>
  )
}
