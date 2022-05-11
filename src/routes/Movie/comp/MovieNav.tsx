import {  MouseEvent } from 'react'

import styles from '../movie.module.scss'
import { cx } from 'styles'

import { useRecoil } from 'hooks/state'
import { movieTabNum } from 'states/movieStates'

interface Props {
  hanleFavoriteTabClick: Function
}

const MovieNav = ({ hanleFavoriteTabClick }: Props) => {

  const [tabNum, setTabNum] = useRecoil(movieTabNum)

  const handleTabClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setTabNum(Number(event.currentTarget.value))
    if(Number(event.currentTarget.value)===tabNum) return
 
    hanleFavoriteTabClick()
    
  }

  return (
    <nav className={styles.movieNav}>
      <div className={styles.buttonBox}>
        <button 
          className={cx(styles.navButton, {[styles.on]: tabNum===0})} 
          type='button'
          onClick={handleTabClick}
          value={0}
        >Home
        </button>
        <button 
          className={cx(styles.navButton, {[styles.on]: tabNum===1})} 
          type='button'
          onClick={handleTabClick}
          value={1}
        >Favorite
        </button>
      </div>
    </nav>
  )
}

export default MovieNav