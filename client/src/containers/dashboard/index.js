import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from '../../components'
import Modal from '../../components/modal'
import { Title } from '../../components/navbar/styled'
import dogsService from '../../services/dogs-service'
import { Toast } from '../../utils/sweetalert-mixins'
import DogForm from '../dog-form'
import { Container, Section, SectionListItem, SectionListItemImage, SectionListItemText, SectionTitle, Text } from './styled'

import pixel from '../../assets/img/png/pixel.png'

const Dashboard = ({ token }) => {

    const [dogs, setDogs] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dogsService.getDogs(token)
            .then(res => setDogs(res.data))
    }, [])

    console.log(dogs)

    const handleDogSaved = dog => {
        setDogs([...dogs, dog])
        setShowForm(false)
        Toast.fire('', 'Lomito guardado con éxito', 'success')
    }

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
                {dogs.length === 0 ?
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
                    :
                    <SectionTitle column shrinked>
                        <Text>
                            Photo / Name / Breed / Age
                        </Text>
                        {dogs.map(dog => (
                            <SectionListItem>
                                <SectionListItemImage src={pixel} alt={dog.name}/>
                                <SectionListItemText>
                                    {dog.name}
                                </SectionListItemText>
                                <SectionListItemText>
                                    NA
                                </SectionListItemText>
                                <SectionListItemText>
                                    {dog.size.size}
                                </SectionListItemText>
                            </SectionListItem>
                        ))}
                        <Button
                            onPress={e => setShowForm(true)}
                        >
                            Add
                        </Button>
                    </SectionTitle>
                }
            </Section>
        </Container>
        <Modal
            show={showForm}
            onHide={e => setShowForm(false)}
        >
            <DogForm
                onSave={handleDogSaved}
            />
        </Modal>
    </>
}

const mapStateToProps = ({ account }) => ({
    token: account.token
})

export default connect(mapStateToProps)(Dashboard)