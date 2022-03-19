import { Switch, Route, useLocation } from 'react-router-dom'
import { Location } from 'history'
import BoardPage from './pages/board-page'
import { BoardsPage } from './pages/boards-page'
import CardPage from './pages/card-page'
import { LoginPage } from './pages/login'
import { useAuth } from './components/auth-provider'

const App = () => {
  const auth = useAuth()
  const location = useLocation<{ background: Location }>()
  const background = location.state?.background

  if (!auth.isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="bg-gray-100 min-h-screen">
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
    </div>
  )
}

export default App
