import React, {Component} from 'react'
// import {BrowserRouter as Link} from 'react-router-dom'

import './Troop.css'

export default class Troop extends Component {
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
        <div className="h3 trooper-name grey-text">{trooper}</div>
      </div>
    })
  }

  firstLetter = name => {
    const letter = name.split('')
    return letter[0].toUpperCase()
  }

  render(){
    return(
      <div className="troop">
        {this.troop}
        <div className="trooper-btn-container">
          <button className="trooper-btn">Recruit</button>
        </div>
      </div>
    )
  }
}
