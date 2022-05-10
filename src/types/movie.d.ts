export interface IMovie {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string
}

export interface IMovieAPIRes {
  Search: IMovie[],
  totalResults: number,
  Response: boolean
}
