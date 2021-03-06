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
    console.log(err)
  })
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

export const deleteCampaign = (campaign, socket) => dispatch => {
  return socket.emit('delete campaign', campaign)
}

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

export const UPDATE_CURRENT_VERSION = 'UPDATE_CURRENT_VERSION'
export const updateCurrentVersion = version => ({
  type: UPDATE_CURRENT_VERSION,
  version
})

export const sendComment = (campaignId, version, userId, comment, socket) => dispatch => {
  return socket.emit('add comment', {
    campaignId,
    version,
    userId,
    comment
  })
}

export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'
export const updateCampaign = campaign => ({
  type: UPDATE_CAMPAIGN,
  campaign
})

export const deleteComment = (campaignId, version, commentId, socket) => dispatch => {
  return socket.emit('delete comment', {
    campaignId,
    version,
    commentId
  })
}

export const recruit = (addresses, id, socket) => dispatch => {
  return socket.emit('recruit', {
    addresses,
    id
  })
}

export const RECRUITED = 'RECRUITED'
export const recruited = (recruits) => ({
  type: RECRUITED,
  recruits
})

export const CLEAR_RECRUIT_MSGS = 'CLEAR_RECRUIT_MSGS'
export const clearRecruitMsgs = ({
  type: CLEAR_RECRUIT_MSGS,
})


export const removeRecruit = (recruit, campaignId, socket) => dispatch => {
  return socket.emit('remove recruit', {recruit, campaignId})
}

export const deleteVersion = (version, campaignId, socket) => dispatch => {
  return socket.emit('delete version', {version, campaignId})
}
