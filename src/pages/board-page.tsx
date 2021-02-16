import { useParams } from 'react-router-dom'
import { useBoard, useBoardStyle } from '../query-hooks/board-hooks'
import { BoardView } from '../components/board-view/board-view'
import { TopBar } from '../components/top-bar'

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>()
  const boardQuery = useBoard(boardId)
  const style = useBoardStyle(boardQuery.data, 'lg')
  return (
    <div style={style} className="h-screen flex flex-col">
      <div className="mb-2">
        {/* <h3 className="text-2xl">{boardQuery.data?.name}</h3> */}
        <TopBar title={boardQuery.data?.name} />
      </div>
      {boardQuery.isSuccess ? <BoardView board={boardQuery.data} /> : null}
    </div>
  )
}

export default BoardPage
