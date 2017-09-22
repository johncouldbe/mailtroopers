import {REGISTER_ERR, LOGIN_ERR} from '../actions/user'

const initialState = {
  regErr: null,
  logErr: null
}

export const userReducer = (state=initialState, action) => {
  if(action.type === REGISTER_ERR){
    return Object.assign({}, state, {
      regErr: action.err
    })
  }
  if(action.type === LOGIN_ERR){
    return Object.assign({}, state, {
      logErr: action.err
    })
  }
  return state
}
