import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useCards } from '../../query-hooks/card-hooks'
import { ListDto } from '../../services/list-service'
import { ListCardForm } from './list-card-form'
import { ListCardItem } from './list-card-item'
import { ListTitle } from './list-title'

// const multiply = <T,>(items: T[] | undefined = [], times: number) =>
//   flatMap(range(0, times), i =>
//     items.map(item => ({
//       ...item,
//       ...(i === 0 ? {} : { id: uniqueId() })
//     }))
//   )

interface BoardListItemProps {
  list: ListDto
  index: number
}

export const BoardListItem: FC<BoardListItemProps> = ({ list, index }) => {
  const cardsQuery = useCards(list.id)
  return (
    <Draggable draggableId={list.id} index={index}>
      {draggableProvided => (
        <div
          className="w-72 mr-2"
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
        >
          <div className="bg-gray-200 p-2 rounded flex flex-col max-h-full text-sm">
            <div {...draggableProvided.dragHandleProps}>
              <ListTitle list={list} />
            </div>
            <Droppable droppableId={list.id}>
              {droppableProvided => (
                <div
                  className="my-1 overflow-y-auto"
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {cardsQuery.data?.map((card, index) => (
                    <ListCardItem key={card.id} card={card} index={index} />
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="pb-2">
              <ListCardForm listId={list.id} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
