import { useState } from 'react'

import styles from '../movie.module.scss'
import { cx } from 'styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const dropMenu = ['연도별 오름차순', '연도별 내림차순', '이름 오름차순', '이름 내림차순']

const MovieDropDown = () => {
  const [selectedValue, setSelectedValue] = useState<string>('연도별 내림차순, 이름 내림차순')
  const [isMenuOpen, setIsMunuOpen] = useState<boolean>(false)

  const handleClickMenu = (value: string) => {
    const prevValue = selectedValue.split(', ').filter((element) => {
      return !element.includes(value.split(' ')[0])
    })
    setSelectedValue(() => `${prevValue}, ${value}`)
  }

  const handleClickMenuOpen = () => {
    setIsMunuOpen((prev) => !prev)
  }

  return (
    <div className={styles.dropContainer}>
      <button type='button' onClick={handleClickMenuOpen}>
        <input type='text' value={selectedValue} readOnly />
        <FontAwesomeIcon className={styles.dropIcon} icon={faCaretDown} />
      </button>
      <ul className={cx(styles.dropMenuList, { [styles.menuOn]: isMenuOpen })}>
        {dropMenu.map((element, index) => {
          return (
            <li className={styles.dropMenu} key={`${element}${index}`}>
              <div>
                <input type='button' value={element} onClick={(e) => handleClickMenu(e.currentTarget.value)} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MovieDropDown
