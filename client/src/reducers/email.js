import * as  actions from '../actions/email'

const initialState = {
  createEmailErr: null,
  emails: null,
  selectedCampaign: null
}

export const emailReducer = (state=initialState, action) => {
  if (action.type === actions.CREATE_EMAIL_ERR) {
    return Object.assign({}, state, {createEmailErr: action.err})
  }
  else if (action.type === actions.STORE_EMAILS) {
    return Object.assign({}, state, {emails: action.emails})
  }
  else if (action.type === actions.ADD_NEW_CAMPAIGN) {
    return Object.assign({}, state, {emails: [action.campaign, ...state.emails]})
  }
  else if (action.type === actions.REMOVE_CAMPAIGN) {
    return Object.assign({}, state, {
      emails: state.emails.filter(email => email._id !== action.campaign._id)
    })
  }
  else if(action.type === actions.SELECT_CAMPAIGN) {
    return Object.assign({}, state, {selectedCampaign: action.campaign})
  }

  return state
}
