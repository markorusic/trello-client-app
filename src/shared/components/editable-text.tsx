import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMeasure } from 'react-use'
import { Field, FieldProps } from 'formik'
import classNames from 'classnames'
import { Form } from './form'

export interface EditableTextProps {
  text: string
  onChange: (newValue: string) => void
  controlledState?: {
    showForm: boolean
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  }
  disabled?: boolean
  type?: string
  as?: string | React.ComponentType<FieldProps['field']>
  placeholder?: string
  className?: string
  containerClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const useEditableText = (initialState = false) => {
  const [showForm, setShowForm] = useState(initialState)
  return { showForm, setShowForm }
}

export const EditableText: FC<EditableTextProps> = ({
  text,
  onChange,
  type = 'text',
  as = 'input',
  placeholder = '',
  className = '',
  containerClassName = '',
  disabled = false,
  controlledState = { showForm: undefined, setShowForm: undefined },
  ...props
}) => {
  const { t } = useTranslation()
  const [textRef, textSize] = useMeasure<HTMLDivElement>()
  const fieldRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autofocusRef = useRef(!!text)

  const innerState = useEditableText(!text)

  const _showForm = controlledState.showForm ?? innerState.showForm
  const _setShowForm = controlledState.setShowForm ?? innerState.setShowForm

  const showForm = (_showForm || !text) && !disabled

  useEffect(() => {
    containerRef.current?.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        _setShowForm(false)
      }
    })
  }, [_setShowForm])

  useEffect(() => {
    if (showForm) {
      const input = fieldRef.current as HTMLInputElement
      if (input) {
        input.select()
      }
    }
  }, [showForm])

  return (
    <div
      ref={containerRef}
      className={classNames('break-all', containerClassName)}
    >
      {showForm ? (
        <Form<{ text: string }>
          initialValues={{ text }}
          validate={values => {
            if (!values.text) {
              return { text: '' }
            }
          }}
          onSubmit={values => {
            onChange(values.text)
            _setShowForm(false)
          }}
        >
          {form => (
            <Field
              innerRef={fieldRef}
              className={classNames(
                'rounded w-full outline-none border border-blue-300',
                className
              )}
              style={{
                height: textSize.height > 0 ? textSize.height + 8 : undefined
              }}
              as={as}
              type={type}
              name="text"
              placeholder={t(placeholder)}
              autoFocus={autofocusRef.current}
              onBlur={() => _setShowForm(!form.values.text)}
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
        <div
          ref={textRef}
          className={classNames(
            'whitespace-pre-wrap break-words',
            {
              'cursor-pointer hover:opacity-70': !disabled
            },
            className
          )}
          onClick={() => _setShowForm(true)}
        >
          {text}
        </div>
      )}
    </div>
  )
}
