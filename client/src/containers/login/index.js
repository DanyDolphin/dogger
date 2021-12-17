import React from 'react'
import { Formik } from 'formik'
import {
  Button,
  Input
} from '../../components'
import { logInValidation } from '../../validationSchemas'
import {
  Container,
  FormContainer,
  Logo,
  Title
} from './styled'
import { API_BASE, handleAxiosErrors } from '../../utils/ajax'
import axios from 'axios'
import { Toast } from '../../utils/sweetalert-mixins'
import { useDispatch } from 'react-redux'
import loginAction from '../../actions/login-action'
import { useHistory } from 'react-router-dom'

const initialValues = {
  email: '',
  password: ''
}

const LogIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async data => {
    try {
      const response = await axios.post(API_BASE + '/users/login/', data)
      dispatch(loginAction({
        user: response.data.user,
        token: response.data.access_token
      }))
      Toast.fire('', 'Usuario loggeado con éxito', 'success')
      history.push('/')
    } catch (err) {
      handleAxiosErrors(err)
      if (err.response && err.response.status === 404)
        Toast.fire('', 'Usuario o contraseña incorrectos', 'error')
      
      Toast.fire('', 'Error del servidor. Inténtalo más tarde', 'error')
    }
  }

  return (
    <Container>
      <Logo src={require('../../assets/img/png/logo/dogger_logo.png')} alt='Dogger' />
      <FormContainer>
        <Title>Iniciar Sesión</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={logInValidation}
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
                error={errors.email}
                label='Correo'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                type='email'
                value={values.email}
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
      </FormContainer>
    </Container>
  )
}

export default LogIn