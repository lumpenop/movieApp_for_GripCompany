import styles from './Movie.module.scss'

import { useMount, useState, useRef, useEffect } from 'hooks'

import { IMovieAPIRes, IMovie } from 'types/movie.d'
import { getMovieApi } from 'services/getMovie'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import MovieList from './comp/MovieList'
import MovieNav from './comp/MovieNav'
import MovieModal from './comp/MovieModal'

import { cx } from 'styles' 

const Movie = () => {

  const [data, setData] = useState<IMovie[]>([])
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [clickedIdx, setClickedIdx] = useState<number>(0)
  const [pages, setPages] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<string>('')
  const [io, setIo] = useState<IntersectionObserver|null>(null)

  const handleSearchClick = ()=>{
    if(searchValue !== ''){
      getMovieApi({
        s: searchValue,
        page: pages,
      })
      .then((res) => {
        console.log(res.data)
        
        setData(data.concat(res.data.Search))
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
  const movieList = useRef <HTMLDivElement>(null)
  
  useMount(()=>{
    const targetIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPages((prev: number)=>{
            const next = prev+1
            return next
          })
          if (io !== null) io.disconnect()
        }
      })
    })
    setIo(targetIO)
  })
  io?.observe(movieList.current as Element)
  useEffect(()=>{
    console.log(pages)
    console.log(data)
    handleSearchClick()
  },[pages])

  const handleInputChange = (value: string) => {
    setSearchValue(value)
  }

  // if (!data) return null

  return (
    <div className={styles.movieContainer}>
      <h1 className={styles.hello}>Hello user</h1>
      <div className={styles.searchBox}>
        <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
        <input 
          type='text' 
          placeholder='Search'
          onChange={(event)=>handleInputChange(event.currentTarget.value)}
          value={searchValue}  
        />
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
        <div className={styles.movieListBox} >
          <ul className={styles.movieList} >
            {data.length !== 0
              ? 
                data.map((element, index)=>{
                return (
                  <MovieList 
                    index={index}
                    element={element}
                    item={data} 
                    setIsClicked={setIsClicked}
                    setClickedIdx={setClickedIdx}
                  />
                )})
              :'검색 결과가 없습니다'}
              <div ref={movieList}>hi</div>
          </ul>
        </div>
        <MovieModal
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          clickedData={data[clickedIdx]} 
        />
      </main>
      <MovieNav />
    </div>
  )
}

export default Movie
