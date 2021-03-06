import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import PacmanLoader from 'halogen/PacmanLoader'

import RightSidebar from './right-sidebar/RightSidebar'
import LeftSidebar from './left-sidebar/LeftSidebar'
import Main from './main/Main'


import RecruitModal from '../modals/recruit-modal/RecruitModal'
import CommentModal from '../modals/comment-modal/CommentModal'
import CreateEmailModal from '../modals/create-email-modal/CreateEmailModal'
import CopiedModal from '../modals/copied-modal/CopiedModal'

import {toggleLeftSidebar} from '../../actions'

import './Dashboard.css'

export class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.loggedIn) {
            return
        }

        if(window.innerWidth < 765){
          this.props.dispatch(toggleLeftSidebar)
        }
    }

    pickMainClass() {
      if(window.innerWidth < 765){
        if(!this.props.leftSidebarOpen && !this.props.rightSidebarOpen) {
          return 'grid-mobile'
        }
      }
      return 'grid'
    }

    render() {
      if (!this.props.loggedIn) {
          return <Redirect to="/" />;
      }

      const recruitmodal = this.props.recruitModal ? <RecruitModal /> : ''
      const commentmodal = this.props.commentModal ? <CommentModal /> : ''
      const createEmailModal = this.props.createEmailModal ? <CreateEmailModal /> : ''
      const copiedModal = this.props.copiedModal ? <CopiedModal /> : ''
      return (
        <div>
        {
          this.props.currentUser && this.props.emails && this.props.socket ?
          <div className="grid">
            <LeftSidebar />
            <RightSidebar />
            <Main />
          </div> :
          <div className='loader-container'>
            <PacmanLoader color="#f54f45" size={25} margin={4} />
          </div>
        }

          {recruitmodal}
          {commentmodal}
          {createEmailModal}
          {copiedModal}
          </div>
      );
    }
}

const mapStateToProps = state => ({
    recruitModal: state.modal.recruitModal,
    commentModal: state.modal.commentModal,
    createEmailModal: state.modal.createEmailModal,
    copiedModal: state.modal.copiedModal,
    loggedIn: state.user.authToken !== null,
    currentUser: state.user.currentUser,
    emails: state.email.emails,
    selectedCampaign: state.email.selectedCampaign,
    socket: state.io.socket
});

export default connect(mapStateToProps)(Dashboard)
