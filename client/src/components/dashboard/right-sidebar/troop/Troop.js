import React, {Component} from 'react'
import {connect} from 'react-redux'

import {toggleRecruitModal} from '../../../../actions/modal'
import {removeRecruit} from '../../../../actions/email'

import './Troop.css'

export class Troop extends Component {
  constructor(props){
    super(props)

    this.showRecruitModal = this.showRecruitModal.bind(this)
  }

  troop() {
    if(!this.props.selectedCampaign){
      return
    }

    const master = this.props.selectedCampaign.master === this.props.currentUser._id
    const socket = this.props.socket
    const campaignId = this.props.selectedCampaign._id
    const hasContributors = this.props.selectedCampaign.contributors.length

    if(!hasContributors && master){
      return <div>
        <div className="h3 red-text center-text">
          {`Those emails won't review themselves!`}
        </div>
        <div className="h4 grey-text center-text">
          {`Build your team`}
        </div>
      </div>
    }

    return this.props.selectedCampaign.contributors.map((trooper, index) => {
      const deleteRecruit = master
      ? <div
        className="delete-recruit"
        onClick={() => {
          this.props.dispatch(removeRecruit(trooper._id, campaignId, socket))
        }}
      ></div>
      : ''

      return <div className="trooper-container" key={index}>
        <div className="trooper-img">
          <div className="h2 white-text">
            {this.firstLetter(trooper.firstName)}
          </div>
        </div>
        <div className="h4 trooper-name grey-text">
          {`${trooper.firstName} ${trooper.lastName}`}
        </div>
        {deleteRecruit}
      </div>
    })
  }

  troopBtn() {
    if(this.props.selectedCampaign
      && this.props.selectedCampaign.master === this.props.currentUser._id){
      return <div className="trooper-btn-container">
        <button className="trooper-btn" onClick={this.showRecruitModal}>
          Recruit &nbsp;
          <img src={require("../../../images/share.svg")} alt="Share" />
        </button>
      </div>
    }
  }

  firstLetter = name => {
    const letter = name.split('')
    return letter[0].toUpperCase()
  }

  showRecruitModal(e){
    e.preventDefault()
    this.props.dispatch(toggleRecruitModal)
  }

  render(){
    return(
      <div className="troop">
        {this.troop()}
        {this.troopBtn()}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedCampaign: state.email.selectedCampaign,
  socket: state.io.socket
})
export default connect(mapStateToProps)(Troop)
