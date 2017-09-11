import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import LeftSidebar from '../left-sidebar/LeftSidebar'
import Main from '../main/Main'
import Navbar from '../navbar/Navbar'
import RightSidebar from '../right-sidebar/RightSidebar'
import RecruitModal from '../recruit-modal/RecruitModal'

import './App.css'

export class App extends Component {

  render() {
    const modal = this.props.recruitModal ? <RecruitModal /> : ''
    
    return (
      <Router>
      <div>
        <div className="grid">
          <Route exact path="/"><Navbar /></ Route>
          <LeftSidebar />
          <RightSidebar />
          <Main />
        </div>
        {modal}
      </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
    recruitModal: state.recruitModal
})

export default connect(mapStateToProps)(App)
