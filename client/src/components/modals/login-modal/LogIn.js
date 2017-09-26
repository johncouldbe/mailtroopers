import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, focus} from 'redux-form'
import {logInUser} from '../../../actions/user'
import {Link, Redirect} from 'react-router-dom'

import Input from '../../input/Input'
import {required, nonEmpty, matches,
       length, isTrimmed, email} from '../../../validators'


import './LogIn.css'

class LogIn extends Component {
  onSubmit(values) {
        const {email, password} = values
        return this.props
            .dispatch(logInUser(email, password))
    }
  componentWillReceiveProps(){
    console.log(this.props);
    if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
  }


  render() {
    return (
        <div className="modal-window">
          <div className="modal center-text">
            <Link to="/">
              <div className="modal-close"></div>
            </ Link>
            <div className="h3 grey-text">Log In</div>
            <div className="p red-text">{this.props.logErr}</div>
            <form
              className="login-form"
              onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>

              <label htmlFor="email" className="grey-text h4">Email</label>
                <Field
                  component={Input}
                  type="text"
                  name="email"
                  validate={[required, nonEmpty, isTrimmed, email]}
                />
              <label htmlFor="password" className="grey-text h4">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, isTrimmed]}
                />
              <div className="comment-btn-container">
                <button
                  className="comment-btn"
                  type="submit"
                  disabled={this.props.pristine || this.props.submitting}
                >
                  Log In
                </button>
              </div>
              <Link to="/register">
                <div className="grey-text p">Need an account? Sign Up</div>
              </Link>
            </ form>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
   return {
    logErr: state.user.logErr,
    loggedIn: state.user.currentUser
  }
}

LogIn = connect(mapStateToProps)(LogIn)

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) =>
        dispatch(focus('login', Object.keys(errors)[0]))
})(LogIn)
