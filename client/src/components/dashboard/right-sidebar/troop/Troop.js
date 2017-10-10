import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleRecruitModal} from '../../../../actions/modal'
import './Troop.css'

export class Troop extends Component {
  constructor(props){
    super(props)

    this.showRecruitModal = this.showRecruitModal.bind(this)
  }

  troop = () => {
    if(!this.props.selectedCampaign){
      return 
    }
    if(this.props.selectedCampaign.contributors.length === 0){
      return <div>
        <div className="h3 red-text center-text">{`Those emails won't review themselves!`}</div>
        <div className="h4 grey-text center-text">{`Build your team`}</div>
      </div>
    }

    return this.props.selectedCampaign.contributors.map((trooper, index) => {
      console.log(trooper);
      return <div className="trooper-container" key={index}>
        <div className="trooper-img">
          <div className="h2 white-text">{this.firstLetter(trooper.firstName)}</div>
        </div>
        <div className="h4 trooper-name grey-text">{`${trooper.firstName} ${trooper.lastName}`}</div>
      </div>
    })
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
        <div className="trooper-btn-container">
          <button className="trooper-btn" onClick={this.showRecruitModal}>Recruit <img src={require("../../../images/share.svg")} alt="Share" /></button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  selectedCampaign: state.email.selectedCampaign
})
export default connect(mapStateToProps)(Troop)
