import { CSSProperties, FC, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMeasure } from 'react-use'
import cx from 'classnames'
import { Button } from './button'
import { XIcon } from './icons'

export type PopconfirmProps = {
  title: string
  onConfirm: () => void
  description?: string
  okText?: string
  positionY?: 'top' | 'bottom'
  positionX?: 'left' | 'right'
  style?: CSSProperties
}

export const Popconfirm: FC<PopconfirmProps> = ({
  title,
  description,
  onConfirm,
  okText = 'commons.yes',
  positionY = 'bottom',
  positionX = 'right',
  style = {},
  children
}) => {
  const { t } = useTranslation()
  const cotnainerRef = useRef<HTMLDivElement>(null)
  const [textRef, textSize] = useMeasure<HTMLDivElement>()
  const [showPopup, setShowPopup] = useState(false)

  const closePopup = () => {
    setShowPopup(false)
  }

  const togglePopup = () => {
    setShowPopup(v => !v)
  }

  return (
    <div
      ref={cotnainerRef}
      className="relative"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.stopPropagation()
          closePopup()
          const dialog = cotnainerRef.current?.closest('[role="dialog"]') as
            | HTMLElement
            | undefined
          dialog?.focus()
        }
      }}
    >
      {showPopup ? (
        <div
          style={{
            minWidth: 300,
            ...style,
            ...(positionY === 'top'
              ? { bottom: textSize.height + 4 }
              : { top: textSize.height + 4 }),
            ...(positionX === 'left' ? { right: 8 } : { left: 8 })
          }}
          className={cx(
            'absolute right-0 p-2 cursor-default z-50',
            'rounded shadow-xl bg-white border border-gray-300 text-sm'
          )}
        >
          <div className="flex justify-between items-center py-2 border-b border-gray-200 text-gray-600">
            <div className="text-center flex-1">{t(title)}</div>
            <div className="cursor-pointer" onClick={() => closePopup()}>
              <XIcon color="gray-600" size={5} />
            </div>
          </div>

          {description ? (
            <div className="flex justify-between items-center py-2">
              {t(description)}
            </div>
          ) : null}

          <div className="py-2 text-center">
            <Button
              className="w-full"
              size="md"
              variant="danger"
              onClick={() => {
                closePopup()
                setTimeout(() => onConfirm(), 0)
              }}
            >
              {t(okText)}
            </Button>
          </div>
        </div>
      ) : null}
      <div
        ref={textRef}
        className="cursor-pointer select-none"
        onClick={() => togglePopup()}
      >
        {children}
      </div>
    </div>
  )
}
