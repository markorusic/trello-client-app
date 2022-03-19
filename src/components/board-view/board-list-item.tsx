import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useCards } from '../../query-hooks/card-hooks'
import { useListDeleteMutation } from '../../query-hooks/list-hooks'
import { ListDto } from '../../services/list-service'
import { ArchiveIcon } from '../../shared/components/icons'
import { Popconfirm } from '../../shared/components/popconfirm'
import { ListCardForm } from './list-card-form'
import { ListCardItem } from './list-card-item'
import { ListTitle } from './list-title'

interface BoardListItemProps {
  list: ListDto
  index: number
}

export const BoardListItem: FC<BoardListItemProps> = ({ list, index }) => {
  const cardsQuery = useCards(list.id)
  const listDeleteMutation = useListDeleteMutation()
  return (
    <Draggable draggableId={list.id} index={index}>
      {draggableProvided => (
        <div
          className="w-72 mr-2"
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
        >
          <div className="bg-gray-200 p-2 rounded flex flex-col max-h-full text-sm">
            <div
              className="flex justify-between items-center"
              {...draggableProvided.dragHandleProps}
            >
              <div className="flex-1 pr-2">
                <ListTitle list={list} />
              </div>
              <Popconfirm
                title="lists.archiveConfirm"
                description="lists.archivePrompt"
                okText="lists.archiveConfirm"
                onConfirm={() => listDeleteMutation.mutate(list)}
              >
                <div className="text-xl cursor-pointer hover:opacity-80">
                  <ArchiveIcon color="black" />
                </div>
              </Popconfirm>
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
