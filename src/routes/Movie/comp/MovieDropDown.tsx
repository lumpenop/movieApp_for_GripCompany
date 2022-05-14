import { SetStateAction, useEffect, useState } from 'react'
import { useMount } from 'react-use'

import styles from '../movie.module.scss'

import { useRecoil } from 'hooks/state'
import { favoriteData } from 'states/movieStates'
import { IMovie } from 'types/movie'

const MovieDropDown = () => {
  const [favoData, setFavoData] = useRecoil(favoriteData)
  const [year, setYear] = useState<string>('내림차순')
  const [title, setTitle] = useState<string>('오름차순')

  useMount(() => {
    favoSort()
  })

  useEffect(() => {
    favoSort()
  }, [year, title])

  const handleYearSelect = (event: { currentTarget: { value: SetStateAction<string> } }) => {
    setYear(event.currentTarget.value)
  }

  const handleTitleSelect = (event: { currentTarget: { value: SetStateAction<string> } }) => {
    setTitle(event.currentTarget.value)
  }

  const favoSort = () => {
    const sortedFavo = [...favoData].sort((a: IMovie, b: IMovie): number => {
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

    setFavoData(sortedFavo)
  }

  return (
    <div className={styles.dropContainer}>
      연도별
      <select name='연도별' defaultValue='내림차순' onChange={handleYearSelect}>
        <option value='내림차순'>내림차순</option>
        <option value='오름차순'>오름차순</option>
      </select>
      제목별
      <select name='제목별' defaultValue='오름차순' onChange={handleTitleSelect}>
        <option value='내림차순'>내림차순</option>
        <option value='오름차순'>오름차순</option>
      </select>
    </div>
  )
}

export default MovieDropDown
