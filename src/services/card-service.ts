import { trelloClient } from '../config/trello-client'

export interface CardDto {
  id: string
  name: string
  idList: string
  pos: number
  desc: string
}

export interface CardMutationDto {
  id?: string
  idList: string
  name: string
  desc: string
  pos?: ('top' | 'bottom') | number
}

const fields = ['name', 'idList', 'pos', 'desc'].join(',')

export const cardService = {
  fetchByListId: async (listId: string) => {
    const { data } = await trelloClient.get<CardDto[]>(
      `/lists/${listId}/cards`,
      { params: { fields } }
    )
    return data
  },
  fetchById: async (id: string) => {
    const { data } = await trelloClient.get<CardDto>(`/cards/${id}`, {
      params: { fields }
    })
    return data
  },
  create: async (cardMutationDto: CardMutationDto) => {
    const { data } = await trelloClient.post<CardDto>('/cards', cardMutationDto)
    return data
  },
  update: async (cardMutationDto: CardMutationDto) => {
    const { data } = await trelloClient.put<CardDto>(
      `/cards/${cardMutationDto.id}`,
      cardMutationDto
    )
    return data
  },
  delete: async (cardDto: CardDto) => {
    const { data } = await trelloClient.delete(`/cards/${cardDto.id}`)
    return data
  }
}
