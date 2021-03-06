import styles from '../Movie.module.scss'

import { IMovie } from 'types/movie.d'

import { cx } from 'styles'

import { useRecoil } from 'hooks/state'
import { useEffect, useState } from 'react'
import { movieClickState } from 'states/movieStates'

import store from 'storejs'
import { useParams } from 'react-router-dom'

interface Props {
  clickedData: IMovie
  handleFavoriteTabClick: Function
}

const MovieModal = ({ clickedData, handleFavoriteTabClick }: Props) => {
  const params = useParams()

  const [isClicked, setIsClicked] = useRecoil(movieClickState)
  const [buttonValue, setButtonValue] = useState<string>('like')

  useEffect(() => {
    if (params?.favorite || store.keys().includes(clickedData?.imdbID)) {
      setButtonValue('unLike')
    } else {
      setButtonValue('like')
    }
  }, [isClicked])

  const handleLikeClick = () => {
    if (buttonValue === 'unLike') {
      store.remove(`${clickedData?.imdbID}`)
      handleFavoriteTabClick()
      handleModalClick()
    } else {
      const clicked = clickedData
      store.set(`${clicked?.imdbID}`, JSON.stringify(clicked))
    }
    setIsClicked(false)
  }

  const handleModalClick = () => {
    setIsClicked((prev: boolean) => !prev)
  }

  return (
    <div className={cx(styles.backgroundBlur, { [styles.modalOn]: isClicked })}>
      <div className={cx(styles.movieModal)}>
        <div className={styles.moviePosterBox}>
          <img className={styles.moviePoster} src={clickedData?.Poster} alt='img' />
        </div>

        <div className={styles.contents}>
          <h1>{clickedData?.Title}</h1>
        </div>
        <div className={styles.modalBtnBox}>
          <button type='button' onClick={handleLikeClick}>
            {buttonValue}
          </button>
          <button type='button' onClick={handleModalClick}>
            X
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
