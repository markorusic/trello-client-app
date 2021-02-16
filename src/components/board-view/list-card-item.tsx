import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Link, useLocation, useParams } from 'react-router-dom'
import { CardDto } from '../../services/card-service'

export interface ListCardItemProps {
  card: CardDto
  index: number
}

export const ListCardItem: FC<ListCardItemProps> = ({ card, index }) => {
  const location = useLocation()
  const { boardId } = useParams<{ boardId: string }>()
  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <div
          className="bg-white mb-2 p-1 rounded break-words"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Link
            className="block"
            to={{
              pathname: `/board/${boardId}/cards/${card.id}`,
              state: { background: location, initialData: card }
            }}
          >
            {card.name}
          </Link>
        </div>
      )}
    </Draggable>
  )
}
