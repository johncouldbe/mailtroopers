import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleCommentModal} from '../../../actions'
// import {BrowserRouter as Link} from 'react-router-dom'

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

  send = (id) => {
    if(this.state.text.trim() !== ''){
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
        <div onClick={(e) => e.stopPropagation()} className="recruit-modal">
          <div className="comment-modal-close" onClick={this.hideCommentModal}></div>
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

            <div className="comment-btn-container">
              <button className="comment-btn" onClick={this.send}>Comment <img src={require("../../images/bullhorn.svg")}   alt="Share" /></button>
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

export default connect()(CommentModal)
