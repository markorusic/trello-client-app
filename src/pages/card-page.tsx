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

const CardPage = () => {
  const { t } = useTranslation()
  const { cardId } = useParams<{ cardId: string }>()
  const location = useLocation<{ initialData?: CardDto }>()
  const history = useHistory()

  const cardUpdateMutation = useCardUpdateMutation()
  const cardQuery = useCard(cardId, {
    initialData: location.state?.initialData
  })

  const updateCard = (card: CardDto) => {
    queryClient.setQueryData([cardQueryKeys.card, cardId], card)
    cardUpdateMutation.mutate(card)
  }

  return (
    <Modal
      onClose={() => history.goBack()}
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
      <div className="overflow-scroll">
        <h2 className="font-semibold">{t('commons.description')}</h2>
        {cardQuery.isSuccess ? (
          <EditableText
            as="textarea"
            className="px-2 py-1"
            placeholder="cards.enterDescription"
            text={cardQuery.data.desc}
            onChange={desc => updateCard({ ...cardQuery.data, desc })}
          />
        ) : null}
      </div>
    </Modal>
  )
}

export default CardPage
