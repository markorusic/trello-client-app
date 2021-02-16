import { useMutation, useQuery } from 'react-query'
import { orderBy, uniqueId } from 'lodash'
import dayjs from 'dayjs'
import {
  CommentDto,
  CommentMutationDto,
  commentService
} from '../services/comment-service'
import { collectionOptimisticUpdate } from '../shared/query-utils'
import { cardQueryKeys } from './card-hooks'
import { queryClient } from '../config/query-client'

export const commentQueryKeys = {
  comments: 'comments'
}

export const useComments = (cardId: string) =>
  useQuery(
    [commentQueryKeys.comments, cardId],
    () => commentService.fetchByCardId(cardId),
    { enabled: !cardId.startsWith(cardQueryKeys.cards) }
  )

const mutationOptions = collectionOptimisticUpdate<
  CommentMutationDto,
  CommentDto
>({
  getKey: commentMutationDto => [
    commentQueryKeys.comments,
    commentMutationDto.cardId
  ],
  mutationMapper: commentMutationDto => ({
    id: uniqueId(commentQueryKeys.comments),
    ...commentMutationDto,
    type: 'commentCard',
    date: commentMutationDto.date ?? dayjs().format(),
    data: {
      text: commentMutationDto.text,
      card: { id: commentMutationDto.cardId }
    }
  }),
  mapCollection: comments => orderBy(comments, 'date', 'desc')
})

export const useCommentCreateMutation = () =>
  useMutation(commentService.create, mutationOptions)

export const useCommentUpdateMutation = () =>
  useMutation(commentService.update, mutationOptions)

export const useCommentDeleteMutation = () =>
  useMutation(commentService.delete, {
    onMutate: async (commentDto: CommentDto) => {
      const key = [commentQueryKeys.comments, commentDto.data.card.id]
      await queryClient.cancelQueries(key)
      const previousItems = queryClient.getQueryData<CommentDto[]>(key)
      queryClient.setQueryData<CommentDto[]>(key, old => {
        return [...(old ?? [])].filter(comment => comment.id !== commentDto.id)
      })
      return { key, previousItems }
    },
    onError: (_, __, context) => {
      if (context?.key) {
        queryClient.setQueryData(context.key, context?.previousItems)
      }
    }
  })
