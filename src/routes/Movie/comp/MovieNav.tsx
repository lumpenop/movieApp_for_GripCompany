import styles from '../movie.module.scss'
import { cx } from 'styles'

import { useRecoil } from 'hooks/state'
import { movieClickState } from 'states/movieStates'

import { NavLink, useParams } from 'react-router-dom'

interface Props {
  handleFavoriteTabClick: Function
}

const MovieNav = ({ handleFavoriteTabClick }: Props) => {
  const params = useParams()
  const [, setIsClicked] = useRecoil(movieClickState)

  const handleTabClick = (): void => {
    setIsClicked(false)
    handleFavoriteTabClick()
  }

  return (
    <nav className={styles.movieNav}>
      <div className={styles.buttonBox}>
        <NavLink
          to=''
          className={cx(styles.navButton, { [styles.on]: !params?.favorite })}
          type='button'
          onClick={handleTabClick}
        >
          Home
        </NavLink>
        <NavLink
          to='favorite'
          className={cx(styles.navButton, { [styles.on]: params?.favorite })}
          type='button'
          onClick={handleTabClick}
        >
          Favorite
        </NavLink>
      </div>
    </nav>
  )
}

export default MovieNav
