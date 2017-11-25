import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Clipboard from 'clipboard'

import {deleteCampaign, removeRecruit, selectCampaign, updateCurrentVersion} from '../../../actions/email'
import {toggleCreateEmailModal} from '../../../actions/modal'
import {toggleReview} from '../../../actions'

import './LeftSidebar.css'

new Clipboard('.clipboard');

export class LeftSidebar extends Component {
  showModal = e => {
    e.preventDefault()
    this.props.dispatch(toggleCreateEmailModal)
  }

  deleteEmail = (campaign, socket) => {
    if(window.confirm('Are you sure you want to delete this campaign?')){
      this.props.dispatch(deleteCampaign(campaign, socket))
    }
  }

  removeEmail = (recruit, campaignId, socket) => {
    this.props.dispatch(removeRecruit(recruit, campaignId, socket))
  }

  emailFile = (email) => {
    const selectedCampaign = this.props.selectedCampaign
    let classes = 'email-file'
    const leftBorder = email.master === this.props.currentUser._id
    ? ' red-left' : ' yellow-left'

    classes += leftBorder

    if(!selectedCampaign || email._id !== selectedCampaign._id) return classes
    if(email._id === selectedCampaign._id) {
      return classes += ' selected-shadow'
    }
  }

  emails = () => {
    if(this.props.emails){
      return this.props.emails.map((email, index) => {
        const master = email.master === this.props.currentUser._id
        ? <span>
          <span className="clipboard"
            data-clipboard-text={`${email.slug}@mailtroopers.com`}
            onClick={alert('Hey!')}
        >
          Get Link
        </span> |
        <span className="red-text" onClick={() => this.deleteEmail(email._id, this.props.socket)}>
          &nbsp;Delete
        </span>
        </span>
        : <span
          className="red-text"
          onClick={() => {
            this.removeEmail(this.props.currentUser._id, email._id, this.props.socket)}}
          >
           Remove
          </span>


        return (
        <div
          className={this.emailFile(email)}
          key={index}
          onMouseOver={ e => {
            e.currentTarget.lastChild.className = "shown-email-options"
          }}
          onMouseLeave={e => {
            e.currentTarget.lastChild.className = "hidden-email-options"
          }}
          onClick={() => {
            this.props.dispatch(selectCampaign(email))
            this.props.dispatch(updateCurrentVersion(email.versions.length))
          }}
        >
          <div className="h4 grey-text comment-date">{email.name}</div>
          <div className="p grey-text comment-comment">
            {moment(email.date).format('MM/DD/YYYY')}
          </div>
          <div className="hidden-email-options" onClick={e => e.stopPropagation()}>
            <div className="p grey-text right-text">
              {master}
            </div>
          </div>
        </div>
        )
      })
    }
  }

  buttonDirection = () => {
    if(this.props.reviewOpen) {
        return 'toggle-review-show-btn'
    } else {
        return 'toggle-review-show-btn toggle-review-hide-btn'
      }
  }

  hidePanels = () => {
    if(!this.props.reviewOpen){
      return 'left-sidebar close-review'
    }
    return 'left-sidebar'
  }

  render() {
    return (
        <div className={this.hidePanels()}>
          <div className="review-header">
            <div
              className={this.buttonDirection()}
              onClick={() => {this.props.dispatch(toggleReview)}}>
            </div>
            <div className="h2 grey-text center-text">Reviews</div>
          </div>

          <div className="email-list-container">
            <div className="btn-container">
              <button
                className="btn campaign-btn"
                onClick={e => this.showModal(e)}>
                New Campaign  <img src={require("../../images/bomb.svg")} alt="New Campaign" />
              </button>
            </div>
            <div style={{marginLeft: 'calc(50% - 87.5px)'}}>
              <div className="circle-red"></div>
              <span className="p grey-text" style={{float: 'left', marginTop: '5px'}}>Yours</span>
              <div className="circle-yellow"></div>
              <span className="p grey-text" style={{lineHeight: '25px'}}>Theirs</span>
            </div>
            {this.emails()}
          </div>
        </div>
    )
  }

}

const mapStateToProps = state => ({
  emails: state.email.emails,
  socket: state.io.socket,
  currentVersion: state.email.currentVersion,
  reviewOpen: state.mailTrooper.reviewOpen,
  currentUser: state.user.currentUser,
  selectedCampaign: state.email.selectedCampaign
})

export default connect(mapStateToProps)(LeftSidebar)
