import {applyMiddleware, createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'

import {loadAuthToken} from './local-storage'
import {setAuthToken} from './actions/user'

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
  }), applyMiddleware(thunk))
)



const authToken = loadAuthToken()

if (authToken) {
  store.dispatch(setAuthToken(authToken))
}

export default store
