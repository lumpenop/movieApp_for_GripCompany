import styles from './Routes.module.scss'
// import TodoList from './TodoList'
import Movie from './Movie'

const App = () => {
  return (
    <div className={styles.app}>
      {/* <TodoList /> */}
      <Movie />
    </div>
  )
}

export default App
