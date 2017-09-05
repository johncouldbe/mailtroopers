import React from 'react'

import Comments from './comments/Comments'
import Troop from './troop/Troop'

import './RightSidebar.css'

function RightSidebar (props) {
  return (
      <div className="right-sidebar">
        <div className="team-header">
          <div className="toggle-team-show-btn"></div>
          <div className="blue-text h2 center-text">Troop</div>
          <div className="faded-border"></div>
        </div>

        <Troop />
        <div className="comments-header">
          <div className="toggle-team-show-btn"></div>
          <div className="blue-text h2 center-text">Comments</div>
          <div className="faded-border"></div>
        </div>
        <Comments />
      </div>
  )
}

export default RightSidebar;
