import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import PacmanLoader from 'halogen/PacmanLoader'

import RightSidebar from './right-sidebar/RightSidebar'
import LeftSidebar from './left-sidebar/LeftSidebar'
import Main from './main/Main'
import Navbar from '../navbar/Navbar'


import RecruitModal from '../modals/recruit-modal/RecruitModal'
import CommentModal from '../modals/comment-modal/CommentModal'
import CreateEmailModal from '../modals/create-email-modal/CreateEmailModal'

import {addNewCampaign, removeCampaign} from '../../actions/email'
import {toggleCreateEmailModal} from '../../actions/modal'

import './Dashboard.css'

export class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.loggedIn) {
            return
        }
        this.props.socket.on('campaign added', campaign => {
          console.log('HITTTTT', campaign);
          this.props.dispatch(addNewCampaign(campaign))
          this.props.dispatch(toggleCreateEmailModal)
        })

        this.props.socket.on('campaign deleted', campaignId => {
          this.props.dispatch(removeCampaign(campaignId))
        })
        // if(this.props.currentUser){
        //   console.log('dispatching')
        //   this.props.dispatch(getCampaigns(this.props.currentUser._id))
        // }
    }

    componentDidUpdate(prevProps) {
      // console.log('NEXT PROPS', prevProps.selectedCampaign)
      // console.log('THIS.PROPS', this.props.selectedCampaign)
      // if(!prevProps.selectedCampaign || this.props.selectedCampaign && prevProps.selectedCampaign._id !== this.props.selectedCampaign._id) {
      //   this.props.dispatch(getSelectedCampaign(this.props.selectedCampaign._id))
      // }
    }

    render() {
      console.log('RENDER', this.props.emails)
      if (!this.props.loggedIn) {
          return <Redirect to="/" />;
      }

      const recruitmodal = this.props.recruitModal ? <RecruitModal /> : ''
      const commentmodal = this.props.commentModal ? <CommentModal /> : ''
      const createEmailModal = this.props.createEmailModal ? <CreateEmailModal /> : ''

      return (
        <div>
        {
          this.props.currentUser && this.props.emails ?
          <div className="grid">
            <Navbar />
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
          </div>
      );
    }
}

const mapStateToProps = state => ({
    recruitModal: state.modal.recruitModal,
    commentModal: state.modal.commentModal,
    createEmailModal: state.modal.createEmailModal,
    loggedIn: state.user.authToken !== null,
    currentUser: state.user.currentUser,
    emails: state.email.emails,
    selectedCampaign: state.email.selectedCampaign,
    socket: state.io.socket
});

export default connect(mapStateToProps)(Dashboard);
