import React, {Component} from 'react'
import {connect} from 'react-redux'

import Comments from './comments/Comments'
import Troop from './troop/Troop'

import {toggleTeam, toggleComments} from '../../actions'

import './RightSidebar.css'

export class RightSidebar extends Component {

  hidePanels() {
    if(!this.props.teamOpen && this.props.commentsOpen){
      console.log('closing team')
      return 'right-sidebar close-team'
    }
    if(this.props.teamOpen && !this.props.commentsOpen){
      console.log('closing comments')
      return 'right-sidebar close-comments'
    }
    if(!this.props.teamOpen && !this.props.commentsOpen){
      console.log('closing both')
      return 'right-sidebar close-team-and-comments'
    }
    return 'right-sidebar'
  }

  render(){
    return (
      <div className={this.hidePanels()}>
        <div className="team-header">
          <div
            className="toggle-team-show-btn"
            onClick={() => {this.props.dispatch(toggleTeam)}}>
          </div>
          <div className="blue-text h2 center-text">Troop</div>
          <div className="faded-border"></div>
        </div>

        <Troop />

        <div className="comments-header">
          <div
            className="toggle-comments-show-btn"
            onClick={() => {this.props.dispatch(toggleComments)}}>
          </div>
          <div className="blue-text h2 center-text">Comments</div>
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
