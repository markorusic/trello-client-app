import { trelloClient } from '../config/trello-client'

export interface ListDto {
  id: string
  name: string
  idBoard: string
  pos: number
}

export interface ListMutationDto {
  id?: string
  idBoard: string
  name: string
  pos: ('top' | 'bottom') | number
}

export const listService = {
  fetchByBoardId: async (boardId: string) => {
    const { data } = await trelloClient.get<ListDto[]>(
      `/boards/${boardId}/lists`,
      {
        params: {
          fields: ['name', 'idBoard', 'pos'].join(',')
        }
      }
    )
    return data
  },
  create: async (listMutationDto: ListMutationDto) => {
    const { data } = await trelloClient.post<ListDto>('/lists', listMutationDto)
    return data
  },
  update: async (listMutationDto: ListMutationDto) => {
    const { data } = await trelloClient.put<ListDto>(
      `/lists/${listMutationDto.id}`,
      listMutationDto
    )
    return data
  }
}
