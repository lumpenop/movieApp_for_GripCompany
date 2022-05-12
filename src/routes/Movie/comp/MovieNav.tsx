import {  MouseEvent } from 'react'

import styles from '../movie.module.scss'
import { cx } from 'styles'

import { useRecoil } from 'hooks/state'
import { movieClickState } from 'states/movieStates'

import {NavLink, useParams} from 'react-router-dom'

interface Props {
  hanleFavoriteTabClick: Function
}

const MovieNav = ({ hanleFavoriteTabClick }: Props) => {

  const params = useParams()

  const [, setIsClicked] = useRecoil(movieClickState)

  const handleTabClick = (): void => {
    setIsClicked(false)
    hanleFavoriteTabClick()
    
  }

  return (
    <nav className={styles.movieNav}>
      <div className={styles.buttonBox}>
        <NavLink
          to=''
          className={cx(styles.navButton, {[styles.on]: !params?.favorite})} 
          type='button'
          onClick={handleTabClick}
        >Home
        </NavLink>
        <NavLink 
          to='favorite'
          className={cx(styles.navButton, {[styles.on]: params?.favorite})} 
          type='button'
          onClick={handleTabClick}
        >Favorite
        </NavLink>
      </div>
    </nav>
  )
}

export default MovieNav