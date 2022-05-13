import { axios } from 'hooks/worker'
import { IMovieAPIRes } from 'types/movie.d'

const MOVIE_URL = process.env.REACT_APP_MOVIE_URL
const API_KEY = process.env.REACT_APP_API_KEY

interface Params {
  s: string
  page: number
}

// 37.494958, 126.844128
export const getMovieApi = (params: Params) =>
  axios.get<IMovieAPIRes>(`${MOVIE_URL}/?apikey=${API_KEY}`, {
    params,
  })
