import { useParams } from 'react-router-dom'
import {
  boardQueryKeys,
  useBoard,
  useBoardStyle,
  useBoardUpdateMutation
} from '../query-hooks/board-hooks'
import { BoardView } from '../components/board-view/board-view'
import { TopBar } from '../components/top-bar'
import { EditableText } from '../shared/components/editable-text'
import { BoardDto } from '../services/board-service'
import { queryClient } from '../config/query-client'

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>()
  const boardQuery = useBoard(boardId)
  const boardUpdateMutation = useBoardUpdateMutation()
  const style = useBoardStyle(boardQuery.data, 'lg')

  const updateBoard = (board: BoardDto, name: string) => {
    const newBoard = { ...board, name }
    queryClient.setQueryData([boardQueryKeys.board, board.id], newBoard)
    boardUpdateMutation.mutate({
      ...newBoard,
      prefs_background: newBoard.prefs.backgroundColor
    })
  }

  return (
    <div style={style} className="h-screen flex flex-col">
      <TopBar />
      <div className="mb-2 py-1 px-2 border-b border-white flex items-center">
        {boardQuery.isSuccess && (
          <EditableText
            className="text-xl font-semibold bg-transparent"
            text={boardQuery.data.name}
            onChange={name => updateBoard(boardQuery.data, name)}
          />
        )}
      </div>
      {boardQuery.isSuccess ? <BoardView board={boardQuery.data} /> : null}
    </div>
  )
}

export default BoardPage
