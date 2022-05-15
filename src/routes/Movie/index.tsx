import { FormEvent } from 'react'
import { useMount, useState, useEffect, useRef } from 'hooks'
import { useRecoil } from 'hooks/state'
import {
  movieClickedIdxState,
  favoriteData,
  movieDataState,
  movieSortTitle,
  movieSearchValue,
} from 'states/movieStates'
import { useParams } from 'react-router-dom'

import store from 'storejs'

import styles from './movie.module.scss'
import { cx } from 'styles'

import MovieList from './comp/MovieList'
import MovieNav from './comp/MovieNav'
import MovieModal from './comp/MovieModal'
import MovieDropDown from './comp/MovieDropDown'
import Header from './comp/Header'

import { getMovieApi, favoSort, isPoster } from 'services/getMovie'
import { IMovie } from 'types/movie'

let result: IMovie[]

const Movie = () => {
  const params = useParams()

  const [clickedIdx] = useRecoil(movieClickedIdxState)
  const [data, setData] = useRecoil(movieDataState)
  const [favoData, setFavoData] = useRecoil(favoriteData)
  const [title] = useRecoil(movieSortTitle)

  const [pages, setPages] = useState<number>(0)
  const [searchValue] = useRecoil(movieSearchValue)

  const [io, setIo] = useState<IntersectionObserver | null>(null)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [isSearchCliked, setIsSearchClicked] = useState<boolean>(false)

  const movieList = useRef<HTMLDivElement>(null)

  useMount(() => {
    handleFavoriteTabClick()
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

  const handleFavoriteTabClick = () => {
    result = []
    store.forEach((k, d) => {
      result.push(JSON.parse(d))
    })
    setFavoData(favoSort(title, result))
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

  return (
    <div className={styles.movieContainer}>
      <Header handleSearchClick={handleSearchClick} />
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
          handleFavoriteTabClick={handleFavoriteTabClick}
        />
      </main>
      <footer>
        <MovieNav handleFavoriteTabClick={handleFavoriteTabClick} />
      </footer>
    </div>
  )
}

export default Movie
