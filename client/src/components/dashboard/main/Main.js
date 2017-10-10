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

  displayContainer(){
    if(!this.props.selectedCampaign){
      return <div className="email-container">
        <span className="h2 red-text center-text">You must select a campaign.</span>
      </div>
    }
    if(this.props.selectedCampaign.versions.length === 0){
      return <div className="email-container" style={{padding: '10px'}}>
        <span className="h3 red-text center-text">
          You haven't made a version for this campaign yet! Send the email you'd like to review to:
        </span>
        <br />
        <span className="h4 grey-text center-text">
          {this.props.selectedCampaign.slug}@mailtroopers.com
        </span>
      </div>
    }

    const versions = this.props.selectedCampaign.versions
    return <div
          className="email-container"
          dangerouslySetInnerHTML={{__html: versions[versions.length - 1].html}}
        ></div>
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

          {this.displayContainer()}

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
    rightSidebarOpen: state.mailTrooper.rightSidebarOpen,
    selectedCampaign: state.email.selectedCampaign
})

export default connect(mapStateToProps)(Main)
