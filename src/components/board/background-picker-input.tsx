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
  blue: '#0079bf',
  orange: '#d29034',
  green: '#519839',
  red: '#b04632',
  purple: '#89609e',
  pink: '#cd5a91',
  lime: '#4bbf6b',
  sky: '#00aecc',
  grey: '#838c91'
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
