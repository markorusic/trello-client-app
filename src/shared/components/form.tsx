import { cloneElement, FC, HTMLProps, ReactElement, useRef } from 'react'
import { uniqueId } from 'lodash'
import { useTranslation } from 'react-i18next'
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
      {formikProps => (
        <FormikFrom
          onSubmit={event => {
            event.preventDefault()
            event.stopPropagation()
            if (!formikProps.isSubmitting) {
              formikProps.handleSubmit(event)
            }
          }}
        >
          {typeof children === 'function' ? children(formikProps) : children}
        </FormikFrom>
      )}
    </Formik>
  )
}

export interface BaseInputProps {
  name: string
  label?: string
  containerClassName?: string
}

export const FormInputContainer: FC<BaseInputProps> = ({
  name,
  label = '',
  containerClassName = 'mb-2',
  children
}) => {
  const { t } = useTranslation()
  const [, meta] = useField(name)
  const { current: id } = useRef(`${uniqueId('form_input')}_${name}`)
  return (
    <div className={containerClassName}>
      <div>
        <label className="font-semibold" htmlFor={id}>
          {t(label)}
        </label>
      </div>
      <div>{cloneElement(children as ReactElement, { id })}</div>
      {meta.touched && meta.error ? (
        <div>
          <span className="text-red-600">{t(meta.error)}</span>
        </div>
      ) : null}
    </div>
  )
}

// TODO: properly impl HOC for reducing input component boilerplate
// export const withFormInputContainer = <T extends BaseInputProps>(
//   Component: FC<T>
// ): FC<T> => ({ containerClassName, ...props }) => {
//   return (
//     <FormInputContainer containerClassName={containerClassName} {...props}>
//       <Component {...props} />
//     </FormInputContainer>
//   )
// }

export const SubmitButton: FC<ButtonProps> = props => {
  const { t } = useTranslation()
  const form = useFormikContext()
  return (
    <Button {...props} type="submit" loading={form.isSubmitting}>
      {props.children ?? t('commons.submit')}
    </Button>
  )
}

export const textInputStyle =
  'rounded border border-gray-400 py-1 px-2 w-full text-sm outline-none'

export type TextInputProps = BaseInputProps & HTMLProps<HTMLInputElement>
export const TextInput: FC<TextInputProps> = ({
  containerClassName,
  placeholder = '',
  ...props
}) => {
  const { t } = useTranslation()
  const [field] = useField(props.name)
  return (
    <FormInputContainer containerClassName={containerClassName} {...props}>
      <input
        className={textInputStyle}
        type="text"
        {...field}
        {...props}
        placeholder={t(placeholder)}
      />
    </FormInputContainer>
  )
}

export type TextAreaProps = BaseInputProps &
  HTMLProps<HTMLTextAreaElement> & {
    submitOnEnter?: boolean
  }
export const TextArea: FC<TextAreaProps> = ({
  containerClassName,
  placeholder = '',
  submitOnEnter = false,
  ...props
}) => {
  const { t } = useTranslation()
  const [field] = useField(props.name)
  const form = useFormikContext()
  return (
    <FormInputContainer containerClassName={containerClassName} {...props}>
      <textarea
        className={textInputStyle}
        {...field}
        {...props}
        placeholder={t(placeholder)}
        onKeyDown={event => {
          if (submitOnEnter && event.code === 'Enter' && !form.isSubmitting) {
            event.preventDefault()
            form.handleSubmit()
            setTimeout(() => form.resetForm())
          }
        }}
      />
    </FormInputContainer>
  )
}
