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
  socket.on('connect', () => {
    socket
    .emit('authenticate', {token: authToken})
    .on('authenticated', () => {
      dispatch(connectSocket(socket))
    })
    .on('campaign added', campaign => {
      dispatch(addNewCampaign(campaign))
      dispatch(toggleCreateEmailModal)
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
    .on('unauthorized', () => {
      dispatch(connectSocket(null))
    })
  })
}
