import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button } from '../../components'
import Modal from '../../components/modal'
import { Title } from '../../components/navbar/styled'
import DogForm from '../dog-form'
import { Container, Section, SectionTitle, Text } from './styled'

const Dashboard = () => {

    const [dogs, setDogs] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        
    }, [])

    return <>
        <Container>
            <Title>Schedule</Title>
            <Section>
                <SectionTitle>
                    S / M / T / W / T / F / S
                </SectionTitle>
            </Section>
            <Title>My Dogs</Title>
            <Section>
                <SectionTitle column>
                    <Text>
                        No dogs yet
                    </Text>
                    <Button
                        onPress={e => setShowForm(true)}
                    >
                        Add
                    </Button>
                </SectionTitle>
            </Section>
        </Container>
        <Modal 
            show={showForm} 
            onHide={e => setShowForm(false)}
        >
            <DogForm/>
        </Modal>
    </>
}

export default Dashboard