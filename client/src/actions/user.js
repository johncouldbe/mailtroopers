import axios from 'axios'
import {BASE_URL} from '../config'

export const registerUser = user => dispatch => {
  axios.post(`${BASE_URL}/user/register`, {
    user
  })
  .then(res => console.log(res.data))
}
