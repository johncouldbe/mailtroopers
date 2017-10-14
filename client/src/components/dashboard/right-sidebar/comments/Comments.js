import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {toggleCommentModal} from '../../../../actions/modal'
// import {BrowserRouter as Link} from 'react-router-dom'

import './Comments.css'

export class Comments extends Component {
  constructor(props){
    super(props)

    this.showCommentModal = this.showCommentModal.bind(this)
  }

  comments() {
    if(this.props.selectedCampaign &&
    this.props.selectedCampaign.versions.length){
      const arr = this.props.selectedCampaign.versions[this.props.currentVersion -1].comments

      return arr.map((comment, index) => {
        return <div className="comment" key={index}>
          <div className="comment-container">
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
  currentVersion: state.email.currentVersion
})

export default connect(mapStateToProps)(Comments)
