import styles from '../movie.module.scss'

import { IMovie } from 'types/movie.d'

import { cx } from 'styles' 

interface Props {
  isClicked: boolean
  clickedData: IMovie | undefined
  setIsClicked: Function
}

const MovieModal = ({ isClicked, clickedData, setIsClicked }: Props) => {

  const handleModalClick = () => {
    setIsClicked((prev: boolean) => !prev)
  }
  
  return (
    <div className={cx(styles.backgroundBlur, {[styles.modalOn]: isClicked})}>
      <div className={cx(styles.movieModal)}>
        <div className={styles.moviePosterBox}>
          <img className={styles.moviePoster} src={clickedData?.Poster} alt="img" />
        </div>
        
        <div className={styles.contents}>
          <h1>{clickedData?.Title}</h1>
        </div>
        <div className={styles.modalBtnBox}>
          <button type='button'>like</button>
          <button type='button' onClick={handleModalClick} >X</button>
        </div>
      </div>
    </div>
  )
}

export default MovieModal