import React, {Component} from 'react'
import {Field, reduxForm, focus} from 'redux-form'
import {registerUser, logInUser} from '../../../actions/user'
import {Link} from 'react-router-dom'

import Input from '../../input/Input'
import {required, nonEmpty, matches,
       length, isTrimmed, email} from '../../../validators'


import './SignUp.css'

class SignUp extends Component {
  onSubmit(values) {
        const {firstName, lastName, email, password} = values
        const user = {firstName, lastName, email, password}
        return this.props
            .dispatch(registerUser(user))
            .then(() => {
              this.props.dispatch(logInUser(email, password))
            });
    }


  render() {
    return (
        <div className="modal-window">
          <div className="modal center-text">
            <Link to="/">
              <div className="modal-close"></div>
            </ Link>
            <div className="h3 grey-text">Sign Up</div>
            <div className="p red-text">{this.props.regErr}</div>
            <form
              className="login-form"
              onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
              <label htmlFor="firstName" className="grey-text h4">First name</label>
                <Field
                component={Input}
                type="text"
                name="firstName"
                validate={[required, nonEmpty, isTrimmed]}
              />
              <label htmlFor="lastName" className="grey-text h4">Last name</label>
                <Field
                  component={Input}
                  type="text"
                  name="lastName"
                  validate={[required, nonEmpty, isTrimmed]}
                />
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
                    validate={[required, length({min: 3, max: 72}), isTrimmed]}
                />
              <label htmlFor="passwordConfirm" className="grey-text h4">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matches('password')]}
                />
              <div className="btn-container">
                <button
                  className="btn"
                  type="submit"
                  disabled={this.props.pristine || this.props.submitting}
                >
                  Register
                </button>
              </div>
              <Link to="/login">
                <div className="grey-text p">Already have an account? Log in</div>
              </Link>
            </ form>
          </div>
        </div>
    )
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(SignUp)
