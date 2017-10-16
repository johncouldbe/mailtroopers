import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import './Navbar.css'
import {setCurrentUser, setAuthToken} from '../../actions/user';
import {clearAuthToken} from '../../local-storage';

export function Navbar(props) {
  const logOut = () => {
    if(window.confirm("Are you sure you want to log out?")){
      props.dispatch(setCurrentUser(null))
      props.dispatch(setAuthToken(null))
      clearAuthToken()
    }
  }
  const renderLog = () => {
    if(props.loggedIn){
      return (
        <div className="off-white-text h4" onClick={() => logOut()}>Log Out</div>
      )
    }

    return (
      <Link to="/login">
        <div className="off-white-text h4">Log In</div>
      </Link>
    )
  }

  return(
    <nav>
      <div className='logo'>
        <div className="off-white-text h1">MailTroopers</div>
      </div>
      <div className='log'>
        {renderLog()}
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.user.currentUser !== null
})

export default connect(mapStateToProps)(Navbar)
