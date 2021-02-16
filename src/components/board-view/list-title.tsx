import { Field } from 'formik'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useListUpdateMutation } from '../../query-hooks/list-hooks'
import { ListDto, ListMutationDto } from '../../services/list-service'
import { Form } from '../../shared/components/form'
import { createFormMutationOptions } from '../../shared/query-utils'

export interface ListTitleProps {
  list: ListDto
}

export const ListTitle: FC<ListTitleProps> = ({ list }) => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const listUpdateMutation = useListUpdateMutation()

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
      className="font-semibold mb-1"
      onClick={() => setShowUpdateForm(v => !v)}
    >
      {showUpdateForm ? (
        <Form<ListMutationDto>
          initialValues={list}
          onSubmit={(values, actions) =>
            listUpdateMutation.mutate(values, {
              ...createFormMutationOptions(actions, 'lists.createError'),
              onSuccess: () => setShowUpdateForm(false)
            })
          }
        >
          <Field
            className="font-semibold rounded w-full px-2 py-1"
            type="text"
            name="name"
            placeholder={t('lists.enterName')}
            autoFocus
          />
        </Form>
      ) : (
        <h3 className="px-2 py-1">{list.name}</h3>
      )}
    </div>
  )
}
