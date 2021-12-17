import * as Yup from 'yup'

const logUpValidation = Yup.object().shape({
  email: Yup.string()
    .email('Correo invalido')
    .required('Campo requerido'),
  password: Yup.string()
    .matches(/[a-z]/g, 'Debe tener al menos una minúscula') 
    .matches(/[A-Z]/g, 'Debe tener al menos una mayúscula')
    .matches(/[0-9]/g, 'Debe tener al menos un número')
    .matches(/[^a-zA-Z\d]/g, 'Debe tener al menos un caracter especial')
    .min(8, 'Debe tener mínimo 8 caracteres')
    .required('Campo requerido'),
  first_name: Yup.string()
    .max(50, 'El nombre es demasiado largo')
    .required('Campo requerido'),
  last_name: Yup.string()
    .max(50, 'El apellido es demasiado largo')
    .required('Campo requerido'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/g, 'Debe tener diez digitos')
    .required('Campo requerido'),
  address: Yup.string()
    .required('Campo requerido'),
  confirmPassword: Yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "No coincide"
    )})
})

export default logUpValidation