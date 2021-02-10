import axios from 'axios'
import { env } from './env'

export const trelloClient = axios.create({
  baseURL: env.TRELLO_API_BASE_URL,
  params: {
    key: env.TRELLO_API_KEY,
    token: env.TRELLO_SERVER_TOKEN
  }
})
