import styles from '../Movie.module.scss'
import { cx } from 'styles'

import { IMovie } from 'types/movie.d'

import { movieClickState, movieClickedIdxState } from 'states/movieStates'
import { useRecoil } from 'hooks/state'

import store from 'storejs'

interface Props {
  data: IMovie[]
}

const MovieList = ({ data }: Props): JSX.Element => {
  const [, setIsClicked] = useRecoil(movieClickState)
  const [, setClickedIdx] = useRecoil(movieClickedIdxState)

  const handleMovieClick = (idx: number) => {
    setIsClicked((prev: boolean) => !prev)
    setClickedIdx(idx)
  }

  return (
    <div>
      <ul className={styles.movieList}>
        {data?.map((element, index) => {
          return (
            <button type='button' key={`${element.imdbID}${index}`} onClick={() => handleMovieClick(index)}>
              <li className={cx(styles.movie, { [styles.favoMovie]: store.keys().includes(element.imdbID) })}>
                <div className={styles.moviePosterBox}>
                  <img className={styles.moviePoster} src={element.Poster} alt='img' />
                </div>
                <dl className={styles.contents}>
                  <h1>
                    {element.Title}({element.Year})
                  </h1>
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
