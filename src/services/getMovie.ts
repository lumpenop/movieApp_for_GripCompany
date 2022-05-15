import { axios } from 'hooks/worker'
import { IMovie, IMovieAPIRes } from 'types/movie.d'
import bittersweetForNoImg from 'assets/movies/bittersweet.jpeg'

const MOVIE_URL = process.env.REACT_APP_MOVIE_URL
const API_KEY = process.env.REACT_APP_API_KEY

interface Params {
  s: string
  page: number
}

export const getMovieApi = (params: Params) =>
  axios.get<IMovieAPIRes>(`${MOVIE_URL}/?apikey=${API_KEY}`, {
    params,
  })

export const favoSort = (sortState: string, ifData: IMovie[]) => {
  const sortedFavo = [...ifData].sort((a: IMovie, b: IMovie): number => {
    if (sortState === '내림차순') {
      if (a.Year > b.Year) return -1
      if (a.Year < b.Year) return 1
    }
    if (sortState === '오름차순') {
      if (a.Year > b.Year) return 1
      if (a.Year < b.Year) return -1
    }
    return 0
  })
  return sortedFavo
}

export const isPoster = (prev: IMovie[]) => {
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
