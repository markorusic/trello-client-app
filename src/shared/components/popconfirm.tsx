import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './button'
import { XIcon } from './icons'

export interface PopconfirmProps {
  title: string
  onConfirm: () => void
  okText?: string
}

export const Popconfirm: FC<PopconfirmProps> = ({
  title,
  onConfirm,
  okText = 'commons.yes',
  children
}) => {
  const { t } = useTranslation()
  const [showPopup, setShowPopup] = useState(false)
  return (
    <div className="relative">
      {showPopup ? (
        <div className="absolute p-3 w-72 bottom-6 rounded shadow-xl bg-white border border-gray-300 flex flex-col items-center cursor-default">
          <div className="flex text-lg text-gray-600 justify-between w-full">
            <div className="flex flex-1 justify-center">{t(title)}</div>
            <div className="cursor-pointer" onClick={() => setShowPopup(false)}>
              <XIcon color="black" />
            </div>
          </div>
          <div className="mt-2 w-full">
            <Button
              className="w-full"
              bgColor="red"
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
