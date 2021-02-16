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
  px?: number
  py?: number
  text?: string
}

export const Button: React.FC<ButtonProps> = ({
  bgColor = 'blue',
  textColor = 'white',
  px = 3,
  py = 2,
  text = 'sm',
  loading = false,
  className,
  ...props
}) => {
  const disabled = props.disabled ?? loading
  return (
    <button
      className={classNames(
        `bg-${bgColor}-500 text-${textColor}
        font-bold
        text-${text}
        px-${px} py-${py}
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
