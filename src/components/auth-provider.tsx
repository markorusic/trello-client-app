import { createContext, FC, useContext, useState } from 'react'
import axios from 'axios'
import { env } from '../config/env'

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

const createTrelloClinet = (token: string | undefined) =>
  axios.create({
    baseURL: env.TRELLO_API_BASE_URL,
    params: {
      key: env.TRELLO_API_KEY,
      token
    }
  })

export let trelloClient = createTrelloClinet(undefined)

type AuthContextValue = {
  token: string | undefined
  isAuthenticated: boolean
  login: (data: string) => void
  logout: VoidFunction
}
const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider: FC = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined)

  const value: AuthContextValue = {
    token: authToken,
    isAuthenticated: !!authToken,
    logout: () => {
      setAuthToken(undefined)
    },
    login: (token: string) => {
      trelloClient = createTrelloClinet(token)
      setAuthToken(token)
    }
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext) as AuthContextValue
