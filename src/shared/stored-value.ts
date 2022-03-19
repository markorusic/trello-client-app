import { useEffect, useState } from 'react'

export const createStoredValue = <T>(key: string, defaultValue: T) => {
  let _isInitied = false
  let _value = defaultValue

  const get = () => {
    if (_isInitied) {
      return _value
    }
    try {
      const rawValue = localStorage.getItem(key)
      if (rawValue) {
        const parsedValue = JSON.parse(rawValue) as T
        _value = parsedValue || defaultValue
      }
    } catch (error) {}
    _isInitied = true
    return _value
  }

  const set = (value: T) => {
    _value = value
    localStorage.setItem(key, JSON.stringify(value))
  }

  const clear = () => {
    _value = defaultValue
    localStorage.removeItem(key)
  }

  const useStoredState = (): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState(() => get())

    useEffect(() => {
      set(value)
    }, [value])

    return [value, setValue] as any
  }

  return [{ get, set, clear }, useStoredState] as [
    { get: typeof get; set: typeof set; clear: typeof clear },
    typeof useStoredState
  ]
}
