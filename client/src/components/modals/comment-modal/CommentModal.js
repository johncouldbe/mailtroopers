import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleCommentModal} from '../../../actions'
// import {BrowserRouter as Link} from 'react-router-dom'

import './CommentModal.css'

export class CommentModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      sent: false
    }
  }

  hideCommentModal = (e) => {
    e.preventDefault()
    this.props.dispatch(toggleCommentModal)
  }

  send = (id) => {
    this.setState({
      sent: true
    })
  }

  render(){
    const copied = !this.state.copied
      ? '' : 'Sent!'

    return(
      <div className="recruit-modal-window" onClick={this.hideRecruitModal}>
        <div onClick={(e) => e.stopPropagation()} className="recruit-modal">
          <div className="recruit-modal-close" onClick={this.hideRecruitModal}></div>
          <div className="h3 grey-text center-text">Copy this link and send to your troop!</div>
          <input
            className="link-container p grey-text"
            readOnly
            type="text"
            id="recruit-link"
          />

          <button>Comment</button>

          <div
            className="center-text p grey-text"
            style={{margin: '20px 0'}}
          >
            {copied}
          </div>
        </div>
      </div>
    )
  }

}

export default connect()(CommentModal)
