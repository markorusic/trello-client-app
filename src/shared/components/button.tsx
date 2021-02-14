import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import classNames from 'classnames'

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  bgColor?: string
  textColor?: string
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  bgColor = 'blue',
  textColor = 'white',
  loading = false,
  className,
  ...props
}) => {
  const disabled = props.disabled ?? loading
  return (
    <button
      className={classNames(
        `bg-${bgColor}-500 text-${textColor}
        active:bg-pink-600
        font-bold
        text-sm
        px-6 py-3
        rounded
        shadow
        hover:shadow-lg
        hover:bg-${bgColor}-600
        outline-none
        focus:outline-none mr-1 mb-1
        transition duration-500
        ${disabled ? 'opacity-50' : ''}
        `,
        className
      )}
      {...props}
      disabled={disabled}
    />
  )
}
