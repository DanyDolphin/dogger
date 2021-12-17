import { Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Button, Input } from '../../components'
import Select from '../../components/select'
import dogsService from '../../services/dogs-service'
import { handleAxiosErrors } from '../../utils/ajax'
import { Toast } from '../../utils/sweetalert-mixins'
import dogFormValidation from '../../validationSchemas/dog-form'
import { Container } from '../logup/styled'

const initialValues = {
    name: '',
    age: '',
    size: '',
}

const sizeOptions = [
    { value: 'chico', label: 'Chico' },
    { value: 'mediano', label: 'Mediano' },
    { value: 'grande', label: 'Grande' },
]

const DogForm = ({ dog, token, onSave }) => {

    const handleSubmit = async data => {
        try {
            const response = await dogsService.createDog(data, token)
            onSave(response.data)
        } catch (err) {
            handleAxiosErrors(err)
            Toast.fire('Error en el servidor', 'inténtalo más tarde')
        }
        
    }

    return (
        <Container>
            <Formik
                initialValues={dog || initialValues}
                validationSchema={dogFormValidation}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    isSubmitting,
                    isValid
                }) => (
                    <>
                        <Input
                            error={errors.name}
                            label='Nombre'
                            name='name'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                        />
                        <Input
                            error={errors.age}
                            label='Edad'
                            name='age'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.age}
                        />
                        <Select
                            error={errors.size}
                            label='Tamaño'
                            name='size'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.size}
                            options={sizeOptions}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}
                            wide
                        >
                            Entrar
                        </Button>
                    </>
                )}
            </Formik>
        </Container>
    )
}

const mapStateToProps = ({account}) => ({
    token: account.token
})

export default connect(mapStateToProps)(DogForm)