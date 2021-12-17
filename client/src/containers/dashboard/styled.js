import styled from "styled-components";

export const Container = styled.div`
    padding: 24px 5%;
`

export const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 16px;
`

export const Section = styled.section`
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    margin-bottom: 32px;
`

export const Text = styled.p`
    margin-bottom: 16px;
`

export const SectionTitle = styled.div`
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    flex-direction: ${({column}) => column ? 'column' : 'row'};
    width: ${({shrinked}) => shrinked ? 'auto' : '100%'}
`

export const SectionListItem = styled.div`
    display: flex;
    align-self: start;
    align-items: center;
    padding: 0 24px;
    margin-bottom: 16px;
`

export const SectionListItemImage = styled.img`
    height: 48px;
    width: 48px;
    object-fit: cover;
    margin-right: 16px
`

export const SectionListItemText = styled.p`
    margin-right: 16px;
    display: inline-block;
    &:last-child {
        margin-right: 0;
    }
`