import classNames from 'classnames'
import { FC, ReactElement } from 'react'

export interface IconProps {
  containerClassName?: string
  size?: number
  color?: string
}

export const createIconComponent = (icon: ReactElement): FC<IconProps> => ({
  size = 5,
  color = 'white',
  containerClassName = null
}) => {
  return (
    <div
      className={classNames(
        `w-${size} h-${size} text-${color}`,
        containerClassName
      )}
    >
      {icon}
    </div>
  )
}

export const UserIcon = createIconComponent(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

export const XIcon = createIconComponent(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)
