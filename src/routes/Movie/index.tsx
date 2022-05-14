import { useMount, useState, useEffect, useRef } from 'hooks'
import { FormEvent } from 'react'
import store from 'storejs'

import styles from './movie.module.scss'
import { cx } from 'styles'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MovieList from './comp/MovieList'
import MovieNav from './comp/MovieNav'
import MovieModal from './comp/MovieModal'
import MovieDropDown from './comp/MovieDropDown'

import { getMovieApi } from 'services/getMovie'
import { IMovie } from 'types/movie'

import { useRecoil } from 'hooks/state'
import { movieClickedIdxState, favoriteData, movieDataState, movieSortYear, movieSortTitle } from 'states/movieStates'

import { useParams } from 'react-router-dom'

import bittersweetForNoImg from 'assets/movies/bittersweet.jpeg'

let result: IMovie[]

const Movie = () => {
  const params = useParams()

  const [clickedIdx] = useRecoil(movieClickedIdxState)
  const [data, setData] = useRecoil(movieDataState)
  const [favoData, setFavoData] = useRecoil(favoriteData)
  const [year] = useRecoil(movieSortYear)
  const [title] = useRecoil(movieSortTitle)

  const [pages, setPages] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<string>('')
  const [io, setIo] = useState<IntersectionObserver | null>(null)

  const [isEnd, setIsEnd] = useState<boolean>(false)

  const [isSearchCliked, setIsSearchClicked] = useState<boolean>(false)

  const movieList = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFavoData(favoSort(favoData))
  }, [year, title])

  const isPoster = (prev: IMovie[]) => {
    const postData = prev.map((element) => {
      if (element.Poster === 'N/A') {
        const newEle = { ...element }
        newEle.Poster = bittersweetForNoImg
        return newEle
      }
      return element
    })
    return postData
  }

  useMount(() => {
    hanleFavoriteTabClick()
    const targetIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPages((prev) => prev + 1)
          if (io !== null) io.disconnect()
        }
      })
    })
    setIo(targetIO)
  })
  io?.observe(movieList.current as Element)

  const hanleFavoriteTabClick = () => {
    result = []
    store.forEach((k, d) => {
      result.push(JSON.parse(d))
    })
    setFavoData(favoSort(result))
  }

  const getAPIData = (page: number) => {
    setTimeout(() => {
      getMovieApi({
        s: searchValue,
        page,
      })
        .then((res) => {
          if (res.data.Search === undefined) {
            setIsEnd(true)
          } else {
            const newData = isPoster(res.data.Search)
            setData((prev) => [...prev].concat(newData))
            setIsEnd(false)
          }
        })
        .catch((err) => {
          if (err.response === 'false') return
          console.log(err)
        })
    }, 150)
  }

  const handleSearchClick = (event: FormEvent) => {
    event.preventDefault()
    setIsEnd(false)
    setPages(0)
    if (searchValue !== '') {
      if (isSearchCliked) {
        setData([])
      }
      setIsSearchClicked(true)
    }
  }

  const favoSort = (localData: IMovie[]) => {
    const sortedFavo = [...localData].sort((a: IMovie, b: IMovie): number => {
      if (year === '내림차순') {
        if (a.Year > b.Year) return -1
        if (a.Year < b.Year) return 1
      }
      if (year === '오름차순') {
        if (a.Year > b.Year) return 1
        if (a.Year < b.Year) return -1
      }
      if (title === '내림차순') {
        if (a.Title > b.Title) return -1
        if (a.Title < b.Title) return 1
      }
      if (title === '오름차순') {
        if (a.Title > b.Title) return 1
        if (a.Title < b.Title) return -1
      }
      return 0
    })
    console.log(sortedFavo)
    return sortedFavo
  }

  const handleScrollSearch = () => {
    if (searchValue !== '') {
      getAPIData(pages)
    }
  }

  useEffect(() => {
    if (isSearchCliked) {
      getAPIData(1)
    }
  }, [isSearchCliked])

  useEffect(() => {
    if (pages > 0 && !isEnd) {
      handleScrollSearch()
    }
  }, [pages])

  const handleInputChange = (value: string) => {
    setSearchValue(value)
  }
  // if (!data) return null

  return (
    <div className={styles.movieContainer}>
      <h1 className={styles.hello}>Hello user</h1>
      <header className={styles.searchBox}>
        <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
        <form action='/' onSubmit={handleSearchClick}>
          <input
            type='text'
            placeholder='Search'
            onChange={(event) => handleInputChange(event.currentTarget.value)}
            value={searchValue}
          />
          <button type='submit' className={styles.searchBtn}>
            검색
          </button>
        </form>
      </header>
      <main className={styles.main}>
        <h1>{params?.favorite !== 'favorite' ? 'Movies' : 'favorites'}</h1>
        {params?.favorite !== 'favorite' ? '' : <MovieDropDown />}
        <div className={styles.movieListBox}>
          <div className={styles.movieList}>
            {data.length !== 0 || favoData.length !== 0 ? <MovieList data={!params?.favorite ? data : favoData} /> : ''}
            <div
              className={cx(styles.lastOne, { [styles.none]: params?.favorite }, { [styles.isEnd]: isEnd })}
              ref={movieList}
            >
              {(isEnd || !isSearchCliked) && params?.favorite !== 'favorite' ? '검색 결과가 없습니다' : ''}
            </div>
          </div>
        </div>
        <MovieModal
          clickedData={!params?.favorite ? data[clickedIdx] : favoData[clickedIdx]}
          hanleFavoriteTabClick={hanleFavoriteTabClick}
        />
      </main>
      <footer>
        <MovieNav hanleFavoriteTabClick={hanleFavoriteTabClick} />
      </footer>
    </div>
  )
}

export default Movie
