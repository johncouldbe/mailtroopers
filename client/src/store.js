import {applyMiddleware, createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'

import {mailTrooperReducer} from './reducers'
import {userReducer} from './reducers/user'

export default createStore(combineReducers({
  mailTrooper: mailTrooperReducer,
  user: userReducer,
  form: formReducer
}),
applyMiddleware(thunk))
