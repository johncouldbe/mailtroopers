import React, {Component} from 'react'
import {connect} from 'react-redux'

import Comments from './comments/Comments'
import Troop from './troop/Troop'

import {toggleTeam, toggleComments} from '../../actions'

import './RightSidebar.css'

export class RightSidebar extends Component {

  hidePanels() {
    if(!this.props.teamOpen && this.props.commentsOpen){
      return 'right-sidebar close-team'
    }
    if(this.props.teamOpen && !this.props.commentsOpen){
      return 'right-sidebar close-comments'
    }
    if(!this.props.teamOpen && !this.props.commentsOpen){
      return 'right-sidebar close-team-and-comments'
    }
    return 'right-sidebar'
  }

  buttonDirection(e){
    if(e === 'team'){
      if(this.props.teamOpen) {
        return 'toggle-team-show-btn'
      } else {
        return 'toggle-team-show-btn toggle-team-hide-btn'
      }
    }
    if(e === 'comments'){
      if(this.props.commentsOpen) {
        return 'toggle-comments-show-btn'
      } else {
        return 'toggle-comments-show-btn toggle-comments-hide-btn'
      }
    }
  }

  render(){
    return (
      <div className={this.hidePanels()}>
        <div className="team-header">
          <div
            className={this.buttonDirection('team')}
            onClick={() => {this.props.dispatch(toggleTeam)}}>
          </div>
          <div className="grey-text h2 center-text">Troop</div>
          <div className="faded-border"></div>
        </div>

        <Troop />

        <div className="comments-header">
          <div
            className={this.buttonDirection('comments')}
            onClick={() => {this.props.dispatch(toggleComments)}}>
          </div>
          <div className="grey-text h2 center-text">Comments</div>
          <div className="faded-border"></div>
        </div>

        <Comments />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  teamOpen: state.teamOpen,
  commentsOpen: state.commentsOpen
})

export default connect(mapStateToProps)(RightSidebar);
