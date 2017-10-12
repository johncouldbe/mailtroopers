import React, {Component} from 'react'
import {connect} from 'react-redux'

import {toggleCommentModal} from '../../../../actions/modal'
// import {BrowserRouter as Link} from 'react-router-dom'

import './Comments.css'

export class Comments extends Component {
  constructor(props){
    super(props)
    // this.commentsArray = [
    //   {
    //     name: 'John Brown',
    //     comment: 'I think we should do this nifty thing.',
    //     date: 'A few seconds ago'
    //   }]

    this.showCommentModal = this.showCommentModal.bind(this)
  }

  comments() {

    console.log('VERSIONS', this.props.selectedCampaign.versions);
    console.log('CURRENT', this.props.currentVersion);
    const arr = this.props.selectedCampaign.versions[this.props.currentVersion -1].comments

    return arr.map((comment, index) => {
      return <div className="comment" key={index}>
        <div className="comment-container">
          <div className="h3 red-text comment-name">{comment.name}</div>
          <div className="h4 grey-text comment-date">{comment.date}</div>
          <div className="p grey-text comment-comment">{comment.comment}</div>
        </div>
      </div>
    })
  }

  showCommentModal(e){
    e.preventDefault()
    this.props.dispatch(toggleCommentModal)
  }

  render(){
    return(
      <div className="comments">
        <div className="btn-container">
            <button className="btn" onClick={this.showCommentModal}>Comment <img src={require("../../../images/bullhorn.svg")} alt="Share" /></button>
        </div>
        {this.props.selectedCampaign && this.props.selectedCampaign.versions.length ? this.comments() : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.email.selectedCampaign,
  currentVersion: state.email.currentVersion
})

export default connect(mapStateToProps)(Comments)
