import { useHistory } from 'react-router-dom'
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
      <ButtonModal title="Create new board">
        <BoardForm
          onSubmit={(values, actions) =>
            boardCreateMutation.mutate(values, {
              onSuccess: board => history.push(`board/${board.id}`),
              onError: () => {
                notyf.error('An error occured while creating new board!')
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
