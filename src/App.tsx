import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BoardPage from './pages/board-page'
import { BoardsPage } from './pages/boards-page'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <BoardsPage />
        </Route>
        <Route path="/board/:id">
          <BoardPage />
        </Route>
        <Route path="*">
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
