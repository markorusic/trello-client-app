import { FC } from 'react'
import { FormikConfig } from 'formik'
import { Optional } from 'utility-types'
import { reduce, set } from 'lodash'
import { BoardMutationDto } from '../../services/board-service'
import {
  Form,
  TextInput,
  TextArea,
  SubmitButton
} from '../../shared/components/form'
import { BackgroundPickerInput } from './background-picker-input'

export type BoardFormProps = Optional<
  FormikConfig<BoardMutationDto>,
  'initialValues'
>
export const BoardForm: FC<BoardFormProps> = ({
  initialValues = {
    name: '',
    desc: '',
    prefs_background: ''
  },
  ...props
}) => {
  return (
    <Form
      {...props}
      initialValues={initialValues}
      validate={values =>
        reduce(
          values,
          (result, value, key) => {
            if (!value) {
              set(result, key, 'validation.required')
            }
            return result
          },
          {}
        )
      }
    >
      <TextInput
        name="name"
        label="commons.name"
        placeholder="boards.enterName"
        autoFocus
      />
      <TextArea
        name="desc"
        label="commons.description"
        placeholder="boards.enterDescription"
      />
      <BackgroundPickerInput
        name="prefs_background"
        label="boards.boardBackground"
      />
      <SubmitButton />
    </Form>
  )
}
