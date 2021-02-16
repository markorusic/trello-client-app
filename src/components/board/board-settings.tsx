import { invert } from 'lodash'
import { CSSProperties, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { queryClient } from '../../config/query-client'
import {
  boardQueryKeys,
  useBoardUpdateMutation
} from '../../query-hooks/board-hooks'
import { BoardDto } from '../../services/board-service'
import { createFormMutationOptions } from '../../shared/query-utils'
import { boardColors } from './background-picker-input'
import { BoardForm } from './board-form'

export interface BoradSettingsProps {
  board: BoardDto
  style?: CSSProperties
}

export const BoradSettings: FC<BoradSettingsProps> = ({
  board,
  style = {}
}) => {
  const { t } = useTranslation()
  const boardUpdateMutation = useBoardUpdateMutation()
  return (
    <div
      className="bg-white p-4 rounded absolute right-0 top-0 bottom-0 text-black border border-gray-600 transition-all ease-in-out duration-300 z-10"
      style={style}
    >
      <div className="text-center mb-2 pb-2 border-b border-gray-600">
        <h3 className="font-semibold">{t('commons.menu')}</h3>
      </div>
      <div>
        <BoardForm
          enableReinitialize
          initialValues={{
            id: board.id,
            desc: board.desc,
            name: board.name,
            prefs_background: invert(boardColors)[board.prefs.backgroundColor]
          }}
          onSubmit={(values, actions) => {
            boardUpdateMutation.mutate(values, {
              ...createFormMutationOptions(actions),
              onSuccess: updatedBoard => {
                queryClient.setQueryData(
                  [boardQueryKeys.board, board.id],
                  updatedBoard
                )
              }
            })
          }}
        />
      </div>
    </div>
  )
}
