import React, {Component} from 'react'
import {Field, reduxForm, focus} from 'redux-form'
import {logInUser} from '../../../actions/user'
import {Link} from 'react-router-dom'

import Input from '../../input/Input'
import {required, nonEmpty,
       isTrimmed, email} from '../../../validators'


import './LogIn.css'

class LogIn extends Component {
  onSubmit(values) {
        const {email, password} = values
        return this.props
            .dispatch(logInUser(email, password))
    }

  render() {
    return (
        <div className="modal-window">
          <div className="modal center-text">
            <Link to="/">
              <div className="modal-close"></div>
            </ Link>
            <div className="h3 grey-text">Log In</div>
            <div className="p red-text">{this.props.err}</div>
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
              <div className="btn-container">
                <button
                  className="btn"
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

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) =>
        dispatch(focus('login', Object.keys(errors)[0]))
})(LogIn)
