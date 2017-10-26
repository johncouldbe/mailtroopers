import React from 'react'
import {connect} from 'react-redux'

import {updateCurrentVersion} from '../../../../actions/email'

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
  return (
    <div className="version">
      {version()}
    </div>
  )
}

const mapStateToProps = state => ({
  selectedCampaign: state.email.selectedCampaign,
  currentVersion: state.email.currentVersion
})

export default connect(mapStateToProps)(Version);
