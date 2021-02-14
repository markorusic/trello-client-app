import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'

export interface ModalProps {
  title?: string
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({
  title = '',
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
          className="relative w-auto my-6 mx-auto max-w-3xl"
          style={{ minWidth: '400px' }}
        >
          <div
            id={id}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-2xl font-semibold">{t(title)}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => onClose()}
              >
                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
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
