import { cloneElement, FC, HTMLProps, ReactElement, useRef } from 'react'
import { uniqueId } from 'lodash'
import {
  useFormikContext,
  useField,
  FormikConfig,
  Formik,
  Form as FormikFrom
} from 'formik'
import { Button, ButtonProps } from './button'

export function Form<T>({ children, ...props }: FormikConfig<T>) {
  return (
    <Formik {...props}>
      <FormikFrom>{children}</FormikFrom>
    </Formik>
  )
}

export interface BaseInputProps {
  name: string
  label?: string
}

export const FormInputContainer: FC<BaseInputProps> = ({
  name,
  label,
  children
}) => {
  const [, meta] = useField(name)
  const { current: id } = useRef(`${uniqueId('form_input')}_${name}`)
  return (
    <div className="mb-3">
      <div>
        <label className="font-bold" htmlFor={id}>
          {label}
        </label>
      </div>
      <div>{cloneElement(children as ReactElement, { id })}</div>
      {meta.touched && meta.error ? (
        <div>
          <span className="text-red-600">{meta.error}</span>
        </div>
      ) : null}
    </div>
  )
}

export const SubmitButton: FC<ButtonProps> = props => {
  const form = useFormikContext()
  return <Button {...props} loading={form.isSubmitting} />
}

export type TextInputProps = BaseInputProps & HTMLProps<HTMLInputElement>
export const TextInput: FC<TextInputProps> = props => {
  const [field] = useField(props.name)
  return (
    <FormInputContainer {...props}>
      <input
        className="rounded-md border-2 border-gray-300 p-1 w-full"
        type="text"
        {...field}
        {...props}
      />
    </FormInputContainer>
  )
}

export type TextAreaProps = BaseInputProps & HTMLProps<HTMLTextAreaElement>
export const TextArea: FC<TextAreaProps> = props => {
  const [field] = useField(props.name)
  return (
    <FormInputContainer {...props}>
      <textarea
        className="rounded-md border-2 border-gray-300 p-1 w-full"
        {...field}
        {...props}
      />
    </FormInputContainer>
  )
}
