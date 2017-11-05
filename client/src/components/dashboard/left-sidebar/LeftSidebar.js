import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Clipboard from 'clipboard'
import ReactTooltip from 'react-tooltip'

import {deleteCampaign, removeRecruit, selectCampaign, updateCurrentVersion} from '../../../actions/email'
import {toggleCreateEmailModal} from '../../../actions/modal'
import {toggleReview} from '../../../actions'

import './LeftSidebar.css'

new Clipboard('.clipboard');

export function LeftSidebar (props) {
  const showModal = e => {
    e.preventDefault()
    props.dispatch(toggleCreateEmailModal)
  }

  const deleteEmail = (campaign, socket) => {
    props.dispatch(deleteCampaign(campaign, socket))
  }

  const removeEmail = (recruit, campaignId, socket) => {
    props.dispatch(removeRecruit(recruit, campaignId, socket))
  }

  const emailFile = (email) => {
    const selectedCampaign = props.selectedCampaign
    let classes = 'email-file'
    const leftBorder = email.master === props.currentUser._id
    ? ' red-left' : ' yellow-left'

    classes += leftBorder

    if(!selectedCampaign || email._id !== selectedCampaign._id) return classes
    if(email._id === selectedCampaign._id) {
      return classes += ' selected-shadow'
    }
  }

  const emails = () => {
    if(props.emails){
      return props.emails.map((email, index) => {
        const master = email.master === props.currentUser._id
        ? <span>
          <span className="clipboard"
            data-clipboard-text={`${email.slug}@mailtroopers.com`}
            data-event='click focus'
            data-tip="Copied to your clipboard!"
            data-place="bottom"
        >
          Get Link
        </span> |
        <span className="red-text" onClick={() => deleteEmail(email._id, props.socket)}>
          &nbsp;Delete
        </span>
        </span>
        : <span
          className="red-text"
          onClick={() => {
            removeEmail(props.currentUser._id, email._id, props.socket)}}
          >
           Remove
          </span>


        return (
        <div
          className={emailFile(email)}
          key={index}
          onMouseOver={ e => {
            e.currentTarget.lastChild.className = "shown-email-options"
          }}
          onMouseLeave={e => {
            e.currentTarget.lastChild.className = "hidden-email-options"
          }}
          onClick={() => {
            props.dispatch(selectCampaign(email))
            props.dispatch(updateCurrentVersion(email.versions.length))
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

  const buttonDirection = () => {
    if(props.reviewOpen) {
        return 'toggle-review-show-btn'
    } else {
        return 'toggle-review-show-btn toggle-review-hide-btn'
      }
  }

  const hidePanels = () => {
    if(!props.reviewOpen){
      return 'left-sidebar close-review'
    }
    return 'left-sidebar'
  }

  return (
      <div className={hidePanels()}>
        <div className="review-header">
          <div
            className={buttonDirection()}
            onClick={() => {props.dispatch(toggleReview)}}>
          </div>
          <div className="h2 grey-text center-text">Reviews</div>
        </div>

        <div className="email-list-container">
          <div className="btn-container">
            <button
              className="btn"
              onClick={e => showModal(e)}>
              New Campaign  <img src={require("../../images/bomb.svg")} alt="New Campaign" />
            </button>
          </div>
          <div style={{marginLeft: 'calc(50% - 87.5px)'}}>
            <div className="circle-red"></div>
            <span className="p grey-text" style={{float: 'left', marginTop: '5px'}}>Yours</span>
            <div className="circle-yellow"></div>
            <span className="p grey-text" style={{lineHeight: '25px'}}>Theirs</span>
          </div>
          {emails()}
        </div>

        <ReactTooltip globalEventOff='click' afterShow={() => {
          setTimeout(() => {ReactTooltip.hide()}, 1500)
        }}/>
      </div>
  )
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
