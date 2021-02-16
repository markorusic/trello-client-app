import { FC } from 'react'
import { useComments } from '../../query-hooks/comment-hooks'
import { CardDto } from '../../services/card-service'
import { CommentListItem } from './comment-list-item'

export interface CommentListProps {
  card: CardDto
}

export const CommentList: FC<CommentListProps> = ({ card }) => {
  const commentsQuery = useComments(card.id)
  return (
    <div className="flex flex-col">
      {commentsQuery.isSuccess
        ? commentsQuery.data.map(comment => (
            <CommentListItem key={comment.id} comment={comment} />
          ))
        : null}
    </div>
  )
}
