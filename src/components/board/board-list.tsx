import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useBoards, useBoardStyle } from '../../query-hooks/board-hooks'
import { BoardDto } from '../../services/board-service'
import { QueryContainer } from '../../shared/components/query-container'

export const BoardListItem: FC<{ board: BoardDto }> = ({ board }) => {
  const style = useBoardStyle(board)
  return (
    <article className="rounded" style={style}>
      <div className="h-24">
        <Link
          className="block p-2 h-full hover:opacity-80 transition duration-500"
          to={`board/${board.id}`}
        >
          <h3 className={`text-lg`}>{board.name}</h3>
        </Link>
      </div>
    </article>
  )
}

export const BoardList: FC = () => {
  const boardsQuery = useBoards()
  return (
    <QueryContainer query={boardsQuery}>
      <div className="grid grid-cols-3 gap-4 my-2">
        {boardsQuery.data?.map(board => (
          <BoardListItem key={board.id} board={board} />
        ))}
      </div>
    </QueryContainer>
  )
}
