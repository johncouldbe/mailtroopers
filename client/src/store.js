import {applyMiddleware, createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'
import io from 'socket.io-client'

import {loadAuthToken} from './local-storage'
import {setAuthToken} from './actions/user'
import {connectSocket} from './actions/io'

import {SOCKET_URL} from './config'

import {mailTrooperReducer} from './reducers'
import {modalReducer} from './reducers/modal'
import {userReducer} from './reducers/user'
import {emailReducer} from './reducers/email'
import {ioReducer} from './reducers/io'

const store = (
  createStore(combineReducers({
    mailTrooper: mailTrooperReducer,
    modal: modalReducer,
    user: userReducer,
    email: emailReducer,
    form: formReducer,
    io: ioReducer
  }),
  applyMiddleware(thunk))
)



const authToken = loadAuthToken()
if (authToken) {
    const token = authToken
    store.dispatch(setAuthToken(token))

    const socket = io.connect(SOCKET_URL)
    store.dispatch(connectSocket(socket))
}

export default store
