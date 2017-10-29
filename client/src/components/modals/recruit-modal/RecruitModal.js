import React, {Component} from 'react'
import {connect} from 'react-redux'

import {recruit, clearRecruitMsgs} from '../../../actions/email'
import {toggleRecruitModal} from '../../../actions/modal'

import './RecruitModal.css'

export class RecruitModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      copied: false,
      addressList: []
    }
  }

  hideRecruitModal = (e) => {
    e.preventDefault()
    this.props.dispatch(toggleRecruitModal)
    this.props.dispatch(clearRecruitMsgs)
  }

  validateEmail(address)  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address)) {
      return true
    }
    return false
  }

  emailError() {
    if(!this.state.notEmail) return ''
    return (
      <div className="red-text center-text h4">
        {this.state.notEmail}
      </div>
    )
  }

  addToList() {
    let address = document.getElementById('recruit-address').value
    //validate our email
    if(!this.validateEmail(address)) {
      return this.setState({
        notEmail: 'You must use a valid email address.'
      })
    }

    const findEmail = (email) => {
      return email === address
    }

    if(this.state.addressList.find(findEmail)) {
      return this.setState({
        notEmail: 'You\'ve already entered that email address.'
      })
    }

    //all tests past ready to add to list
    this.setState({
      addressList: [...this.state.addressList, address],
      notEmail: ''
    })
    document.getElementById('recruit-address').value = ''
  }

  removeFromList(address) {
    this.setState({
      addressList: this.state.addressList.filter(add => add !== address)
    })
  }

  list() {
    return this.state.addressList.map((address, index) => {
      return (
        <div key={index} className="address-container">
          <span className="p white-text address">{address}</span>
          <span
            className="delete-address"
            onClick={() => this.removeFromList(address)}
          ></span>
        </div>
      )
    })
  }

  sendRecruit() {
    const addressList = this.state.addressList
    const id = this.props.selectedCampaign._id
    const socket = this.props.socket
    this.props.dispatch(recruit(addressList, id, socket))
  }

  recruitBtn() {
    if(this.state.addressList.length){
      return <div className="btn-container">
        <button className="btn" onClick={() => this.sendRecruit()}>
          Add to Troop
        </button>
      </div>
    }
    return ''
  }

  addRecruitContainer() {
    return (
    <div>
      <div className="h3 grey-text center-text modal-padding">Add the email addresses of the people you want to recruit!</div>

        {this.emailError()}

        <form
          onSubmit={(e) => {
          e.preventDefault()
          this.addToList()}
          }
        >
          <input
            className="link-container p grey-text"
            type="text"
            id="recruit-address"
          />
          <button
            className="add-address"
          ></button>
        </form>

        {this.list()}

        {this.recruitBtn()}
      </div>
    )
  }

  recruitedContainer() {
    const failures = this.props.failures
    const successes = this.props.successes

    const successMsg = successes.length
    ? <div>
        <div className="h3 modal-padding grey-text">These were successfully recruited:</div>
        <div className="p modal-padding grey-text">{successes.join(', ')}</div>
      </div>
    : ''

    const failureMsg = failures.length
    ? <div>
        <div className="h3 modal-padding red-text">
          These did not yet have an account with us:<br />
            <span style={{fontSize: '.7em'}}>Ask them to sign up and try again!</span>
        </div>
        <div className="p modal-padding grey-text">{failures.join(', ')}</div>
      </div>
    : ''

    return (
      <div>
        {successMsg}
        {failureMsg}
      </div>
    )
  }

  render(){
    return (
      <div className="modal-window" onClick={this.hideRecruitModal}>
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <div className="modal-close" onClick={this.hideRecruitModal}></div>
          { !this.props.successes || !this.props.failures
            ? this.addRecruitContainer()
            : this.recruitedContainer()
          }
        </div>
      </div>
    )
  }
}

const mapstateToProps = state => ({
  selectedCampaign: state.email.selectedCampaign,
  socket: state.io.socket,
  failures: state.email.recruitFailures,
  successes: state.email.recruitSuccesses
})

export default connect(mapstateToProps)(RecruitModal)
