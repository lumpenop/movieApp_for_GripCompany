
   
import { atom } from 'hooks/state'
import { IMovie } from 'types/movie'


export const movieDataState = atom<IMovie[]>({
  key: '#movieDataState',
  default: [],
})

export const movieClickState = atom<boolean>({
  key: '#movieClickState',
  default: false
})

export const movieClickedIdxState = atom<number>({
  key: '#movieClickedIdxState',
  default: 0
})

export const movieTabNum = atom<number>({
  key: '#movieTabNum',
  default: 0
})

export const favoriteData = atom<IMovie[]>({
  key: '#favoriteData',
  default: []
})

export const moviePages = atom<number>({
  key: '#moviePages',
  default: 0
})