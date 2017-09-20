import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import decode from 'jwt-decode'

import LeftSidebar from '../left-sidebar/LeftSidebar'
import Main from '../main/Main'
import Navbar from '../navbar/Navbar'
import RightSidebar from '../right-sidebar/RightSidebar'
//Modals
import LogInSignUp from '../modals/login-signup-modal/LogInSignUp'
import RecruitModal from '../modals/recruit-modal/RecruitModal'
import CommentModal from '../modals/comment-modal/CommentModal'


import './App.css'

const checkAuth = () => {
  const token = localStorage.getItem('token')

  if(!token){
    return false
  }

  try {
    const {exp} = decode(token)
    if(exp < new Date.getTime() / 1000){
      return false
    }
  }
  catch(e) {
    return false
  }

  return true;
}

const AuthRoute = ({component: Component, ...rest}) => {
  return <Route {...rest} render={() => (
    checkAuth() ? (
        <Component />
    ) : (
      <Redirect to={{pathname: '/'}} />
    )
  )} />
}

export class App extends Component {
  render() {
    const recruitmodal = this.props.recruitModal ? <RecruitModal /> : ''
    const commentmodal = this.props.commentModal ? <CommentModal /> : ''

    return (
      <Router>
        <div>
          <div className="grid">
            <Route path="/" component={Navbar} />
            <AuthRoute exact path="/dashboard" component={LeftSidebar} />
            <AuthRoute exact path="/dashboard" component={RightSidebar} />
            <AuthRoute exact path="/dashboard" component={Main} />
            <Route exact path="/login" component={LogInSignUp} />
          </div>
          {recruitmodal}
          {commentmodal}
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
    recruitModal: state.recruitModal,
    commentModal: state.commentModal
})

export default connect(mapStateToProps)(App)
