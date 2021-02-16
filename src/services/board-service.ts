import { trelloClient } from '../config/trello-client'

export interface BoardDto {
  id: string
  name: string
  desc: string
  prefs: {
    backgroundColor: string
    backgroundBrightness?: 'dark' | 'light'
    backgroundImageScaled?: {
      width: number
      height: number
      url: string
    }[]
  }
}

export type BoardMutationDto = {
  name: string
  desc: string
  prefs_background: string
}

export const boardService = {
  fetchAll: async () => {
    const { data } = await trelloClient.get<BoardDto[]>('/members/me/boards', {
      params: {
        fields: ['name', 'desc', 'prefs'].join(',')
      }
    })
    return data
  },
  fetchById: async (id: string) => {
    const { data } = await trelloClient.get<BoardDto>(`/boards/${id}`)
    return data
  },
  create: async (boardMutationDto: BoardMutationDto) => {
    const { data } = await trelloClient.post<BoardDto>(
      '/boards',
      boardMutationDto
    )
    return data
  }
}
