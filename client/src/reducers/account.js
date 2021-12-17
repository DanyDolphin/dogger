const initialState = {
  isLogged: false
}

const account = (state = initialState, {type, payload}) => {
  switch(type) {
    case 'LOG_IN':
      console.log(payload)
      return {...state, ...payload}
    case 'LOG_OUT':
      return initialState
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default account