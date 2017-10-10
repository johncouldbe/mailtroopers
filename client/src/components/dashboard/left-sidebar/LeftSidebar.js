import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {addNewCampaign, deleteCampaign, removeCampaign, selectCampaign} from '../../../actions/email'
import {toggleCreateEmailModal} from '../../../actions/modal'

import './LeftSidebar.css'

function LeftSidebar (props) {
  const showModal = e => {
    e.preventDefault()
    props.dispatch(toggleCreateEmailModal)
  }

  const deleteEmail = (campaign, socket) => {
    props.dispatch(deleteCampaign(campaign, socket))
  }

  const emails = () => {
    if(props.emails){
      return props.emails.map((email, index) => {
        return (
        <div
          className="email-file"
          key={index}
          onMouseOver={ e => {
            e.currentTarget.lastChild.className = "shown-email-options"
          }}
          onMouseLeave={e => {
            e.currentTarget.lastChild.className = "hidden-email-options"
          }}
          onClick={() => props.dispatch(selectCampaign(email))}
        >
          <div className="h4 grey-text comment-date">{email.name}</div>
          <div className="p grey-text comment-comment">
            {moment(email.date).format('MM/DD/YYYY')}
          </div>
          <div className="hidden-email-options">
            <div className="p grey-text right-text">
              Get Link |&nbsp;
              <span className="red-text" onClick={() => deleteEmail(email._id, props.socket)}>Delete</span>
            </div>
          </div>
        </div>
        )
      })
    }
  }

  return (
      <div className="left-sidebar">
        <div className="review-header">
          <div className="h2 grey-text center-text">Reviews</div>
        </div>

        <div className="email-list-container">
          <div className="btn-container">
            <button
              className="btn"
              onClick={e => showModal(e)}>
              New Email  <img src={require("../../images/bomb.svg")} alt="New Email" />
            </button>
          </div>

          {emails()}
        </div>
      </div>
  )
}

const mapStateToProps = state => ({
  emails: state.email.emails,
  socket: state.io.socket,

})

export default connect(mapStateToProps)(LeftSidebar)
