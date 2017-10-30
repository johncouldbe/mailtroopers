import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

import './LandingPage.css'

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
          <header>
            <div className="header-letter-left"></div>
            <div className="header-letter-right"></div>
            <div className="h1 white-text header-text">STOP SENDING MISTAKES</div>
          </header>
          <main>
            <section>
              <div className="first-ribbon-start"></div>
              <div className="left-content">
                <div className="h1 white-text left-content-header">Send Emails to the App to Review</div>
                <div className="p white-text">Lets face it... We've been doing it wrong. But no longer.</div>
                <div className="p white-text">Now, when we're reviewing our email marketing campaigns we can finally stop forwarding our emails to review and stop trying to follow those confusing comment trains that build up in our inbox!</div>
                <button className="home-screen-btn">
                  <Link to="/register">
                    <span className="p white-text">Try It Out!</span>
                    </Link>
                </button>
              </div>
            </section>
            <section>
              <div className="first-ribbon-side"></div>
              <div className="first-ribbon-end"></div>
              <div className="second-ribbon-start"></div>
            </section>

          </main>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.user.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
