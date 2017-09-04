import React, {Component} from 'react'
import {connect} from 'react-redux'

import Version from './version/Version'

import {toggleLeftSidebar, toggleRightSidebar} from '../../actions'

import './Main.css'

export class Main extends Component {

  pickMainClass = () => {
    if(this.props.leftSidebarOpen && !this.props.rightSidebarOpen) {
      return 'main close-right-sidebar'
    }
    if(!this.props.leftSidebarOpen && this.props.rightSidebarOpen) {
      return 'main close-left-sidebar'
    }
    if(!this.props.leftSidebarOpen && !this.props.rightSidebarOpen) {
      return 'main close-both-sidebars'
    }
    return 'main'
  }

  buttonDirection(e){
    if(e === 'right'){
      if(this.props.rightSidebarOpen) {
        return 'button right-facing-btn'
      } else {
        return 'button left-facing-btn'
      }
    }
    if(e === 'left'){
      if(this.props.leftSidebarOpen) {
        return 'button left-facing-btn'
      } else {
        return 'button right-facing-btn'
      }
    }
  }

  render(){
    return (
        <div className={this.pickMainClass()}>
          <Version />

          <div
            className="left-close-button"
            onClick={() => {this.props.dispatch(toggleLeftSidebar)}}>

            <div className={this.buttonDirection('left')}></div>
          </div>

          <div className="email-container"></div>

          <div
            className="right-close-button"
            onClick={() => {this.props.dispatch(toggleRightSidebar)}}>

            <div className={this.buttonDirection('right')}></div>
          </div>
        </div>
    )
  }

}

const mapStateToProps = state => ({
    leftSidebarOpen: state.leftSidebarOpen,
    rightSidebarOpen: state.rightSidebarOpen
})

export default connect(mapStateToProps)(Main)
