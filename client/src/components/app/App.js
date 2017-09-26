import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import decode from 'jwt-decode'

import {loadAuthToken} from '../../local-storage'
import {refreshAuthToken} from '../../actions/user'

import LandingPage from '../landing-page/LandingPage'
import Navbar from '../navbar/Navbar'
import Dashboard from '../dashboard/Dashboard'

//Modals
import SignUp from '../modals/signup-modal/SignUp'
import LogIn from '../modals/login-modal/LogIn'
import RecruitModal from '../modals/recruit-modal/RecruitModal'
import CommentModal from '../modals/comment-modal/CommentModal'


import './App.css'

const checkAuth = () => {
  const token = loadAuthToken()
  console.log(token);
  if(!token){
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

  componentDidMount() {
        if (this.props.hasAuthToken) {
            // Try to get a fresh auth token if we had an existing one in
            // localStorage
            this.props.dispatch(refreshAuthToken());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn && !this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (!nextProps.loggedIn && this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

  render() {

    return (
        <div>
          <div>
            <Route path="/home" component={Navbar} />
            {["/", "/login", "/signup"].map((path, index) =>
              <Route exact path={path} component={LandingPage} key={index}/>
            )}
            <AuthRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    hasAuthToken: state.user.authToken !== null,
    loggedIn: state.user.currentUser !== null
})

export default withRouter(connect(mapStateToProps)(App))
