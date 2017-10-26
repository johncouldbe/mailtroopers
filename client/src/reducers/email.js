import * as  actions from '../actions/email'

const initialState = {
  createEmailErr: null,
  emails: null,
  selectedCampaign: null,
  currentVersion: 0,
  recruitFailures: null,
  recruitSuccesses: null
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
  else if(action.type === actions.UPDATE_CURRENT_VERSION) {
    return Object.assign({}, state, {currentVersion: action.version})
  }
  else if(action.type === actions.UPDATE_CAMPAIGN) {
    let returnedMail = action.campaign.email
    console.log(returnedMail);
    return Object.assign({}, state, {
      emails: state.emails.map( email => {
        if(email._id === returnedMail._id){
          email = returnedMail
        }
        return email
      }),
      selectedCampaign: returnedMail,
      currentVersion: returnedMail.versions.length
    })
  }
  else if(action.type === actions.RECRUITED) {
    return Object.assign({}, state, {
      recruitFailures: action.recruits.failures,
      recruitSuccesses: action.recruits.successful
    })
  }
  else if(action.type === actions.CLEAR_RECRUIT_MSGS) {
    return Object.assign({}, state, {
      recruitFailures: null,
      recruitSuccesses: null
    })
  }

  return state
}
