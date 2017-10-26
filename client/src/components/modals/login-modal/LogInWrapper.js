import React from 'react'
import LogIn from './LogIn'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export const LogInWrapper = props => {

  if(props.loggedIn) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div>
      <LogIn err={props.logErr}/>
    </div>
  )
}

const mapStateToProps = state => {
   return {
    logErr: state.user.logErr,
    loggedIn: state.user.currentUser
  }
}

export default connect(mapStateToProps)(LogInWrapper)
