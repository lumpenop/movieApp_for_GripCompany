import styles from '../movie.module.scss'

import { IMovie } from 'types/movie.d'

import { cx } from 'styles' 

import { useRecoil } from 'hooks/state'
import { movieClickedIdxState, movieDataState, movieClickState } from 'states/movieStates'

import store from 'storejs'
import { useParams } from 'react-router-dom'


interface Props {
  clickedData: IMovie | undefined
  hanleFavoriteTabClick: Function
}

const MovieModal = ({ clickedData, hanleFavoriteTabClick }: Props) => {

  const params = useParams()

  const [isClicked, setIsClicked] = useRecoil(movieClickState)

  const handleLikeClick = () => {
    if(params?.favorite){
      store.remove(`${clickedData?.imdbID}`)
      hanleFavoriteTabClick()
      handleModalClick()
    }else{
      const clicked = clickedData
      console.log(clicked)
      store.set(`${clicked?.imdbID}`, JSON.stringify(clicked))
    }
  }

  const handleModalClick = () => {
    console.log()
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
            {!params?.favorite ? 'like' : 'unLike'}
          </button>
          <button type='button' onClick={handleModalClick} >X</button>
        </div>
      </div>
    </div>
  )
}

export default MovieModal