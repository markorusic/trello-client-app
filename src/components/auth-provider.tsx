import { createContext, FC, useContext, useState } from 'react'
import axios from 'axios'
import { env } from '../config/env'

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
