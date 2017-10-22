import {applyMiddleware, createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'
import io from 'socket.io-client'

import {loadAuthToken} from './local-storage'
import {setAuthToken} from './actions/user'
import {connectSocket} from './actions/io'
import {toggleCreateEmailModal} from './actions/modal'
import {addNewCampaign,removeCampaign, selectCampaign, updateCampaign, recruited} from './actions/email'

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
    socket.emit('authenticate', {token})

    store.dispatch(connectSocket(socket))

    socket.on('unauthorized', () => {
      store.dispatch(connectSocket(null))
    })

    socket.on('campaign added', campaign => {
      store.dispatch(addNewCampaign(campaign))
      store.dispatch(toggleCreateEmailModal)
    })

    socket.on('campaign deleted', campaign => {
      store.dispatch(removeCampaign(campaign))
      if(!store.selectedCampaign) return
      if(campaign._id === this.props.selectedCampaign._id){
        store.dispatch(selectCampaign(null))
      }
    })

    socket.on('update campaign', campaign => {
      store.dispatch(updateCampaign(campaign))
    })

    socket.on('recruited', recruits => {
      store.dispatch(recruited(recruits))
    })

}

export default store
