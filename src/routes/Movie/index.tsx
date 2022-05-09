import styles from './Movie.module.scss'

import { useMount, useState, useUnmount } from 'hooks'

import { IMovieAPIRes } from 'types/movie.d'
import { getMovieApi } from 'services/getMovie'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import MovieList from './comp/MovieList'
import MovieNav from './comp/MovieNav'
import MovieModal from './comp/MovieModal'

import { cx } from 'styles' 


const Movie = () => {
  const [data, setData] = useState<IMovieAPIRes>()
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [clickedIdx, setClickedIdx] = useState<number>(0)

  const handleSearchClick = () =>{
    getMovieApi({
      s: 'iron man',
      page: 1,
    })
    .then((res) => {
      console.log(res.data.Search)
      setData(res.data)
    })
  }

  // if (!data) return null

  return (
    <div className={styles.movieContainer}>
      <h1 className={styles.hello}>Hello user</h1>
      <div className={styles.searchBox}>
        <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
        <input type='text' placeholder='Search' />
        <button
          onClick={handleSearchClick} 
          type='button' 
          className={styles.searchBtn}
        >
          검색
        </button>
      </div>
      <main className={styles.main}>
        <h1>Movies</h1>
        {data
          ? <MovieList 
              item={data.Search} 
              setIsClicked={setIsClicked}
              setClickedIdx={setClickedIdx}
            />
          :'검색 결과가 없습니다'}
        <MovieModal
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          clickedData={data?.Search[clickedIdx]} 
        />
      </main>
      <MovieNav />
    </div>
  )
}

export default Movie
