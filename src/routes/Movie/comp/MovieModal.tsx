import styles from '../movie.module.scss'

import { IMovie } from 'types/movie.d'

import { cx } from 'styles' 
import { MouseEventHandler } from 'react'

import { useRecoil } from 'hooks/state'
import {  movieClickState, movieTabNum } from 'states/movieStates'



interface Props {
  clickedData: IMovie | undefined
  handleLikeClick: MouseEventHandler
}

const MovieModal = ({ clickedData, handleLikeClick }: Props) => {

  const [isClicked, setIsClicked] = useRecoil(movieClickState)
  const [tabNum, setTabNum] = useRecoil(movieTabNum)

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
          <button type='button' onClick={handleLikeClick} >
            {tabNum===0 ? 'like' : 'unLike'}
          </button>
          <button type='button' onClick={handleModalClick} >X</button>
        </div>
      </div>
    </div>
  )
}

export default MovieModal