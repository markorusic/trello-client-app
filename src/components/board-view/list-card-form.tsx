import { FC } from 'react'
import { FormikConfig } from 'formik'
import { Optional } from 'utility-types'
import { Form, TextArea } from '../../shared/components/form'
import { CardMutationDto } from '../../services/card-service'
import { useCardCreateMutation } from '../../query-hooks/card-hooks'
import { createFormMutationOptions } from '../../shared/query-utils'

export type ListCardFormProps = Optional<
  FormikConfig<CardMutationDto>,
  'initialValues' | 'onSubmit'
> & {
  listId: string
}

export const ListCardForm: FC<ListCardFormProps> = ({ listId, ...props }) => {
  const cardCreateMutation = useCardCreateMutation()
  return (
    <Form<CardMutationDto>
      initialValues={{
        name: '',
        idList: listId,
        pos: 'bottom',
        desc: ''
      }}
      validate={values => {
        if (!values.name) {
          return { name: '' }
        }
      }}
      onSubmit={(values, actions) =>
        cardCreateMutation.mutate(values, {
          ...createFormMutationOptions(actions, 'cards.createError')
        })
      }
      {...props}
    >
      {form => (
        <TextArea
          name="name"
          placeholder="cards.createNew"
          containerClassName="mb-0"
          onKeyDown={event => {
            if (event.code === 'Enter' && !form.isSubmitting) {
              event.preventDefault()
              form.handleSubmit()
              setTimeout(() => form.resetForm())
            }
          }}
        />
      )}
    </Form>
  )
}
