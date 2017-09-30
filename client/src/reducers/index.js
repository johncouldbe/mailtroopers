import * as actions from '../actions'

const initialState = {
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  teamOpen: true,
  commentsOpen: true,
  recruitModal: false,
  commentModal: false,
  createEmailModal: false
}

export const mailTrooperReducer = (state=initialState, action) => {
  if(action.type === actions.TOGGLE_LEFT_SIDEBAR) {
    return Object.assign({}, state, {leftSidebarOpen: !state.leftSidebarOpen})
  }
  if(action.type === actions.TOGGLE_RIGHT_SIDEBAR) {
    return Object.assign({}, state, {rightSidebarOpen: !state.rightSidebarOpen})
  }
  if(action.type === actions.TOGGLE_TEAM) {
    return Object.assign({}, state, {teamOpen: !state.teamOpen})
  }
  if(action.type === actions.TOGGLE_COMMENTS) {
    return Object.assign({}, state, {commentsOpen: !state.commentsOpen})
  }
  if(action.type === actions.TOGGLE_RECRUIT_MODAL) {
    return Object.assign({}, state, {recruitModal: !state.recruitModal})
  }
  if(action.type === actions.TOGGLE_COMMENT_MODAL) {
    return Object.assign({}, state, {commentModal: !state.commentModal})
  }
  if(action.type === actions.TOGGLE_CREATE_EMAIL_MODAL) {
    return Object.assign({}, state, {createEmailModal: !state.createEmailModal})
  }
  return state
}
