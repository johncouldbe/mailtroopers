import axios from 'axios'
import {BASE_URL} from '../config'

export const CREATE_EMAIL_ERR = 'CREATE_EMAIL_ERR'
export const createEmailErr = err => ({
  type: CREATE_EMAIL_ERR,
  err
})

export const createNewCampaign = (campaign, user, socket) => dispatch => {
  return socket.emit('add campaign', {campaign, user})
}

export const getCampaigns = id => dispatch => {
  return axios.get(`${BASE_URL}/campaigns/${id}`)
  .then(emails => {
    dispatch(storeEmails(emails.data))
  })
  .catch(err => {
    console.log(err);
  })
}

export const deleteCampaign = (campaign, socket) => dispatch => {
  return socket.emit('delete campaign', campaign)
}

export const ADD_NEW_CAMPAIGN = 'ADD_NEW_CAMPAIGN'
export const addNewCampaign = campaign => ({
  type: ADD_NEW_CAMPAIGN,
  campaign
})

export const STORE_EMAILS = 'STORE_EMAILS'
export const storeEmails = emails => ({
  type: STORE_EMAILS,
  emails
})

export const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN'
export const removeCampaign = campaign => ({
  type: REMOVE_CAMPAIGN,
  campaign
})

export const SELECT_CAMPAIGN = 'SELECT_CAMPAIGN'
export const selectCampaign = campaign => ({
  type: SELECT_CAMPAIGN,
  campaign
})
//
// export const getSelectedCampaign = id => dispatch => {
//   return axios.get(`${BASE_URL}/campaigns/selected/${id}`)
//   .then(email => {
//     console.log('EMAIL', email)
//     dispatch(selectCampaign(email.data))
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }
