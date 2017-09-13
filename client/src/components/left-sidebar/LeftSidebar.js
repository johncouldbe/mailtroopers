import React from 'react'

import './LeftSidebar.css'

function LeftSidebar (props) {
  return (
      <div className="left-sidebar">
        <div className="review-header">
          <div className="h2 grey-text center-text">Reviews</div>
        </div>
        <div className="email-list-container">
          <div className="email-file">
            <div className="h4 grey-text comment-date">ARA September Education Seminar</div>
            <div className="p grey-text comment-comment">09/12/17</div>
          </div>
          <div className="email-file">
            <div className="h4 grey-text comment-date">ARA September Education Seminar</div>
            <div className="p grey-text comment-comment">09/12/17</div>
          </div>
        </div>

      </div>
  )
}

export default LeftSidebar;
