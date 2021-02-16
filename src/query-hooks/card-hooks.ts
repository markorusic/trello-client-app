import { uniqueId } from 'lodash'
import { useMutation, useQuery, UseQueryOptions } from 'react-query'
import { CardDto, CardMutationDto, cardService } from '../services/card-service'
import { collectionOptimisticUpdate } from '../shared/query-utils'
import { listQueryKeys } from './list-hooks'

export const cardQueryKeys = {
  cards: 'cards',
  card: 'card'
}

export const useCards = (listId: string) =>
  useQuery(
    [cardQueryKeys.cards, listId],
    () => cardService.fetchByListId(listId),
    {
      enabled: !listId.startsWith(listQueryKeys.lists)
    }
  )

export const useCard = (
  id: string,
  options: UseQueryOptions<CardDto, unknown, CardDto> = {}
) =>
  useQuery([cardQueryKeys.card, id], () => cardService.fetchById(id), options)

const mutationOptions = collectionOptimisticUpdate<CardMutationDto, CardDto>({
  getKey: cardMutationDto => [cardQueryKeys.cards, cardMutationDto.idList],
  mutationMapper: cardMutationDto => ({
    id: uniqueId(cardQueryKeys.cards),
    ...cardMutationDto,
    pos:
      typeof cardMutationDto.pos === 'number' ? cardMutationDto.pos : Date.now()
  })
})

export const useCardCreateMutation = () =>
  useMutation(cardService.create, mutationOptions)

export const useCardUpdateMutation = () =>
  useMutation(cardService.update, mutationOptions)
