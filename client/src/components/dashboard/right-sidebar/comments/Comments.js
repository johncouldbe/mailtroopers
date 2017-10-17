import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {toggleCommentModal} from '../../../../actions/modal'
import {deleteComment} from '../../../../actions/email'
// import {BrowserRouter as Link} from 'react-router-dom'

import './Comments.css'

export class Comments extends Component {
  constructor(props){
    super(props)

    this.showCommentModal = this.showCommentModal.bind(this)
  }

  deleteComment(id, socket){
    this.props.dispatch(deleteComment(id, socket))
  }

  comments() {
    if(this.props.selectedCampaign &&
    this.props.selectedCampaign.versions.length > 0){
      const comments = this.props.selectedCampaign.versions[this.props.currentVersion - 1].comments

      return comments.map((comment, index) => {
        const deleteBtn = comment.user._id === this.props.currentUser._id
          ? <div className="delete-comment"
            onClick={this.deleteComment(comment._id, this.props.socket)}
          ></div>
          : ''

        return <div className="comment" key={index}>
          <div className="comment-container">
            {deleteBtn}
            <div className="h3 red-text comment-name">{comment.user.firstName} {comment.user.lastName}</div>
            <div className="h4 grey-text comment-date">{moment(comment.date).fromNow()}</div>
            <div className="p grey-text comment-comment">{comment.comment}</div>
          </div>
        </div>
      })
    }
  }

  commentBtn() {
    if(this.props.selectedCampaign &&
      this.props.selectedCampaign.versions.length){
        return <div className="btn-container">
          <button className="btn" onClick={this.showCommentModal}>
            Comment &nbsp;
            <img src={require("../../../images/bullhorn.svg")} alt="Share" />
          </button>
        </div>
    }
  }

  showCommentModal(e){
    e.preventDefault()
    this.props.dispatch(toggleCommentModal)
  }

  render(){
    return(
      <div className="comments">
        {this.commentBtn()}
        {this.comments()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.email.selectedCampaign,
  currentVersion: state.email.currentVersion,
  currentUser: state.user.currentUser,
  socket: state.io.socket
})

export default connect(mapStateToProps)(Comments)
