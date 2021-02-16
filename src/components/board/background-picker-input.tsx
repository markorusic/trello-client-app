import { FC } from 'react'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import { get, keys } from 'lodash'
import { BoardMutationDto } from '../../services/board-service'
import {
  FormInputContainer,
  BaseInputProps
} from '../../shared/components/form'

export const boardColors = {
  blue: '#0079BF',
  orange: '#D29034',
  green: '#519839',
  red: '#B04632',
  purple: '#89609E',
  pink: '#CD5A91',
  lime: '#4BBF6B',
  sky: '#00AECC',
  grey: '#838C91'
}

export const BackgroundPickerInput: FC<BaseInputProps> = props => {
  const form = useFormikContext<BoardMutationDto>()
  return (
    <FormInputContainer {...props}>
      <div className="grid grid-cols-3 gap-2">
        {keys(boardColors).map(color => (
          <div
            key={color}
            onClick={() => form.setFieldValue(props.name, color)}
            style={{ backgroundColor: get(boardColors, color) }}
            className={classNames('w-full h-16 rounded cursor-pointer shadow', {
              'border-2 border-black': form.values.prefs_background === color
            })}
          />
        ))}
      </div>
    </FormInputContainer>
  )
}
