import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { queryClient } from '../config/query-client'
import {
  cardQueryKeys,
  useCard,
  useCardDeleteMutation,
  useCardUpdateMutation
} from '../query-hooks/card-hooks'
import { CardDto } from '../services/card-service'
import { EditableText } from '../shared/components/editable-text'
import { Modal } from '../shared/components/modal'
import { CommentList } from '../components/comments/comment-list'
import { CommentCreateFrom } from '../components/comments/comment-create-from'
import { Popconfirm } from '../shared/components/popconfirm'
import { TrashIcon } from '../shared/components/icons'

interface LocationState {
  initialData?: CardDto
}

const CardPage = () => {
  const { t } = useTranslation()
  const { cardId } = useParams<{ cardId: string }>()
  const location = useLocation<LocationState>()
  const history = useHistory<LocationState>()

  const cardUpdateMutation = useCardUpdateMutation()
  const cardDeleteMutation = useCardDeleteMutation()
  const cardQuery = useCard(cardId, {
    initialData: location.state?.initialData
  })

  const updateCard = (card: CardDto) => {
    history.replace({ state: { initialData: card } })
    queryClient.setQueryData([cardQueryKeys.card, cardId], card)
    cardUpdateMutation.mutate(card)
  }

  const deleteCard = (card: CardDto) => {
    history.goBack()
    setTimeout(() => {
      history.replace({ state: { initialData: undefined } })
      queryClient.setQueryData([cardQueryKeys.card, cardId], undefined)
      cardDeleteMutation.mutate(card)
    }, 100)
  }

  return (
    <Modal
      onClose={() => history.goBack()}
      contentClassName="h-full overflow-auto"
      style={{ width: '800px' }}
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
      {cardQuery.isSuccess ? (
        <div className="flex justify-between">
          <div className="flex-1 pr-4">
            <h2 className="font-semibold">{t('commons.description')}</h2>
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
          </div>
          <div className="w-52 border">
            <h3 className="text-gray-600 font-medium uppercase text-sm">
              {t('commons.actions')}
            </h3>
            <ul>
              <li>
                <Popconfirm
                  title="commons.deletePrompt"
                  okText="commons.deleteConfirm"
                  position="bottom"
                  onConfirm={() => deleteCard(cardQuery.data)}
                >
                  <div className="flex items-center bg-gray-300 text-black p-2 text-sm">
                    <TrashIcon color="black" />
                    <h3 className="ml-2">{t('commons.delete')}</h3>
                  </div>
                </Popconfirm>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

export default CardPage
