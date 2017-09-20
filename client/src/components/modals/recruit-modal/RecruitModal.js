import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleRecruitModal} from '../../../actions'
// import {BrowserRouter as Link} from 'react-router-dom'

import './RecruitModal.css'

export class RecruitModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      copied: false
    }
  }

  hideRecruitModal = (e) => {
    e.preventDefault()
    this.props.dispatch(toggleRecruitModal)
  }

  copyText = (id) => {
    document.querySelector(id).select()
    document.execCommand('copy')
    this.setState({
      copied: true
    })
  }

  render(){
    const copied = !this.state.copied
      ? '' : 'Copied to your clipboard Commander!'

    return(
      <div className="modal-window" onClick={this.hideRecruitModal}>
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <div className="modal-close" onClick={this.hideRecruitModal}></div>
          <div className="h3 grey-text center-text">Copy this link and send to your troop!</div>
          <input
            className="link-container p grey-text"
            readOnly
            type="text"
            value={"https://www.mailtroopers.com/johncouldbe/12398y54-hybrid-zebra"}
            id="recruit-link"
          />
          <div
            className="copy-container"
            onClick={() => this.copyText('#recruit-link')}
          ></div>

          <div
            className="center-text p grey-text"
            style={{margin: '20px 0'}}
          >
            {copied}
          </div>
        </div>
      </div>
    )
  }

}

export default connect()(RecruitModal)
