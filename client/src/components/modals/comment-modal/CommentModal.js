import React, {Component} from 'react'
import {connect} from 'react-redux'

import {toggleCommentModal} from '../../../actions/modal'
import {sendComment} from '../../../actions/email'

import './CommentModal.css'
import thumbsUp from '../../images/thumbs-up.svg'

export class CommentModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      sent: false,
      text: '',
      warning: false
    }
  }

  handleChange = (e) => {
    const text = e.target.value
    this.setState({
      text: text
    })
  }

  hideCommentModal = (e) => {
    e.preventDefault()
    this.props.dispatch(toggleCommentModal)
  }

  send = (comment) => {
    if(this.state.text.trim() !== ''){
      const version = this.props.currentVersion - 1
      const campaignId = this.props.selectedCampaign._id
      const userId = this.props.currentUser._id
      const socket = this.props.socket

      this.props.dispatch(sendComment(campaignId, version, userId, comment, socket))

      this.setState({
        sent: true
      })
    } else {
      this.setState({
        warning: true
      })
    }
  }

  render(){
    const warning = this.state.warning
      ? <div
          className="center-text p grey-text"
          style={{margin: '10px 0'}}
        >
          Please enter a comment in the comment field.
        </div>
      :
      ''

    return(
      <div className="modal-window" onClick={this.hideCommentModal}>
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <div className="modal-close" onClick={this.hideCommentModal}></div>
          { !this.state.sent
          ?
          <div>
            <div className="h3 grey-text center-text">Type your comment below</div>
            <textarea
              className="comment-input-container p grey-text"
              type="text"
              id="comment-input"
              onChange={this.handleChange}
            />

            <div className="btn-container">
              <button className="btn" onClick={() => this.send(this.state.text)}>Comment <img src={require("../../images/bullhorn.svg")}   alt="Share" /></button>
            </div>
            {warning}
          </div>
          :
          <div>
            <div className="h3 grey-text center-text">Your comment has been posted!</div>
            <div className="comment-posted">
              <img src={thumbsUp} alt="Comment Posted!" />
            </div>
          </div>
          }
        </div>
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

export default connect(mapStateToProps)(CommentModal)
