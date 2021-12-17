import styled from 'styled-components'

export const ModalBackLayer = styled.div`
    background-color: rgba(0,0,0,0.4);
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: ${({show}) => show ? 'block' : 'none'};
`

export const ModalContainer = styled.div`
    background-color: white;
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 24px;
    transform: translate(-50%, -50%);
`

export const ModalTitle = styled.h2`
    font-size: 1.75rem;
    margin-bottom: 24px
`