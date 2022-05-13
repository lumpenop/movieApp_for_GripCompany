import styles from './Routes.module.scss'
// import TodoList from './TodoList'
import Movie from './Movie'
import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <div className={styles.app}>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Movie />}>
            <Route path=':favorite' element={<Movie />} />
          </Route>
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </RecoilRoot>
    </div>
  )
}

export default App
