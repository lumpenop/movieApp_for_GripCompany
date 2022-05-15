import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../movie.module.scss'
import { FormEventHandler } from 'react'
import { useRecoil } from 'hooks/state'
import { movieSearchValue } from 'states/movieStates'

interface Props {
  handleSearchClick: FormEventHandler
}

const Header = ({ handleSearchClick }: Props) => {
  const [searchValue, setSearchValue] = useRecoil(movieSearchValue)

  const handleInputChange = (value: string) => {
    setSearchValue(value)
  }

  return (
    <header>
      <h1 className={styles.hello}>Hello user</h1>
      <div className={styles.searchBox}>
        <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
        <form action='/' onSubmit={handleSearchClick}>
          <input
            type='text'
            placeholder='Search'
            onChange={(event) => handleInputChange(event.currentTarget.value)}
            value={searchValue}
          />
          <button type='submit' className={styles.searchBtn}>
            검색
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header
