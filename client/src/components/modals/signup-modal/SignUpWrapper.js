import React from 'react'
import SignUp from './SignUp'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export const SignUpWrapper = props => {

  if(props.loggedIn) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div>
      <SignUp err={props.logErr}/>
    </div>
  )
}

const mapStateToProps = state => ({
  regErr: state.user.regErr,
  loggedIn: state.user.currentUser
})

export default connect(mapStateToProps)(SignUpWrapper)
