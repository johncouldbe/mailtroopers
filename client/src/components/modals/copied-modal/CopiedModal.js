import React, {Component} from 'react'

import {toggleCopiedModal} from '../../../actions/modal'

import './CopiedModal.css'
import thumbsUp from '../../images/thumbs-up.svg'

export default class CopiedModal extends Component {
  hideCopiedModal = () => {
    this.props.dispatch(toggleCopiedModal)
  }

  render(){
    return(
      <div className="modal-window" onClick={this.hideCopiedModal}>
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <div className="modal-close" onClick={this.hideCopiedModal}></div>
          <div>
            <div className="h3 grey-text center-text">Copied to Clipboard!</div>
            <div className="thumbs-up-container">
              <img src={thumbsUp} alt="Copied to Clipboard!" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
