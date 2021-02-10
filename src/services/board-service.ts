import { trelloClient } from '../config/trello-client'

interface Board {
  id: string
  name: string
  desc: string
}

export const boardService = {
  fetchAll: () =>
    trelloClient
      .get<Board[]>('/members/me/boards', {
        params: {
          fields: ['name', 'desc'].join(',')
        }
      })
      .then(response => response.data)
}
