import { useHistory } from 'react-router-dom'
import i18next from 'i18next'
import { notyf } from '../config/notify'
import Container from '../shared/components/container'
import { useBoardCreateMutation } from '../query-hooks/board-hooks'
import { ButtonModal } from '../shared/components/button-modal'
import { BoardForm } from '../components/board/board-form'
import { BoardList } from '../components/board/board-list'

export const BoardsPage = () => {
  const history = useHistory()
  const boardCreateMutation = useBoardCreateMutation()
  return (
    <Container>
      <ButtonModal title="boards.createBoard">
        <BoardForm
          onSubmit={(values, actions) =>
            boardCreateMutation.mutate(values, {
              onSuccess: board => history.push(`board/${board.id}`),
              onError: () => {
                notyf.error(i18next.t('boards.createBoardError'))
              },
              onSettled: () => actions.setSubmitting(false)
            })
          }
        />
      </ButtonModal>
      <BoardList />
    </Container>
  )
}
