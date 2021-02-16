import { FC } from 'react'
import { FormikConfig } from 'formik'
import { Optional } from 'utility-types'
import { ListMutationDto } from '../../services/list-service'
import { Form, TextInput } from '../../shared/components/form'
import { useListCreateMutation } from '../../query-hooks/list-hooks'
import { createFormMutationOptions } from '../../shared/query-utils'

export type BoardListFormProps = Optional<
  FormikConfig<ListMutationDto>,
  'initialValues' | 'onSubmit'
> & {
  boardId: string
}

export const BoardListForm: FC<BoardListFormProps> = ({
  boardId,
  ...props
}) => {
  const listCreateMutation = useListCreateMutation()
  return (
    <Form<ListMutationDto>
      initialValues={{
        name: '',
        idBoard: boardId,
        pos: 'bottom'
      }}
      validate={values => {
        if (!values.name) {
          return { name: '' }
        }
      }}
      onSubmit={(values, actions) =>
        listCreateMutation.mutate(values, {
          ...createFormMutationOptions(actions, 'lists.createError')
        })
      }
      {...props}
    >
      <TextInput
        name="name"
        placeholder="lists.createNew"
        containerClassName="mb-0"
      />
    </Form>
  )
}
