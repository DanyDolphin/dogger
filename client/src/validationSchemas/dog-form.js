import * as Yup from 'yup'

const dogFormValidation = Yup.object().shape({
    name: Yup.string()
        .required('Campo requerido'),
    age: Yup.number()
        .required('Campo requerido'),
    size: Yup.string()
        .required('Campo requerido'),
})

export default dogFormValidation