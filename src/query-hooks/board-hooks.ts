import { find, first, last, uniqueId } from 'lodash'
import { CSSProperties } from 'react'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../config/query-client'
import {
  BoardDto,
  boardService,
  BoardMutationDto
} from '../services/board-service'
import { collectionOptimisticUpdate } from '../shared/query-utils'

export const boardQueryKeys = {
  boards: 'boards',
  board: 'board'
}

export const useBoards = () =>
  useQuery(boardQueryKeys.boards, boardService.fetchAll)

export const useBoard = (id: string) => {
  const boards = queryClient.getQueryData<BoardDto[]>(boardQueryKeys.boards)
  const board = find(boards, ['id', id])
  return useQuery(
    [boardQueryKeys.board, id],
    () => boardService.fetchById(id),
    {
      placeholderData: board
    }
  )
}

export const useBoardCreateMutation = () =>
  useMutation(boardService.create, {
    ...collectionOptimisticUpdate<BoardMutationDto, BoardDto>({
      getKey: () => boardQueryKeys.boards,
      mutationMapper: ({ prefs_background, ...rest }) => ({
        id: uniqueId(boardQueryKeys.boards),
        prefs: { backgroundColor: prefs_background },
        ...rest
      })
    })
  })

export const useBoardStyle = (
  board: BoardDto | undefined,
  type: 'sm' | 'lg' = 'sm'
): CSSProperties => {
  const defaultBgColor = '#D1D5DA'
  const defaultTextColor = 'black'
  if (!board) {
    return {
      backgroundColor: defaultBgColor,
      color: defaultTextColor
    }
  }
  const { prefs } = board
  const images = prefs.backgroundImageScaled ?? []
  // TODO: impl logic based on screen size
  const image = type === 'sm' ? first(images) : last(images)
  return {
    backgroundColor: prefs.backgroundColor ?? defaultBgColor,
    color: prefs.backgroundBrightness === 'dark' ? 'white' : 'black',
    ...(image
      ? {
          backgroundImage: `url("${image.url}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      : {})
  }
}
