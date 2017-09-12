import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import LeftSidebar from '../left-sidebar/LeftSidebar'
import Main from '../main/Main'
import Navbar from '../navbar/Navbar'
import RightSidebar from '../right-sidebar/RightSidebar'
import RecruitModal from '../modals/recruit-modal/RecruitModal'
import CommentModal from '../modals/comment-modal/CommentModal'


import './App.css'

export class App extends Component {

  render() {
    const recruitmodal = this.props.recruitModal ? <RecruitModal /> : ''
    const commentmodal = this.props.commentModal ? <CommentModal /> : ''

    return (
      <Router>
      <div>
        <div className="grid">
          <Route exact path="/"><Navbar /></ Route>
          <LeftSidebar />
          <RightSidebar />
          <Main />
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
