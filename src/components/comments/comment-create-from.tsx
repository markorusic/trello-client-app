import { FC } from 'react'
import { useCommentCreateMutation } from '../../query-hooks/comment-hooks'
import { useUser } from '../../query-hooks/user-hooks'
import { CommentMutationDto } from '../../services/comment-service'
import { Form, TextInput } from '../../shared/components/form'
import { createFormMutationOptions } from '../../shared/query-utils'

export interface CommentCreateFromProps {
  cardId: string
}

export const CommentCreateFrom: FC<CommentCreateFromProps> = ({ cardId }) => {
  const commentCreateMutation = useCommentCreateMutation()
  const userQuery = useUser()
  return (
    <div>
      {userQuery.isSuccess && (
        <Form<CommentMutationDto>
          initialValues={{
            text: '',
            cardId,
            memberCreator: {
              id: userQuery.data.id,
              avatarUrl: userQuery.data.avatarUrl,
              username: userQuery.data.username
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
          <TextInput name="text" placeholder="comments.enterComment" />
        </Form>
      )}
    </div>
  )
}
