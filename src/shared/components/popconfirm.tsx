import { CSSProperties, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './button'
import { XIcon } from './icons'

export interface PopconfirmProps {
  title: string
  onConfirm: () => void
  okText?: string
  position?: 'top' | 'bottom'
  style?: CSSProperties
}

export const Popconfirm: FC<PopconfirmProps> = ({
  title,
  onConfirm,
  okText = 'commons.yes',
  position = 'top',
  style = {},
  children
}) => {
  const { t } = useTranslation()
  const [showPopup, setShowPopup] = useState(false)
  return (
    <div className="relative">
      {showPopup ? (
        <div
          style={style}
          className={`${
            position === 'top' ? 'bottom' : 'top'
          }-6 absolute p-3 w-56 rounded shadow-xl bg-white border border-gray-300 flex flex-col cursor-default`}
        >
          <div className="flex text-gray-600 justify-between w-full">
            <div className="flex flex-1 text-base">{t(title)}</div>
            <div
              className="cursor-pointer text-sm"
              onClick={() => setShowPopup(false)}
            >
              <XIcon color="black" />
            </div>
          </div>
          <div className="mt-2">
            <Button
              size="xs"
              variant="danger"
              onClick={() => {
                setShowPopup(false)
                setTimeout(() => onConfirm(), 0)
              }}
            >
              {t(okText)}
            </Button>
          </div>
        </div>
      ) : null}
      <div className="cursor-pointer" onClick={() => setShowPopup(v => !v)}>
        {children}
      </div>
    </div>
  )
}
