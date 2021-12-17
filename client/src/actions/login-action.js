export const LOG_IN = 'LOG_IN'

export default (user, token) => ({
    type: LOG_IN,
    payload: {
        user, 
        token, 
        isLogged: true
    },
})