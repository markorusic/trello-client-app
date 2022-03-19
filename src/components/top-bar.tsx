import { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'
import { useUser } from '../query-hooks/user-hooks'
import { HomeIcon } from '../shared/components/icons'
import { CloseIcon } from '../shared/components/modal'
import { useAuth } from './auth-provider'
import { useClickOutside } from '../shared/use-click-outside'

export interface TopBarProps {
  title?: string
}

export const TopBar: FC<TopBarProps> = ({ title }) => {
  const { t } = useTranslation()
  const auth = useAuth()
  const userQuery = useUser()
  const [showOptions, setShowOptions] = useState(false)

  const closeOptions = useCallback(() => setShowOptions(false), [])
  const modalContentRef = useClickOutside(closeOptions)

  return (
    <div className="h-12 py-1 px-2 flex justify-between items-center border-b border-white">
      <div className="flex items-center">
        <div className="cursor-pointer hover:opacity-80 mr-2">
          <Link className="block" to="">
            <HomeIcon size={8} />
          </Link>
        </div>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center" ref={modalContentRef}>
        <div
          className="flex item-center cursor-pointer select-none hover:opacity-80"
          onClick={() => setShowOptions(v => !v)}
        >
          <div className="bg-gray-400 w-8 h-8 rounded-full flex justify-center items-center mr-2">
            {userQuery.isSuccess ? (
              <img
                className="w-full h-full rounded-full"
                src={userQuery.data.avatarUrl}
                alt={userQuery.data.username}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300" />
            )}
          </div>
        </div>
        <div
          style={{ width: 320 }}
          className={cx(
            'absolute top-12 right-2',
            'shadow-md bg-white text-black border border-gray-200',
            'rounded-md z-10 px-4',
            {
              hidden: !showOptions
            }
          )}
        >
          <div className="flex justify-between items-center py-2 border-b border-gray-200 text-gray-600">
            <div className="text-center flex-1">{t('commons.account')}</div>
            <span
              className="h-6 w-6 text-2xl block outline-none focus:outline-none cursor-pointer"
              onClick={closeOptions}
            >
              <CloseIcon />
            </span>
          </div>

          {userQuery.isSuccess ? (
            <div className="py-4 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={userQuery.data.avatarUrl}
                  alt={userQuery.data.username}
                />
                <div className="flex flex-col text-sm">
                  <span>{userQuery.data.fullName}</span>
                </div>
              </div>
            </div>
          ) : null}

          <div className="py-2" onClick={auth.logout}>
            <div className="py-1 px-2 text-sm rounded cursor-pointer hover:bg-gray-100 duration-300 transition-colors">
              {t('commons.logout')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
