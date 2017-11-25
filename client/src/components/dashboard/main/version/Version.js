import React from 'react'
import {connect} from 'react-redux'

import {updateCurrentVersion, deleteVersion} from '../../../../actions/email'

import './Version.css'

export function Version (props) {

  const updateVersion = num => {
    const toCheck = num  + props.currentVersion
    if(toCheck > 0 && toCheck < props.selectedCampaign.versions.length + 1) {
      props.dispatch(updateCurrentVersion(toCheck))
    }
  }

  const version = () => {
    if(!props.selectedCampaign || props.selectedCampaign.versions.length === 0){
      return
    }

    return (
      <div className="version-container">
        <div className="version-left-btn" onClick={() => updateVersion(-1)}></div>
        <div className="version-center-display">
          <div className="grey-text p">{props.currentVersion} of {props.selectedCampaign.versions.length}</div>
        </div>
        <div className="version-right-btn" onClick={() => updateVersion(1)}></div>
      </div>
    )
  }

  const deleteVersionOption = () => {
    if(!props.selectedCampaign ||
      props.selectedCampaign.versions.length <= 1 ||
      props.selectedCampaign.master !== props.currentUser._id){
      return
    }

    const currentVersion = props.selectedCampaign.versions[props.currentVersion - 1]._id
    const campaignId = props.selectedCampaign._id
    const socket = props.socket

    return(
      <div
        className="delete-version red-text p center-text"
        onClick={(() => {
          if(window.confirm('Are you sure you want to delete this version?')){
            props.dispatch(deleteVersion(currentVersion, campaignId, socket))
          }
        })}>
        Delete Version
      </div>
    )
  }

  return (
    <div className="version">
      {version()}
      {deleteVersionOption()}
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedCampaign: state.email.selectedCampaign,
  currentVersion: state.email.currentVersion,
  socket: state.io.socket
})

export default connect(mapStateToProps)(Version);
