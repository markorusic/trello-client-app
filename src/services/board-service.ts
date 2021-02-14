import { trelloClient } from '../config/trello-client'
export interface BoardDto {
  id: string
  name: string
  desc: string
  prefs: {
    backgroundBrightness: 'dark' | 'light'
    backgroundColor: string
    backgroundImageScaled?: {
      width: number
      height: number
      url: string
    }[]
  }
}

export type BoardMutationDto = Omit<BoardDto, 'id'>

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
  create: async (newBoardDto: BoardMutationDto) => {
    const { data } = await trelloClient.post<BoardDto>('/boards', newBoardDto)
    return data
  }
}
