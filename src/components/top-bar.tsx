import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../query-hooks/user-hooks'
import { HomeIcon } from '../shared/components/icons'

export interface TopBarProps {
  title?: string
}

export const TopBar: FC<TopBarProps> = ({ title }) => {
  const userQuery = useUser()
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
      <div className="flex items-center">
        {userQuery.isSuccess ? (
          <>
            <div className="bg-gray-400 w-9 h-9 rounded-full flex justify-center items-center mr-2">
              <img
                className="w-full h-full rounded-full"
                src={userQuery.data.avatarUrl}
                alt={userQuery.data.username}
              />
            </div>

            <div>
              <h3 className="text-base">{userQuery.data?.fullName}</h3>
              <h4 className="text-xs text-gray-200">{userQuery.data?.email}</h4>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
