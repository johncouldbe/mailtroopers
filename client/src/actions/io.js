import io from 'socket.io-client'

import {addNewCampaign,removeCampaign, selectCampaign, updateCampaign, recruited} from './email'
import {SOCKET_URL} from '../config'
import {toggleCreateEmailModal} from './modal'

export const CONNECT_SOCKET = 'CONNECT_SOCKET'
export const connectSocket = socket => ({
  type: CONNECT_SOCKET,
  socket
})

export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET'
export const disconnectSocket = () => ({
  type: DISCONNECT_SOCKET
})

export const hookInSocket = authToken => (dispatch, getState) => {
  const socket = io.connect(SOCKET_URL)
  socket.once('connect', () => {
    socket
    .emit('authenticate', {token: authToken})
    .on('authenticated', () => {
      const campaigns = getState().email.emails
      const userId = getState().user.currentUser._id
      dispatch(connectSocket(socket))

      campaigns.map(room => {
        return socket.emit('room', room._id)
      })
      socket.emit('room', userId)
    })
    .on('campaign added', campaign => {
      const emailModal = getState().modal.createEmailModal
      console.log('campaign added', campaign);
      dispatch(addNewCampaign(campaign))
      if(emailModal) dispatch(toggleCreateEmailModal)
    })
    .on('campaign deleted', campaign => {
      dispatch(removeCampaign(campaign))
      const selectedCampaign = getState().email.selectedCampaign

      if(!selectedCampaign) return
      if(campaign._id === selectedCampaign._id){
        dispatch(selectCampaign(null))
      }
    })
    .on('update campaign', campaign => {
      dispatch(updateCampaign(campaign))
    })
    .on('recruited', recruits => {
      dispatch(recruited(recruits))
    })
    .on('join room', room => {
      console.log('joined room', room);
      socket.emit('room', room)
    })
    .on('unauthorized', () => {
      dispatch(connectSocket(null))
    })
  })
}
