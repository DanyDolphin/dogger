import { Formik } from 'formik'
import React from 'react'
import { Button, Input } from '../../components'
import Select from '../../components/select'
import dogFormValidation from '../../validationSchemas/dog-form'

const initialValues = {
    name: '',
    age: '',
    size: '',
}

const sizeOptions = [
    {value: 'chico', label: 'Chico'},
    {value: 'mediano', label: 'Mediano'},
    {value: 'grande', label: 'Grande'},
]

const DogForm = ({ dog }) => {

    const handleSubmit = () => {

    }

    return (
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
    )
}

export default DogForm