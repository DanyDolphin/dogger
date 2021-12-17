import axios from 'axios'
import { API_BASE } from '../utils/ajax'

const getDogs = () => axios.get(API_BASE + '/users/dogs/')

const createDog = (dog, token) => 
    axios.post(API_BASE + '/dogs/', dog, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })

export default {
    getDogs,
    createDog
}