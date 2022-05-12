
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
import { movieClickedIdxState, favoriteData, moviePages, movieDataState } from 'states/movieStates'
import { FormEvent } from 'react'

import { useParams } from 'react-router-dom'

import bittersweetForNoImg from 'assets/movies/bittersweet.jpeg'

let result : IMovie[]

const Movie = () => {

  const params = useParams()

  const [clickedIdx, ] = useRecoil(movieClickedIdxState)
  const [data, setData ] = useRecoil(movieDataState)
  const [favoData, setFavoData] = useRecoil(favoriteData)
  
  const [pages, setPages] = useRecoil(moviePages)
  const [searchValue, setSearchValue] = useState<string>('')
  const [io, setIo] = useState<IntersectionObserver|null>(null)

  const [isEnd, setIsEnd] = useState<boolean>(false)

  const [isSearchCliked, setIsSearchClicked] = useState<boolean>(false)
  
  const movieList = useRef <HTMLDivElement>(null)

  const isPoster = (prev: IMovie[]) =>{
    const postData = prev.map(element=>{
      if(element.Poster === 'N/A'){
        const newEle = {...element}
        newEle.Poster = bittersweetForNoImg
        return newEle
      }
      return element
    })
    return postData
  }

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
      },{threshold: 1.0})
    })
    setIo(targetIO)
  })
  io?.observe(movieList.current as Element)

  const hanleFavoriteTabClick = () =>{
    result = []
    store.forEach((k, d) => {
      result.push(JSON.parse(d))
    })
    setFavoData(result)
  }

  const getAPIData = () =>{
    getMovieApi({
        s: searchValue,
        page: pages,
      })
      .then((res) => {
        if(res.data.Search === undefined) {
          setIsEnd(true)
          return
        }
        setIsEnd(false)
        setData(prev=>[...prev].concat(isPoster(res.data.Search)))
      })
      .catch(err=>{
        if(err.response === 'false') return
        console.log(err)
      })
  }

  const handleSearchClick = (event: FormEvent | undefined) => {
    setTimeout(()=>{
      setIsSearchClicked(prev => !prev)
    }, 300)
    if(searchValue !== ''){
      if(event !== undefined){
        event.preventDefault()
        setTimeout(() => {
          setData(()=>[])
          setPages(()=>0)
        }, 200 )
      }
    getAPIData()
    }
  }
  
  useEffect(()=>{
    if(pages > 0){
      handleSearchClick(undefined)
    }
  },[pages])

  const handleInputChange = (value: string) => {
    setSearchValue(value)
  }
  // if (!data) return null

  return (
    <div className={styles.movieContainer}>
      <h1 className={styles.hello}>Hello user</h1>
      <header className={styles.searchBox}>
        <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
        <form onSubmit={(event)=> {
            handleSearchClick(event)
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
      </header>
      <main className={styles.main}>
        <h1>Movies</h1>
        <div className={styles.movieListBox} >
          <ul className={styles.movieList} >
            { 
              data.length !== 0 || params?.favorite
              ? <MovieList data={!params?.favorite ? data : favoData}/>
              : <p>{isSearchCliked ? '검색 결과가 없습니다' : ''}</p>
            }
            <div 
              className={cx(styles.lastOne, 
                {[styles.none]: params?.favorite},
                {[styles.isEnd]: isEnd}
              )}
              ref={movieList}> 
              { isEnd ? '검색 결과가 없습니다' : ''}
            </div>
          </ul>
        </div>
        <MovieModal
          clickedData={!params?.favorite? data[clickedIdx] : favoData[clickedIdx]}
          hanleFavoriteTabClick={hanleFavoriteTabClick}
        />
      </main>
      <footer>
        <MovieNav 
          hanleFavoriteTabClick={hanleFavoriteTabClick}
        />
      </footer>
    </div>
  )
}

export default Movie
