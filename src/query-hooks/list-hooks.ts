import { uniqueId } from 'lodash'
import { useMutation, useQuery } from 'react-query'
import { ListDto, ListMutationDto, listService } from '../services/list-service'
import {
  collectionOptimisticUpdate,
  deleteOptimisticUpdate
} from '../shared/query-utils'

export const listQueryKeys = {
  lists: 'lists'
}

export const useLists = (boardId: string) =>
  useQuery([listQueryKeys.lists, boardId], () =>
    listService.fetchByBoardId(boardId)
  )

const mutationOptions = collectionOptimisticUpdate<ListMutationDto, ListDto>({
  getKey: listMutationDto => [listQueryKeys.lists, listMutationDto.idBoard],
  mutationMapper: listMutationDto => ({
    id: uniqueId(listQueryKeys.lists),
    ...listMutationDto,
    pos:
      typeof listMutationDto.pos === 'number' ? listMutationDto.pos : Date.now()
  })
})

export const useListCreateMutation = () =>
  useMutation(listService.create, mutationOptions)

export const useListUpdateMutation = () =>
  useMutation(listService.update, mutationOptions)

export const useListDeleteMutation = () =>
  useMutation(listService.delete, {
    ...deleteOptimisticUpdate({
      getKey: listDto => [listQueryKeys.lists, listDto.idBoard]
    })
  })
