import { useQuery } from 'react-query'
import { boardService } from '../services/board-service'

const useBoards = () => useQuery('boards', boardService.fetchAll)

export const BoardList = () => {
  const boardsQuery = useBoards()
  return <pre>{JSON.stringify(boardsQuery, null, 2)}</pre>
}
