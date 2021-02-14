import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { QueryObserverResult } from 'react-query'
import classNames from 'classnames'

interface QueryContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  query: QueryObserverResult
}

export const QueryContainer: React.FC<QueryContainerProps> = ({
  query,
  children,
  className,
  ...props
}) => {
  return (
    <div className={classNames('relative', className)} {...props}>
      {query.status !== 'loading' && query.isFetching && (
        <span className="absolute top-0 right-0">
          <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-5 w-5" />
        </span>
      )}
      {query.status === 'loading' && (
        <span className="text-yellow-600">Loading...</span>
      )}
      {query.status === 'error' && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{'query.error'}</span>
        </div>
      )}
      {query.status === 'success' && children}
    </div>
  )
}
