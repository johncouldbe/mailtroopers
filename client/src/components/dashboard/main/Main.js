import React, {Component} from 'react'
import {connect} from 'react-redux'
import openSocket from 'socket.io-client'
import {SOCKET_URL} from '../../../config'

import Version from './version/Version'
import {toggleLeftSidebar, toggleRightSidebar} from '../../../actions'
import './Main.css'

const socket = openSocket(SOCKET_URL)

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this.subscribeToEmail((err, email) => this.setState({
      email
    }));
  }

  subscribeToEmail(cb) {
    socket.on('email', email => {
      cb(null, email)
    });
    socket.emit('subscribeToEmail');
  }

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

          <div className="email-container" dangerouslySetInnerHTML={{__html: this.state.email}}></div>

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
    leftSidebarOpen: state.mailTrooper.leftSidebarOpen,
    rightSidebarOpen: state.mailTrooper.rightSidebarOpen
})

export default connect(mapStateToProps)(Main)
