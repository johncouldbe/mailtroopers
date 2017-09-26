import {
  REGISTER_ERR,
  LOGIN_ERR,
  SET_AUTH_TOKEN,
  SET_CURRENT_USER
  } from '../actions/user'

const initialState = {
  regErr: null,
  logErr: null,
  authToken: null,
  currentUser: null
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
  if (action.type === SET_AUTH_TOKEN) {
    console.log('setting auth token');
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === SET_CURRENT_USER) {
      console.log('setting current user', action.currentUser);
        return Object.assign({}, state, {
            currentUser: action.currentUser
        });
    }
  return state
}
