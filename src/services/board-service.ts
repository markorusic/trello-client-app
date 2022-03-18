import { trelloClient } from '../components/auth-provider'

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
  id?: string
  name: string
  desc: string
  prefs_background: string
}

const fields = ['name', 'desc', 'prefs'].join(',')

export const boardService = {
  fetchAll: async () => {
    const { data } = await trelloClient.get<BoardDto[]>('/members/me/boards', {
      params: { fields }
    })
    return data
  },
  fetchById: async (id: string) => {
    const { data } = await trelloClient.get<BoardDto>(`/boards/${id}`, {
      params: { fields }
    })
    return data
  },
  create: async (boardMutationDto: BoardMutationDto) => {
    const { data } = await trelloClient.post<BoardDto>(
      '/boards',
      boardMutationDto
    )
    return data
  },
  update: async ({ prefs_background, ...rest }: BoardMutationDto) => {
    const { data } = await trelloClient.put<BoardDto>(`/boards/${rest.id}`, {
      ...rest,
      'prefs/background': prefs_background
    })
    return data
  }
}
