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

  deleteComment(campaignId, version, commentId, socket){
    if(window.confirm('Are you sure you want to delete this comment?')){
      this.props.dispatch(deleteComment(campaignId, version, commentId, socket))
    }
  }

  comments() {
    if(this.props.selectedCampaign &&
    this.props.selectedCampaign.versions.length){
      const comments = this.props.selectedCampaign.versions[this.props.currentVersion - 1].comments
      const version = this.props.selectedCampaign.versions[this.props.currentVersion - 1]._id
      const campaignId = this.props.selectedCampaign._id
      const socket = this.props.socket

      return comments.map((comment, index) => {

        const formattedComment = comment.comment.split('\n').map(function(item, key) {
          return (
            <span key={key}>
            {item}
            <br/>
            </span>
          )
        })

        const deleteBtn = comment.user._id === this.props.currentUser._id
          ? <div className="delete-comment"
            onClick={() => { this.deleteComment(campaignId, version, comment._id,  socket)}}
          ></div>
          : ''

        return <div className="comment" key={index}>
          <div className="comment-container">
            {deleteBtn}
            <div className="h3 red-text comment-name">{comment.user.firstName} {comment.user.lastName}</div>
            <div className="h4 grey-text comment-date">{moment(comment.date).fromNow()}</div>
            <div className="p grey-text comment-comment">{formattedComment}</div>
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
