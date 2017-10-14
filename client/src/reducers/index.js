import * as actions from '../actions'

const initialState = {
  leftSidebarOpen: true,
  rightSidebarOpen: false,
  teamOpen: true,
  commentsOpen: true,
  recruitModal: false,
  commentModal: false,
  createEmailModal: false,
}

export const mailTrooperReducer = (state=initialState, action) => {
  if(action.type === actions.TOGGLE_LEFT_SIDEBAR) {
    return Object.assign({}, state, {leftSidebarOpen: !state.leftSidebarOpen})
  }
  else if(action.type === actions.TOGGLE_RIGHT_SIDEBAR) {
    return Object.assign({}, state, {rightSidebarOpen: !state.rightSidebarOpen})
  }
  else if(action.type === actions.TOGGLE_TEAM) {
    return Object.assign({}, state, {teamOpen: !state.teamOpen})
  }
  else if(action.type === actions.TOGGLE_COMMENTS) {
    return Object.assign({}, state, {commentsOpen: !state.commentsOpen})
  }
  return state
}
