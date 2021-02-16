import classNames from 'classnames'
import { Field, FieldProps } from 'formik'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from './form'

export interface EditableTextProps {
  text: string
  onChange: (newValue: string) => void
  type?: string
  as?: string | React.ComponentType<FieldProps['field']>
  placeholder?: string
  className?: string
  containerClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const EditableText: FC<EditableTextProps> = ({
  text,
  onChange,
  type = 'text',
  as = 'input',
  placeholder = '',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const autofocusRef = useRef(!!text)
  const [showUpdateForm, setShowUpdateForm] = useState(!text)

  useEffect(() => {
    containerRef.current?.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setShowUpdateForm(false)
      }
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className={classNames('break-all', containerClassName)}
    >
      {showUpdateForm || !text ? (
        <Form<{ text: string }>
          initialValues={{ text }}
          validate={values => {
            if (!values.text) {
              return { text: '' }
            }
          }}
          onSubmit={values => {
            onChange(values.text)
            setShowUpdateForm(false)
          }}
        >
          {form => (
            <Field
              className={classNames(
                'rounded w-full outline-none border border-blue-300',
                className
              )}
              as={as}
              type={type}
              name="text"
              placeholder={t(placeholder)}
              autoFocus={autofocusRef.current}
              onBlur={() => setShowUpdateForm(!form.values.text)}
              onKeyDown={(event: KeyboardEvent) => {
                if (event.code === 'Enter' && !form.isSubmitting) {
                  event.preventDefault()
                  form.handleSubmit()
                }
              }}
              {...props}
            />
          )}
        </Form>
      ) : (
        <h3
          className={classNames('cursor-pointer hover:opacity-70', className)}
          onClick={() => setShowUpdateForm(true)}
        >
          {text}
        </h3>
      )}
    </div>
  )
}
