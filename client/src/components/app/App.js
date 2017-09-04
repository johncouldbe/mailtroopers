import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import LeftSidebar from '../left-sidebar/LeftSidebar'
import Main from '../main/Main'
import Navbar from '../navbar/Navbar'
import RightSidebar from '../right-sidebar/RightSidebar'

import './App.css'

export class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    
    return (
      <Router>
        <div className="grid">
          <Navbar />
          <LeftSidebar />
          <RightSidebar />
          <Main />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
    leftSidebarOpen: state.leftSidebarOpen,
    rightSidebarOpen: state.rightSidebarOpen
})

export default connect(mapStateToProps)(App)
