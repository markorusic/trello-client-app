import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonProps } from './button'
import { Modal, ModalProps } from './modal'

export interface ButtonModalProps extends Omit<ModalProps, 'onClose'> {
  buttonProps?: ButtonProps
}

export const ButtonModal: FC<ButtonModalProps> = ({
  buttonProps = {},
  ...props
}) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onClick={() => setShowModal(true)} {...buttonProps}>
        {buttonProps.children ??
          (typeof props.title === 'string'
            ? t(props.title || '')
            : props.title)}
      </Button>
      {showModal ? (
        <Modal onClose={() => setShowModal(false)} {...props} />
      ) : null}
    </>
  )
}
