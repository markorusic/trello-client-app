import { trelloClient } from '../config/trello-client'

export interface CardDto {
  id: string
  name: string
  idList: string
  pos: number
}

export interface CardMutationDto {
  id?: string
  idList: string
  name: string
  pos?: ('top' | 'bottom') | number
}

export const cardService = {
  fetchByListId: async (listId: string) => {
    const { data } = await trelloClient.get<CardDto[]>(
      `/lists/${listId}/cards`,
      {
        params: {
          fields: ['name', 'idList', 'pos'].join(',')
        }
      }
    )
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
  }
}
