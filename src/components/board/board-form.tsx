import { FC } from 'react'
import { FormikConfig } from 'formik'
import { Optional } from 'utility-types'
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
    prefs: { backgroundColor: '', backgroundBrightness: 'dark' }
  },
  ...props
}) => {
  return (
    <Form {...props} initialValues={initialValues}>
      <TextInput name="name" label="Name" placeholder="Enter name" autoFocus />
      <TextArea
        name="desc"
        label="Description"
        placeholder="Enter description"
      />
      <BackgroundPickerInput name="prefs" label="Board background" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
