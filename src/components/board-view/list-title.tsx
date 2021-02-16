import { FC } from 'react'
import { useListUpdateMutation } from '../../query-hooks/list-hooks'
import { ListDto } from '../../services/list-service'
import { EditableText } from '../../shared/components/editable-text'

export interface ListTitleProps {
  list: ListDto
}

export const ListTitle: FC<ListTitleProps> = ({ list }) => {
  const listUpdateMutation = useListUpdateMutation()
  return (
    <EditableText
      className="font-semibold px-2 py-1"
      containerClassName="mb-1"
      placeholder="lists.enterName"
      text={list.name}
      onChange={name => listUpdateMutation.mutate({ ...list, name })}
    />
  )
}
