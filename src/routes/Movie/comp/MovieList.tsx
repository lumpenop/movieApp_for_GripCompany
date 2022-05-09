import styles from '../Movie.module.scss'

import { IMovie } from 'types/movie.d'

import { useState } from 'hooks'

interface Props {
  item: IMovie[]
  setIsClicked: Function
  setClickedIdx: Function
}

const MovieList = ({ item, setIsClicked, setClickedIdx }: Props) => {
  const handleMovieClick = (idx: number) =>{
    setIsClicked((prev: boolean) => !prev)
    setClickedIdx(idx)
  }
  
  return (
    <div className={styles.movieListBox}>
      <ul className={styles.movieList} >
        {item.map((element, idx)=>{
          return (
            <button type='button' 
                onClick={()=>handleMovieClick(idx)} >
              <li 
                className={styles.movie} 
                key={element.imdbID}
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
          )
        })}
      </ul>
    </div>
  )
}

export default MovieList