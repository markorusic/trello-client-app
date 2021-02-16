import { uniqueId } from 'lodash'
import { FC } from 'react'
import { useCommentCreateMutation } from '../../query-hooks/comment-hooks'
import { CommentMutationDto } from '../../services/comment-service'
import { Form, TextArea } from '../../shared/components/form'
import { createFormMutationOptions } from '../../shared/query-utils'

export interface CommentCreateFromProps {
  cardId: string
}

export const CommentCreateFrom: FC<CommentCreateFromProps> = ({ cardId }) => {
  const commentCreateMutation = useCommentCreateMutation()
  return (
    <div>
      <Form<CommentMutationDto>
        initialValues={{
          text: '',
          cardId,
          memberCreator: {
            id: uniqueId('user'),
            avatarUrl: null,
            username: '...'
          }
        }}
        validate={values => {
          if (!values.text) {
            return { text: '' }
          }
        }}
        onSubmit={(values, actions) =>
          commentCreateMutation.mutate(values, {
            ...createFormMutationOptions(actions, 'comments.createError')
          })
        }
      >
        <TextArea
          submitOnEnter
          name="text"
          className="p-2 w-full rounded"
          placeholder="comments.enterComment"
        />
      </Form>
    </div>
  )
}
