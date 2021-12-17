import axios from 'axios'
import { API_BASE, authenticatedOptions } from '../utils/ajax'

const getDogs = (token) => 
    axios.get(API_BASE + '/users/dogs/', authenticatedOptions(token))

const createDog = (dog, token) => 
    axios.post(API_BASE + '/dogs/', dog, authenticatedOptions(token))

export default {
    getDogs,
    createDog
}