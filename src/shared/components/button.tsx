import cx from 'classnames'

export type ButtonVariant = 'primary' | 'danger' | 'success'

export type ButtonSize = 'md' | 'sm' | 'xs'

export const baseButtonStyle = `
  font-semibold
  rounded shadow outline-none
  transition duration-500
  focus:outline-none mr-1 mb-1
  hover:shadow-lg
`

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: cx(baseButtonStyle, 'bg-blue-500 text-white', 'hover:bg-blue-600'),
  danger: cx(baseButtonStyle, 'bg-red-500 text-white', 'hover:bg-red-600'),
  success: cx(baseButtonStyle, 'bg-green-500 text-white', 'hover:bg-green-600')
}

export const buttonSizes: Record<ButtonSize, string> = {
  md: 'text-md px-4 py-2',
  sm: 'text-sm px-4 py-2',
  xs: 'text-xs px-2 py-1'
}

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

export const Button = ({
  variant = 'primary',
  size = 'sm',
  loading = false,
  className,
  ...props
}: ButtonProps) => {
  const disabled = props.disabled ?? loading
  return (
    <button
      disabled={disabled}
      className={cx(className, buttonVariants[variant], buttonSizes[size], {
        'opacity-50': disabled
      })}
      {...props}
    />
  )
}
