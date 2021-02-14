import classNames from 'classnames'

interface ContainerProps {
  className?: string
}

const Container: React.FC<ContainerProps> = ({ className = '', children }) => {
  return (
    <div
      className={classNames('w-full md:w-3/4 lg:w-1/2 mx-auto py-3', className)}
    >
      {children}
    </div>
  )
}

export default Container
