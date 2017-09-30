import * as  actions from '../actions/email'

const initialState = {
  createEmailErr: null
}

export const emailReducer = (state=initialState, action) => {
  if (action.type === actions.CREATE_EMAIL_ERR) {
    return Object.assign({}, state, {createEmailErr: action.err})
  }

  return state
}
