import {CONNECT_SOCKET} from '../actions/io'

const initialState = {
  socket: null
}

export const ioReducer = (state=initialState, action) => {
  if(action.type === CONNECT_SOCKET){
    return Object.assign({}, state, {
      socket: action.socket
    })
  }
  return state
}
