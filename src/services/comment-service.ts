import { trelloClient } from '../config/trello-client'

export interface CommentDto {
  id: string
  type: 'commentCard' | 'updateCard'
  date: string
  data: {
    text: string
    card: { id: string }
  }
  memberCreator: {
    id: string
    username: string
    avatarUrl: string | null
  }
}

export interface CommentMutationDto {
  id?: string
  date?: string
  text: string
  cardId: string
  memberCreator: CommentDto['memberCreator']
}

const fields = ['type', 'date', 'data', 'memberCreator'].join(',')

const mapComment = (comment: CommentDto): CommentDto => ({
  ...comment,
  memberCreator: {
    ...comment.memberCreator,
    avatarUrl: comment.memberCreator.avatarUrl
      ? `${comment.memberCreator.avatarUrl}/30.png`
      : null
  }
})

export const commentService = {
  fetchByCardId: async (cardId: string) => {
    const { data } = await trelloClient.get<CommentDto[]>(
      `/cards/${cardId}/actions`,
      { params: { fields, filter: 'commentCard' } }
    )
    return data.map(mapComment)
  },
  create: async (commentMutationDto: CommentMutationDto) => {
    const { data } = await trelloClient.post<CommentDto>(
      `/cards/${commentMutationDto.cardId}/actions/comments`,
      { text: commentMutationDto.text }
    )
    return mapComment(data)
  },
  update: async (commentMutationDto: CommentMutationDto) => {
    const { data } = await trelloClient.put<CommentDto>(
      `/actions/${commentMutationDto.id}`,
      commentMutationDto
    )
    return mapComment(data)
  },
  delete: async (commentDto: CommentDto) => {
    const { data } = await trelloClient.delete(`/actions/${commentDto.id}`)
    return data
  }
}
