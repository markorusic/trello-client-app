import i18next from 'i18next'
import { FC } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { notyf } from '../../config/notify'
import { queryClient } from '../../config/query-client'
import {
  cardQueryKeys,
  useCardUpdateMutation
} from '../../query-hooks/card-hooks'
import {
  listQueryKeys,
  useLists,
  useListUpdateMutation
} from '../../query-hooks/list-hooks'
import { BoardDto } from '../../services/board-service'
import { CardDto } from '../../services/card-service'
import { ListDto } from '../../services/list-service'
import { BoardListForm } from './board-list-from'
import { BoardListItem } from './board-list-item'

function reorderList<T>(
  list: T[] | undefined = [],
  startIndex: number,
  endIndex: number
) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

function repositionItem<T extends { pos: number }>(list: T[], index: number) {
  const item = list[index]
  const itemBefore = list[index - 1]
  const itemAfter = list[index + 1]

  let pos = item.pos
  if (!itemBefore && !itemAfter) {
  } else if (!itemBefore) {
    pos = itemAfter.pos - 1
  } else if (!itemAfter) {
    pos = itemBefore.pos + 1
  } else {
    pos = (itemAfter.pos + itemBefore.pos) / 2
  }
  return { ...item, pos }
}

export interface BoardViewProps {
  board: BoardDto
}

export const BoardView: FC<BoardViewProps> = ({ board }) => {
  const listsQuery = useLists(board.id)
  const listUpdateMutation = useListUpdateMutation()
  const cardUpdateMutation = useCardUpdateMutation()

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const oldIndex = result.source.index
    const newIndex = result.destination.index

    // reorder lists
    if (result.type === 'list') {
      const listsQueryKey = [listQueryKeys.lists, board.id]
      const lists = queryClient.getQueryData<ListDto[]>(listsQueryKey)

      // client state optimistic update
      const reorderedLists = reorderList(lists, oldIndex, newIndex)
      queryClient.setQueryData(listsQueryKey, reorderedLists)

      // server state update
      const repositionedList = repositionItem(reorderedLists, newIndex)
      listUpdateMutation.mutate(repositionedList, {
        onError: () => {
          // rollback client state
          notyf.error(i18next.t('commons.error'))
          queryClient.setQueryData(listsQueryKey, lists)
        }
      })
      return
    }

    const sourceCardsQueryKey = [cardQueryKeys.cards, result.source.droppableId]
    const sourceCards =
      queryClient.getQueryData<CardDto[]>(sourceCardsQueryKey) || []
    // reorder cards in same list
    if (result.source.droppableId === result.destination.droppableId) {
      // client state optimistic update
      const reorderdCards = reorderList(sourceCards, oldIndex, newIndex)
      queryClient.setQueryData(sourceCardsQueryKey, reorderdCards)

      // server state update
      const repositionedCard = repositionItem(reorderdCards, newIndex)
      cardUpdateMutation.mutate(repositionedCard, {
        onError: () => {
          // rollback client state
          notyf.error(i18next.t('commons.error'))
          queryClient.setQueryData(sourceCardsQueryKey, sourceCards)
        }
      })
      return
    }

    // moving between lists

    // client state optimistic update
    const destinationCardsQueryKey = [
      cardQueryKeys.cards,
      result.destination.droppableId
    ]
    const destinationCards =
      queryClient.getQueryData<CardDto[]>(destinationCardsQueryKey) || []

    const card = sourceCards[oldIndex]

    const newSourceCards = Array.from(sourceCards)
    newSourceCards.splice(oldIndex, 1)

    const newDestCards = Array.from(destinationCards)
    newDestCards.splice(newIndex, 0, card)

    queryClient.setQueryData(sourceCardsQueryKey, newSourceCards)
    queryClient.setQueryData(destinationCardsQueryKey, newDestCards)

    // server state update
    const repositionedCard = repositionItem(newDestCards, newIndex)
    if (!repositionedCard) {
      return
    }
    cardUpdateMutation.mutate(
      { ...repositionedCard, idList: result.destination.droppableId },
      {
        onError: () => {
          // rollback client state
          notyf.error(i18next.t('commons.error'))
          queryClient.setQueryData(sourceCardsQueryKey, destinationCards)
        }
      }
    )
  }

  return (
    <div className="flex flex-grow p-2 overflow-y-auto text-black select-none">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="main-board" direction="horizontal" type="list">
          {provided => (
            <div
              className="flex max-h-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listsQuery.data?.map((list, index) => (
                <BoardListItem key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
              <div>
                <div className="bg-gray-200 p-2 rounded">
                  <BoardListForm boardId={board.id} />
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
