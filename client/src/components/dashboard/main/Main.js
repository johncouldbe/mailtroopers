import React, {Component} from 'react'
import {connect} from 'react-redux'

import Version from './version/Version'
import {toggleLeftSidebar, toggleRightSidebar} from '../../../actions'

import './Main.css'

export class Main extends Component {

  componentDidMount(){
    this.props.socket.emit('subscribeToEmail', {userId: this.props.currentUser._id})
  }

  displayContainer(){
    if(!this.props.selectedCampaign){
      return <div className="email-container">
        <span className="h2 red-text center-text">You must select a campaign.</span>
      </div>
    }
    if(!this.props.selectedCampaign.versions.length){
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

    const current = this.props.selectedCampaign.versions[this.props.currentVersion - 1]
    if(!current) return ''
    return <div className="email-container">
          <div className="p center-text grey-text" style={{padding: '3px'}}>
            <span className="h4 red-text">Subject:</span>
            &nbsp;{current.subject || ''}
          </div>
          <div
            dangerouslySetInnerHTML={{__html: current.html}}
          ></div>
        </div>
  }

  pickMainClass(){
    if(window.innerWidth < 765){
      return 'main-mobile'
    }
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

  leftBtn(){
    if(window.innerWidth < 765){
      return
    }
    return(
      <div
        className="left-close-button"
        onClick={() => {this.props.dispatch(toggleLeftSidebar)}}>
        <div className={this.buttonDirection('left')}></div>
      </div>
    )
  }
  rightBtn(){
    if(window.innerWidth < 765){
      return
    }
    return(
      <div
        className="right-close-button"
        onClick={() => {this.props.dispatch(toggleRightSidebar)}}>
        <div className={this.buttonDirection('right')}></div>
      </div>
    )
  }

  render(){
    return (
        <div className={this.pickMainClass()}>
          <Version />
          {this.leftBtn()}
          {this.rightBtn()}
          {this.displayContainer()}
        </div>
    )
  }

}

const mapStateToProps = state => ({
    leftSidebarOpen: state.mailTrooper.leftSidebarOpen,
    rightSidebarOpen: state.mailTrooper.rightSidebarOpen,
    selectedCampaign: state.email.selectedCampaign,
    currentVersion: state.email.currentVersion,
    currentUser: state.user.currentUser,
    socket: state.io.socket
})

export default connect(mapStateToProps)(Main)
