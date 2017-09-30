import React, {Component} from 'react'
import {Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {refreshAuthToken} from '../../actions/user'

import LandingPage from '../landing-page/LandingPage'
import Navbar from '../navbar/Navbar'
import Dashboard from '../dashboard/Dashboard'

//Modals
import SignUpWrapper from '../modals/signup-modal/SignUpWrapper'
import LogInWrapper from '../modals/login-modal/LogInWrapper'

import './App.css'

export class App extends Component {

  componentDidMount() {
    if (this.props.hasAuthToken) {
      // Try to get a fresh auth token if we had an existing one in
      // localStorage
      this.props.dispatch(refreshAuthToken())
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh()
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh()
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh()
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    )
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return
    }
    clearInterval(this.refreshInterval)
  }

  render() {

    return (
      <div>
        <Route path="/home" component={Navbar} />
        {["/", "/login", "/signup"].map((path, index) =>
          <Route exact path={path} component={LandingPage} key={index}/>
        )}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={SignUpWrapper} />
        <Route exact path="/login" component={LogInWrapper} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    hasAuthToken: state.user.authToken !== null,
    loggedIn: state.user.currentUser !== null
})

export default withRouter(connect(mapStateToProps)(App))
