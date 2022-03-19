import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CommentDto } from '../../services/comment-service'
import {
  EditableText,
  useEditableText
} from '../../shared/components/editable-text'
import {
  useCommentDeleteMutation,
  useCommentUpdateMutation
} from '../../query-hooks/comment-hooks'
import { UserIcon } from '../../shared/components/icons'
import { Popconfirm } from '../../shared/components/popconfirm'
import { deleteMutationOptions } from '../../shared/query-utils'
import { useUser } from '../../query-hooks/user-hooks'

dayjs.extend(relativeTime)

export interface CommentListItemProps {
  comment: CommentDto
}

export const CommentListItem: FC<CommentListItemProps> = ({ comment }) => {
  const { t } = useTranslation()
  const userQuery = useUser()
  const commentUpdateMutation = useCommentUpdateMutation()
  const commentDeleteMutation = useCommentDeleteMutation()
  const editableComment = useEditableText()

  const enableActions = comment.memberCreator.id === userQuery.data?.id

  return (
    <div className="p-1 mb-3 flex flex-col">
      <div className="my-2 flex items-center">
        <div className="bg-gray-400 w-8 h-8 rounded-full mr-2 flex justify-center items-center">
          {comment.memberCreator.avatarUrl ? (
            <img
              className="w-full h-full rounded-full"
              src={comment.memberCreator.avatarUrl}
              alt={comment.memberCreator.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="flex items-baseline">
          <h3 className="font-bold mr-2">
            {comment.memberCreator?.username ?? '...'}
          </h3>
          <span className="text-gray-500 text-xs">
            {dayjs(comment.date).fromNow()}
          </span>
        </div>
      </div>
      <EditableText
        disabled={!enableActions}
        as="textarea"
        className="px-2 bg-white rounded"
        controlledState={editableComment}
        text={comment.data.text}
        onChange={text =>
          commentUpdateMutation.mutate({
            text,
            cardId: comment.data.card.id,
            ...comment
          })
        }
      />
      {enableActions && (
        <div className="flex my-2 items-baseline">
          <span
            className="cursor-pointer border-b border-gray-700 text-gray-700 text-xs"
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              editableComment.setShowForm(v => !v)
            }}
          >
            {editableComment.showForm ? t('commons.cancel') : t('commons.edit')}
          </span>
          <div className="mx-1">{'-'}</div>
          <span className="cursor-pointer border-b border-gray-700 text-gray-700 text-xs">
            <Popconfirm
              title="comments.deleteCommentConfirm"
              description="comments.deleteCommentPrompt"
              okText="comments.deleteCommentConfirm"
              onConfirm={() =>
                commentDeleteMutation.mutate(comment, {
                  ...deleteMutationOptions()
                })
              }
            >
              {t('commons.delete')}
            </Popconfirm>
          </span>
        </div>
      )}
    </div>
  )
}
