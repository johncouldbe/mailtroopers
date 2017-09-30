import React from 'react'
import CreateEmailForm from './CreateEmailForm'
import {connect} from 'react-redux'

import {toggleCreateEmailModal} from '../../../actions/'

const CreateEmailModal = props => {
  const hideModal = e => {
    e.preventDefault()
    props.dispatch(toggleCreateEmailModal)
  }

  return (
    <div className="modal-window">
      <div className="modal center-text">
        <div className="modal-close" onClick={e => hideModal(e)}></div>
        <div className="h3 grey-text">Let make a new campaign!</div>
        <div className="p red-text">{props.err}</div>

        <CreateEmailForm/>

      </div>
    </div>
  )
}

const mapStateToProps = state => {
   return {
    err: state.email.createEmailErr,
  }
}

export default connect(mapStateToProps)(CreateEmailModal)
