import { atom } from 'hooks/state'
import { IMovie } from 'types/movie'

export const movieDataState = atom<IMovie[]>({
  key: '#movieDataState',
  default: [],
})

export const movieClickState = atom<boolean>({
  key: '#movieClickState',
  default: false,
})

export const movieClickedIdxState = atom<number>({
  key: '#movieClickedIdxState',
  default: 0,
})

export const movieTabNum = atom<number>({
  key: '#movieTabNum',
  default: 0,
})

export const favoriteData = atom<IMovie[]>({
  key: '#favoriteData',
  default: [],
})

export const moviePages = atom<number>({
  key: '#moviePages',
  default: 0,
})

export const movieSortYear = atom<string>({
  key: '#movieSortYear',
  default: '내림차순',
})

export const movieSortTitle = atom<string>({
  key: '#movieSortTitle',
  default: '오름차순',
})

export const movieSearchValue = atom<string>({
  key: '#movieSearcValue',
  default: '',
})
