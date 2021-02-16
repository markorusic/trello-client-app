import { useState } from 'react'
import { invert } from 'lodash'
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
import { SettingsIcon } from '../shared/components/icons'
import { BoradSettings } from '../components/board/board-settings'
import { boardColors } from '../components/board/background-picker-input'

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>()
  const boardQuery = useBoard(boardId)
  const boardUpdateMutation = useBoardUpdateMutation()
  const style = useBoardStyle(boardQuery.data, 'lg')

  const [showSettings, setShowSettings] = useState(false)

  const updateBoard = (board: BoardDto, name: string) => {
    const newBoard = { ...board, name }
    queryClient.setQueryData([boardQueryKeys.board, board.id], newBoard)
    boardUpdateMutation.mutate({
      ...newBoard,
      prefs_background: invert(boardColors)[newBoard.prefs.backgroundColor]
    })
  }

  return (
    <div style={style} className="h-screen flex flex-col">
      <TopBar />
      <div className="mb-2 py-1 px-2 border-b border-white flex items-center justify-between">
        {boardQuery.isSuccess && (
          <>
            <EditableText
              className="text-xl font-semibold bg-transparent"
              text={boardQuery.data.name}
              onChange={name => updateBoard(boardQuery.data, name)}
            />
            <div
              className="cursor-pointer hover:opacity-80"
              onClick={() => setShowSettings(v => !v)}
            >
              <SettingsIcon size={6} />
            </div>
          </>
        )}
      </div>

      {boardQuery.isSuccess ? (
        <div className="relative">
          <BoradSettings
            board={boardQuery.data}
            style={{
              width: 325,
              right: showSettings ? 0 : -330
            }}
          />
          <BoardView board={boardQuery.data} />
        </div>
      ) : null}
    </div>
  )
}

export default BoardPage
