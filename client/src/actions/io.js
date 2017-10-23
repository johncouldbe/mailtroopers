import io from 'socket.io-client'
import store from '../store';

import {toggleCreateEmailModal} from './modal'
import {addNewCampaign,removeCampaign, selectCampaign, updateCampaign, recruited} from './email'

import {SOCKET_URL} from '../config'

export const CONNECT_SOCKET = 'CONNECT_SOCKET'
export const connectSocket = socket => ({
  type: CONNECT_SOCKET,
  socket
})

export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET'
export const disconnectSocket = () => ({
  type: DISCONNECT_SOCKET
})

const socket = io.connect(SOCKET_URL)

export const hookInSocket = authToken => dispatch => {
  socket.emit('authenticate', {authToken})

  dispatch(connectSocket(socket))

  socket.on('campaign added', campaign => {
    dispatch(addNewCampaign(campaign))
    dispatch(toggleCreateEmailModal)
  })

  socket.on('campaign deleted', campaign => {
    dispatch(removeCampaign(campaign))
    if(!store.email.selectedCampaign) return
    if(campaign._id === this.props.selectedCampaign._id){
      dispatch(selectCampaign(null))
    }
  })

  socket.on('update campaign', campaign => {
    dispatch(updateCampaign(campaign))
  })

  socket.on('recruited', recruits => {
    dispatch(recruited(recruits))
  })
}

export const unauthorizedSocket = () => dispatch => {
  socket.on('unauthorized', () => {
    dispatch(connectSocket(null))
  })
}
