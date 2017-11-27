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
              <div className="left-content"></div>
              <div className="right-content">
                <div className="h1 white-text left-content-header LP-H1">Collaborate as a Team</div>
                <div className="p white-text">Lets face it... We've been doing it wrong. But no longer.</div>
                <div className="p white-text">Now, your team has a place for reviewing your email marketing campaigns. You no longer have to forward an email to get others to review. No more confusing comment trains that build up in your inbox!</div>
                <Link to="/register">
                  <button className="home-screen-btn">
                    <span className="p white-text">Try It Out!</span>
                    </button>
                  </Link>
              </div>
            </section>
            <section>
              <div className="first-ribbon-side"></div>
              <div className="first-ribbon-end"></div>
              <div className="second-ribbon-start"></div>
            </section>
            <section className="taller-section">
              <div className="second-ribbon-side"></div>
              <div className="second-ribbon-end"></div>
              <div className="second-ribbon-end-bottom"></div>
              <div className="LP-List">
                <div className="h1 white-text center-text LP-H1">How it Works...</div>
                <div className="p white-text">
                  <ol>
                    <li>Create that awesome email on whatever email marketing
                    tool you're using. i.e. Mailchimp, Constant Contact, etc.</li>
                    <li>Create a new campaign in the app.</li>
                    <li>Send your email to the unique email address created for
                    you. Each time you send an email to that address a new version
                    will be created.</li>
                    <li>Add recruits to review your new campaign.</li>
                    <li>Rinse and repeat.</li>
                  </ol>
                </div>
              </div>
            </section>

          </main>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.user.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
