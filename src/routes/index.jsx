import styles from './Routes.module.scss'
// import TodoList from './TodoList'
import Movie from './Movie'

import {RecoilRoot} from 'recoil'

const App = () => {
  return (
    <div className={styles.app}>
      {/* <TodoList /> */}
      <RecoilRoot>
        <Movie />
      </RecoilRoot>
    </div>
  )
}

export default App
