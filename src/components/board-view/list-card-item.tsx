import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { CardDto } from '../../services/card-service'

export interface ListCardItemProps {
  card: CardDto
  index: number
}

export const ListCardItem: FC<ListCardItemProps> = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <div
          className="bg-white mb-2 p-1 rounded break-words"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          {card.name}
        </div>
      )}
    </Draggable>
  )
}
