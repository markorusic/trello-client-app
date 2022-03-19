import { useRef, useEffect } from 'react'

export function useClickOutside(callback: () => void) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (ref.current && event.key === 'Escape') {
        callback()
      }
    }
    document.addEventListener('keyup', handleEscape)
    return () => document.removeEventListener('keyup', handleEscape)
  }, [callback])

  return ref
}
