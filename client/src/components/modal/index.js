import React, { useEffect } from 'react'
import { ModalBackLayer, ModalContainer, ModalTitle } from './styled'

const Modal = ({children, title, show, onHide}) => {

    useEffect(() => {
        if (show)
            document.body.style.overflow = 'hidden'
        else 
            document.body.style.overflow = 'auto'
    }, [show])

    return (
        <ModalBackLayer 
            show={show} 
            onClick={onHide}
        >
            <ModalContainer
                onClick={e => e.stopPropagation()}
            >
                {!!title &&
                    <ModalTitle>
                        {title}
                    </ModalTitle>
                }
                {children}
            </ModalContainer>
        </ModalBackLayer>
    )
}

export default Modal