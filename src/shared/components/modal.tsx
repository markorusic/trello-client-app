import { CSSProperties, ReactNode, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'
import cx from 'classnames'

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export interface ModalProps {
  title?: string | ReactNode
  className?: string
  contentClassName?: string
  style?: CSSProperties
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({
  title = '',
  className = '',
  contentClassName = '',
  style = {},
  onClose,
  children
}) => {
  const { t } = useTranslation()
  const { current: id } = useRef(uniqueId('modal'))

  return (
    <>
      <div
        className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={event => {
          // @ts-ignore
          if (!event.target.closest(`#${id}`)) {
            onClose()
          }
        }}
      >
        <div
          className={cx('relative my-6 w-auto mx-auto', className)}
          style={{ minWidth: '400px', ...style }}
        >
          <div
            id={id}
            className={cx(
              'bg-gray-200 border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none',
              contentClassName
            )}
          >
            <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-gray-300 rounded-t">
              <div className="text-xl font-bold break-all flex-1">
                {typeof title === 'string' ? t(title) : title}
              </div>
              <button
                className="p-1 h-full bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => onClose()}
              >
                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <CloseIcon />
                </span>
              </button>
            </div>
            <div className="relative p-5 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black"
        onClick={() => onClose()}
      />
    </>
  )
}
