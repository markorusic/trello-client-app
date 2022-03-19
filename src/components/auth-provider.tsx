import { createContext, FC, useContext } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { env } from '../config/env'
import { createStoredValue } from '../shared/stored-value'

const [token, useTokenState] = createStoredValue<string | undefined>(
  'trello-user-token',
  undefined
)

export const trelloPopupLogin = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      expiration: '1day',
      name: 'Trello Clinet App',
      scope: 'read,write',
      response_type: 'token',
      callback_method: 'postMessage',
      return_url: window.location.origin,
      key: env.TRELLO_API_KEY
    })

    const authOrigin = 'https://trello.com'
    const authUrl = `${authOrigin}/1/authorize?${params}`

    const authWindow = window.open(
      authUrl,
      'trello-auth-window',
      'location=0,status=0,width=800,height=800'
    )

    const interval = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(interval)
        reject(null)
      }
    }, 300)

    const receiveMessage = (event: MessageEvent) => {
      if (event.origin !== authOrigin || event.source !== authWindow) {
        return
      }

      if (event.source != null) {
        event.source.close()
      }

      if (event.data != null && /[0-9a-f]{64}/.test(event.data)) {
        resolve(event.data as string)
      }

      window.removeEventListener('message', receiveMessage, false)
    }

    window.addEventListener('message', receiveMessage, false)
  })
}

const createTrelloClient = () => {
  const client = axios.create({
    baseURL: env.TRELLO_API_BASE_URL
  })
  const authParamsInterceptor = (config: AxiosRequestConfig) => {
    config.params = {
      ...config.params,
      key: env.TRELLO_API_KEY,
      token: token.get()
    }
    return config
  }
  client.interceptors.request.use(authParamsInterceptor)
  return client
}

export const trelloClient = createTrelloClient()

type AuthContextValue = {
  token: string | undefined
  isAuthenticated: boolean
  login: (data: string) => void
  logout: VoidFunction
}
const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useTokenState()

  const value: AuthContextValue = {
    token,
    isAuthenticated: !!token,
    logout: () => {
      setToken(undefined)
    },
    login: (token: string) => {
      setToken(token)
    }
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext) as AuthContextValue
