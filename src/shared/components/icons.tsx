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

export const PencilIcon = createIconComponent(
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
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
)

export const TrashIcon = createIconComponent(
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)
