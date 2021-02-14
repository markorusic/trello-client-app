import React, { useState } from 'react'
import { Button, ButtonProps } from './button'
import { Modal, ModalProps } from './modal'

export interface ButtonModalProps extends Omit<ModalProps, 'onClose'> {
  buttonProps?: ButtonProps
}

export const ButtonModal: React.FC<ButtonModalProps> = ({
  buttonProps = {},
  ...props
}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onClick={() => setShowModal(true)} {...buttonProps}>
        {buttonProps.children ?? props.title}
      </Button>
      {showModal ? (
        <Modal onClose={() => setShowModal(false)} {...props} />
      ) : null}
    </>
  )
}
