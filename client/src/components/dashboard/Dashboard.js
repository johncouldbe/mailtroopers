import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RightSidebar from './right-sidebar/RightSidebar'
import LeftSidebar from './left-sidebar/LeftSidebar'
import Main from './main/Main'
import Navbar from '../navbar/Navbar'

import RecruitModal from '../modals/recruit-modal/RecruitModal'
import CommentModal from '../modals/comment-modal/CommentModal'

export class Dashboard extends Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }

    }

    render() {
      console.log('WENT OFF!', this.props);
      if (!this.props.loggedIn) {
          return <Redirect to="/" />;
      }

      const recruitmodal = this.props.recruitModal ? <RecruitModal /> : ''
      const commentmodal = this.props.commentModal ? <CommentModal /> : ''

      return (
          <div>
          <div className="grid">
            <Navbar />
            <LeftSidebar />
            <RightSidebar />
            <Main />
          </div>

          {recruitmodal}
          {commentmodal}
          </div>
      );
    }

}

const mapStateToProps = state => ({
    recruitModal: state.mailTrooper.recruitModal,
    commentModal: state.mailTrooper.commentModal,
    loggedIn: state.user.authToken !== null
});

export default connect(mapStateToProps)(Dashboard);
