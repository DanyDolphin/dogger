import React from 'react'
import { Formik } from 'formik'
import {
  Button,
  Input
} from '../../components'
import { logUpValidation } from '../../validationSchemas'
import {
  Container,
  Title
} from './styled'
import axios from 'axios'
import { API_BASE, handleAxiosErrors } from '../../utils/ajax'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { Toast } from '../../utils/sweetalert-mixins'

const initialValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone: '',
  address: '',
  confirmPassword: ''
}

const LogUp = () => {

  const history = useHistory()

  const handleSubmit = async data => {
    try {
      await axios.post(API_BASE + '/users/signup/', data)
      Swal.fire('Usuario creado', 'Ya puedes iniciar sesión con tu nuevo usuario', 'success')
      history.push('/log-in')
    } catch (err) {
      handleAxiosErrors(err)
      Toast.fire('', 'Error del servidor. Inténtalo más tarde', 'error')
    }
  }

  return (
    <Container>
      <Title>Registro</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={logUpValidation}
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
              error={errors.first_name}
              label='Nombre(s)'
              name='first_name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.first_name}
            />
            <Input
              error={errors.last_name}
              label='Apellidos'
              name='last_name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.last_name}
            />
            <Input
              error={errors.email}
              label='Correo'
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              type='email'
              value={values.email}
            />
            <Input
              error={errors.phone}
              label='Teléfono'
              name='phone'
              onBlur={handleBlur}
              onChange={handleChange}
              type='tel'
              value={values.phone}
            />
            <Input
              error={errors.address}
              label='Dirección'
              name='address'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
            />
            <Input
              error={errors.password}
              label='Contraseña'
              name='password'
              onBlur={handleBlur}
              onChange={handleChange}
              type='password'
              value={values.password}
            />
            <Input
              error={errors.confirmPassword}
              label='Confirmar contraseña'
              name='confirmPassword'
              onBlur={handleBlur}
              onChange={handleChange}
              type='password'
              value={values.confirmPassword}
            />
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit}
              wide
            >
              Registrarse
            </Button>
          </>
        )}
      </Formik>
    </Container>
  )
}

export default LogUp