import { Switch, Route, useLocation } from 'react-router-dom'
import { Location } from 'history'
import BoardPage from './pages/board-page'
import { BoardsPage } from './pages/boards-page'
import CardPage from './pages/card-page'

const App = () => {
  const location = useLocation<{ background: Location }>()
  const background = location.state?.background
  return (
    <>
      <Switch location={background ?? location}>
        <Route exact path="/">
          <BoardsPage />
        </Route>
        <Route path="/board/:boardId">
          <BoardPage />
        </Route>
        <Route path="*">
          <div>Not found</div>
        </Route>
      </Switch>

      <Route path="/board/:boardId/cards/:cardId">
        <CardPage />
      </Route>
    </>
  )
}

export default App
