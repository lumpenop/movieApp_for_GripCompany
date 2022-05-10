import styles from '../Movie.module.scss'

import { IMovie } from 'types/movie.d'

import { useState, useEffect, useRef, useMount } from 'hooks'

import { getMovieApi } from 'services/getMovie'



interface Props {
  item: IMovie[]
  setIsClicked: Function
  setClickedIdx: Function
  element: IMovie
  index: number
}

const MovieList = ({ item, setIsClicked, setClickedIdx,  element, index }: Props): JSX.Element => {


  const handleMovieClick = (idx: number) =>{
    setIsClicked((prev: boolean) => !prev)
    setClickedIdx(idx)
  }

  return (
    <div>
      <button 
          type='button' 
          key={element.imdbID}
          onClick={()=>handleMovieClick(index)} 
      >
        <li 
          className={styles.movie} 
        >
          <div className={styles.moviePosterBox}>
            <img className={styles.moviePoster} src={element.Poster} alt="img" />
          </div>
          
          <dl className={styles.contents}>
            <h1>{element.Title}</h1>
            <dt>year : </dt>
            <dd>{element.Year}</dd>
            <dt>type : </dt>
            <dd>{element.Type}</dd>
          </dl>
        </li>
      </button>
    </div>
  )
}

export default MovieList