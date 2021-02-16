import { useHistory } from 'react-router-dom'
import i18next from 'i18next'
import { notyf } from '../config/notify'
import Container from '../shared/components/container'
import { useBoardCreateMutation } from '../query-hooks/board-hooks'
import { ButtonModal } from '../shared/components/button-modal'
import { BoardForm } from '../components/board/board-form'
import { BoardList } from '../components/board/board-list'
import { TopBar } from '../components/top-bar'

export const BoardsPage = () => {
  const history = useHistory()
  const boardCreateMutation = useBoardCreateMutation()
  return (
    <div>
      <div className="bg-blue-500 text-white">
        <TopBar />
      </div>
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
    </div>
  )
}
