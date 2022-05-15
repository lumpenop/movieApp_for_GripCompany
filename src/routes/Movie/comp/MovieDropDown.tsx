import { SetStateAction, useEffect, useState } from 'react'

import styles from '../Movie.module.scss'

import { useRecoil } from 'hooks/state'
import { favoSort } from 'services/getMovie'
import { favoriteData, movieSortYear, movieSortTitle } from 'states/movieStates'

const MovieDropDown = () => {
  const [favoData, setFavoData] = useRecoil(favoriteData)
  const [year, setYear] = useRecoil(movieSortYear)
  const [title, setTitle] = useRecoil(movieSortTitle)

  const [didMount, setDidMount] = useState<boolean>(false)

  useEffect(() => {
    if (didMount) {
      setFavoData(favoSort(year, favoData))
    }
    setDidMount(true)
  }, [year])

  useEffect(() => {
    if (didMount) {
      setFavoData(favoSort(title, favoData))
    }
    setDidMount(true)
  }, [title])

  const handleYearSelect = (event: { currentTarget: { value: SetStateAction<string> } }) => {
    setYear(event.currentTarget.value)
  }

  const handleTitleSelect = (event: { currentTarget: { value: SetStateAction<string> } }) => {
    setTitle(event.currentTarget.value)
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
