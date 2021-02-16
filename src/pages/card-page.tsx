import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { queryClient } from '../config/query-client'
import {
  cardQueryKeys,
  useCard,
  useCardUpdateMutation
} from '../query-hooks/card-hooks'
import { CardDto } from '../services/card-service'
import { EditableText } from '../shared/components/editable-text'
import { Modal } from '../shared/components/modal'
import { CommentList } from '../components/comments/comment-list'
import { CommentCreateFrom } from '../components/comments/comment-create-from'

interface LocationState {
  initialData?: CardDto
}

const CardPage = () => {
  const { t } = useTranslation()
  const { cardId } = useParams<{ cardId: string }>()
  const location = useLocation<LocationState>()
  const history = useHistory<LocationState>()

  const cardUpdateMutation = useCardUpdateMutation()
  const cardQuery = useCard(cardId, {
    initialData: location.state?.initialData
  })

  const updateCard = (card: CardDto) => {
    history.replace({ state: { initialData: card } })
    queryClient.setQueryData([cardQueryKeys.card, cardId], card)
    cardUpdateMutation.mutate(card)
  }

  return (
    <Modal
      onClose={() => history.goBack()}
      contentClassName="h-full overflow-auto"
      style={{ width: '600px' }}
      title={
        cardQuery.isSuccess ? (
          <EditableText
            className="px-2 py-1"
            placeholder="cards.enterName"
            text={cardQuery.data.name}
            onChange={name => updateCard({ ...cardQuery.data, name })}
          />
        ) : (
          '...'
        )
      }
    >
      <div>
        <h2 className="font-semibold">{t('commons.description')}</h2>
        {cardQuery.isSuccess ? (
          <div>
            <EditableText
              as="textarea"
              className="px-2 py-1 bg-white rounded w-full"
              placeholder="cards.enterDescription"
              text={cardQuery.data.desc}
              onChange={desc => updateCard({ ...cardQuery.data, desc })}
            />

            <div className="my-4">
              <h2 className="font-semibold">{t('cards.comments')}</h2>
              <div className="my-2">
                <CommentCreateFrom cardId={cardQuery.data.id} />
              </div>
              <CommentList card={cardQuery.data} />
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}

export default CardPage
