
import { useMount, useState, useEffect, useRef } from 'hooks'
import store from 'storejs'

import styles from './movie.module.scss'
import { cx } from 'styles'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import MovieList from './comp/MovieList'
import MovieNav from './comp/MovieNav'
import MovieModal from './comp/MovieModal'

import { getMovieApi } from 'services/getMovie'
import { IMovie } from 'types/movie'

import { useRecoil } from 'hooks/state'
import { movieClickedIdxState, movieTabNum, favoriteData, moviePages } from 'states/movieStates'

let result : IMovie[]

const Movie = () => {

  const [clickedIdx, ] = useRecoil(movieClickedIdxState)
  const [data, setData ] = useState<IMovie[]>([])
  const [favoData, setFavoData] = useRecoil(favoriteData)
  
  const [pages, setPages] = useRecoil(moviePages)
  const [searchValue, setSearchValue] = useState<string>('')
  const [tabNum, ] = useRecoil(movieTabNum)
  const [io, setIo] = useState<IntersectionObserver|null>(null)
  
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

  const handleLikeClick = () =>{
    store.set(data[clickedIdx].imdbID, JSON.stringify(data[clickedIdx]))
  }

  const hanleFavoriteTabClick = () =>{
    result = []
    store.forEach((k, d) => {
      result.push(JSON.parse(d))
    })
    setFavoData(result)
  }

  const handleSearchClick = () => {
    if(searchValue !== ''){
      getMovieApi({
        s: searchValue,
        page: pages,
      })
      .then((res) => {
        if(res.data.Search === undefined) return
        setData(prev=>[...prev].concat(res.data.Search))
      })
      .catch(err=>{
        if(err.response === 'false') return
        console.log(err)
      })
    }
  }
  
  useEffect(()=>{
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
        <form onSubmit={(event)=> {
            event.preventDefault()
            setTimeout(() => {
              setData(()=>[])
              setPages(()=>0)
            }, 200 )
            handleSearchClick()
          }
        }>
          <input 
            type='text' 
            placeholder='Search'
            onChange={(event)=>handleInputChange(event.currentTarget.value)}
            value={searchValue}  
          />
          <button 
            type='submit' 
            className={styles.searchBtn}
          >
            검색
          </button>
        </form>
      </div>
      <main className={styles.main}>
        <h1>Movies</h1>
        <div className={styles.movieListBox} >
          <ul className={styles.movieList} >
            {
              data.length !== 0
              ? <MovieList data={tabNum===0? data : favoData}/>
              : '검색 결과가 없습니다'
            }
            <div 
              className={cx({[styles.none]: tabNum===1})}
              ref={movieList}>  
              hi
            </div>
          </ul>
        </div>
        <MovieModal
          handleLikeClick={handleLikeClick}
          clickedData={data[clickedIdx]} 
        />
      </main>
      <MovieNav 
        hanleFavoriteTabClick={hanleFavoriteTabClick}
      />
    </div>
  )
}

export default Movie
