import axios from 'axios'
import {BASE_URL} from '../config'

export const CREATE_EMAIL_ERR = 'CREATE_EMAIL_ERR'
export const createEmailErr = err => ({
  type: CREATE_EMAIL_ERR,
  err
})

export const createEmail = email => dispatch => {
  return axios.post(`${BASE_URL}/campaigns/new`, {
    campaign: email
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    const error = 'Ermm. This is embarrassing but something went wrong...'
    dispatch(createEmailErr(error))
  })
}
