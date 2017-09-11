import React from 'react'
// import {BrowserRouter as Link} from 'react-router-dom'

import './RecruitModal.css'

export default function RecruitModal(props) {
  return(
    <div className="recruit-modal-window">
      <div className="recruit-modal">
        <div className="recruit-modal-close"></div>
        <div className="h3 grey-text center-text">Copy this link and send to your troop!</div>
        <div className="link-container">
          <div className="p grey-text">https://www.mailtroopers.com/johncouldbe/12398y54-hybrid-zebra</div>
        </div>
        <div className="copy-container"></div>
      </div>
    </div>
  )
}
