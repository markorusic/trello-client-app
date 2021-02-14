import { FC } from 'react'
import classNames from 'classnames'
import { useFormikContext } from 'formik'
import { BoardDto } from '../../services/board-service'
import {
  FormInputContainer,
  BaseInputProps
} from '../../shared/components/form'

export type BackgroundPref = Pick<
  BoardDto['prefs'],
  'backgroundColor' | 'backgroundBrightness'
>

export const backgroundOptions: BackgroundPref[] = [
  { backgroundColor: '#0079bf', backgroundBrightness: 'dark' },
  { backgroundColor: '#d29034', backgroundBrightness: 'dark' },
  { backgroundColor: '#519839', backgroundBrightness: 'dark' },
  { backgroundColor: '#b04632', backgroundBrightness: 'dark' },
  { backgroundColor: '#89609e', backgroundBrightness: 'dark' },
  { backgroundColor: '#cd5a91', backgroundBrightness: 'dark' },
  { backgroundColor: '#4bbf6b', backgroundBrightness: 'dark' },
  { backgroundColor: '#00aecc', backgroundBrightness: 'dark' },
  { backgroundColor: '#838c91', backgroundBrightness: 'dark' }
]

export const BackgroundPickerInput: FC<BaseInputProps> = props => {
  const form = useFormikContext<BoardDto>()
  return (
    <FormInputContainer {...props}>
      <div className="grid grid-cols-3 gap-2">
        {backgroundOptions.map(option => (
          <div
            key={option.backgroundColor}
            onClick={() => form.setFieldValue(props.name, option)}
            style={{ backgroundColor: option.backgroundColor }}
            className={classNames('w-full h-16 rounded cursor-pointer shadow', {
              'border-2 border-black':
                form.values.prefs.backgroundColor === option.backgroundColor
            })}
          />
        ))}
      </div>
    </FormInputContainer>
  )
}
