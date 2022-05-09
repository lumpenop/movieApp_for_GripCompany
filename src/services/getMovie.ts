import { axios } from 'hooks/worker'
import { IMovieAPIRes } from 'types/movie.d'

const MOVIE_URL = 'http://www.omdbapi.com'
const API_KEY = '92e32667'

interface Params {
  s: string
  page: number
}

// 37.494958, 126.844128
export const getMovieApi = (params: Params) =>
  axios.get<IMovieAPIRes>(`${MOVIE_URL}/?apikey=${API_KEY}`, {
    params,
  })