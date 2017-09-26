import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleRecruitModal} from '../../../../actions'
import './Troop.css'

export class Troop extends Component {
  constructor(props){
    super(props)
    this.troopers = [
      "John Brown", "Autumn Brown", "Baloo Dog", "Gymli Cat", "Killer Whale"
    ]

    this.troop = this.troopers.map((trooper, index) => {
      return <div className="trooper-container" key={index}>
        <div className="trooper-img">
          <div className="h2 white-text">{this.firstLetter(trooper)}</div>
        </div>
        <div className="h4 trooper-name grey-text">{trooper}</div>
      </div>
    })

    this.showRecruitModal = this.showRecruitModal.bind(this)

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
        {this.troop}
        <div className="trooper-btn-container">
          <button className="trooper-btn" onClick={this.showRecruitModal}>Recruit <img src={require("../../../images/share.svg")} alt="Share" /></button>
        </div>
      </div>
    )
  }
}

export default connect()(Troop)
