import {applyMiddleware, createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'

import {loadAuthToken} from './local-storage'
import {setAuthToken} from './actions/user'

import {mailTrooperReducer} from './reducers'
import {userReducer} from './reducers/user'

const store = (
  createStore(combineReducers({
    mailTrooper: mailTrooperReducer,
    user: userReducer,
    form: formReducer
  }),
  applyMiddleware(thunk))
)

const authToken = loadAuthToken();
console.log(authToken);
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
}

export default store
