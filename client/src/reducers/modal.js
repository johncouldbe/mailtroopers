import * as actions from '../actions/modal'

const initialState = {
  recruitModal: false,
  commentModal: false,
  createEmailModal: false,
  copiedModal: false,
}

export const modalReducer = (state=initialState, action) => {
  if(action.type === actions.TOGGLE_RECRUIT_MODAL) {
    return Object.assign({}, state, {recruitModal: !state.recruitModal})
  }
  else if(action.type === actions.TOGGLE_COMMENT_MODAL) {
    return Object.assign({}, state, {commentModal: !state.commentModal})
  }
  else if(action.type === actions.TOGGLE_CREATE_EMAIL_MODAL) {
    return Object.assign({}, state, {createEmailModal: !state.createEmailModal})
  }
  else if(action.type === actions.TOGGLE_COPIED_MODAL) {
    return Object.assign({}, state, {copiedModal: !state.copiedModal})
  }
  return state
}
