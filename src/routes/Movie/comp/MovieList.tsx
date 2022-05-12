import styles from '../movie.module.scss'

import { IMovie } from 'types/movie.d'

import { useRecoil } from 'hooks/state'
import { movieClickState, movieClickedIdxState, moviePages } from 'states/movieStates'
import {  DOMAttributes, ReactEventHandler, SyntheticEvent } from 'react'


interface Props {
  data: IMovie[]
}

const MovieList = ({data}: Props): JSX.Element => {

  const [, setIsClicked] = useRecoil(movieClickState)
  const [, setClickedIdx] = useRecoil(movieClickedIdxState)

  const handleMovieClick = (idx: number) =>{
    setIsClicked((prev: boolean) => !prev)
    setClickedIdx(idx)
  }
  

  return (
    <div>
      <ul className={styles.movieList} >
        {
          data.length !== 0
          ? 
            data.map((element, index)=>{
              return (
                <button 
                  type='button' 
                  key={`${element.imdbID}${index}`}
                  onClick={()=>handleMovieClick(index)} 
                >
                  <li 
              className={styles.movie} 
            >
                    <div className={styles.moviePosterBox}>
                      <img className={styles.moviePoster} 
                        src={element.Poster} 
                        alt="img"
                      />
                    </div>
              
                    <dl className={styles.contents}>
                      <h1>{element.Title }({element.Year})</h1>
                      <dt>type : </dt>
                      <dd>{element.Type}</dd>
                    </dl>
                  </li>
                </button>

              )})
          :'검색 결과가 없습니다'
        }
      </ul>
    </div>
  )
}

export default MovieList