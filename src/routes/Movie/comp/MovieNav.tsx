import styles from '../Movie.module.scss'

import { IMovie } from 'types/movie.d'

interface Props {
  item: IMovie[]
}

const MovieNav = () => {
  
  return (
    <nav className={styles.movieNav}>
      <div>nav</div>
    </nav>
  )
}

export default MovieNav