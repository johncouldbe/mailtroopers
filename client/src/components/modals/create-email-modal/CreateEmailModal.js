import React from 'react'
import CreateEmailForm from './CreateEmailForm'
import {connect} from 'react-redux'

import {toggleCreateEmailModal} from '../../../actions/modal'

export const CreateEmailModal = props => {
  const hideModal = e => {
    e.preventDefault()
    props.dispatch(toggleCreateEmailModal)
  }

  return (
    <div className="modal-window">
      <div className="modal center-text">
        <div className="modal-close" onClick={e => hideModal(e)}></div>
        <div className="h3 grey-text">
          Make a new campaign!<br />
          <span style={{fontSize: ".8em"}}>Lets start with a name...</span>
        </div>
        <div className="p red-text">{props.err}</div>

        <CreateEmailForm user={props.user} socket={props.socket} />

      </div>
    </div>
  )
}

const mapStateToProps = state => {
   return {
    err: state.email.createEmailErr,
    user: state.user.currentUser,
    socket: state.io.socket
  }
}

export default connect(mapStateToProps)(CreateEmailModal)
