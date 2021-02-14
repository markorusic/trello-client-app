import { first, last, map, uniqueId } from 'lodash'
import { CSSProperties } from 'react'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../config/query-client'
import {
  BoardDto,
  boardService,
  BoardMutationDto
} from '../services/board-service'

export const boardQueryKeys = {
  boards: 'boards',
  board: 'board'
}

export const useBoards = () =>
  useQuery(boardQueryKeys.boards, boardService.fetchAll)

export const useBoard = (id: string) =>
  useQuery([boardQueryKeys.board, id], () => boardService.fetchById(id))

export const useBoardCreateMutation = () =>
  useMutation(boardService.create, {
    onMutate: async (boardMutationDto: BoardMutationDto) => {
      const { prefs_background, ...rest } = boardMutationDto
      const board: BoardDto = {
        id: uniqueId(),
        prefs: { backgroundColor: prefs_background },
        ...rest
      }
      await queryClient.cancelQueries(boardQueryKeys.boards)
      const previousBoards = queryClient.getQueryData<BoardDto[]>(
        boardQueryKeys.boards
      )
      queryClient.setQueryData<BoardDto[]>(boardQueryKeys.boards, old => [
        ...(old ?? []),
        board
      ])
      return { previousBoards, board }
    },
    onSuccess: (board, _, context) => {
      queryClient.setQueryData<BoardDto[]>(boardQueryKeys.boards, boards =>
        map(boards, b => (b.id === context?.board.id ? board : b))
      )
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(boardQueryKeys.boards, context?.previousBoards)
    },
    onSettled: () => {
      queryClient.invalidateQueries(boardQueryKeys.boards)
    }
  })

export const useBoardStyle = (
  board: BoardDto | undefined,
  type: 'sm' | 'lg' = 'sm'
): CSSProperties => {
  if (!board) {
    return {
      backgroundColor: 'black',
      color: 'white'
    }
  }
  const { prefs } = board
  const images = prefs.backgroundImageScaled ?? []
  // TODO: impl logic based on screen size
  const image = type === 'sm' ? first(images) : last(images)
  return {
    backgroundColor: prefs.backgroundColor ?? 'black',
    color: prefs.backgroundBrightness === 'dark' ? 'white' : 'black',
    ...(image
      ? {
          background: `url("${image.url}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      : {})
  }
}
