import axios from 'axios'
import { API_BASE } from '../utils/ajax'

const getDogs = () => axios.get(API_BASE + '/users/dogs/')