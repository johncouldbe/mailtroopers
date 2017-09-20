import React, {Component} from 'react'
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty, matches, length, isTrimmed} from '../../../validators';
import {registerUser} from '../../../actions/user';

import Input from '../../input/Input'


import './LogInSignUp.css'

class LogInSignUp extends Component {
  onSubmit(values) {
        const {firstName, lastName, email, password} = values;
        const user = {firstName, lastName, email, password};
        return this.props
            .dispatch(registerUser(user))
            // .then(() => this.props.dispatch(login(email, password)));
    }

  render() {
    return (
        <div className="modal-window">
          <div className="modal center-text">
            <div className="modal-close"></div>
            <div className="h3 grey-text">Sign Up</div>
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
                  validate={[required, nonEmpty, isTrimmed]}
                />
              <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, length({min: 3, max: 72}), isTrimmed]}
                />
              <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matches('password')]}
                />
              <button
                className="grey-text p"
                type="submit"
                disabled={this.props.pristine || this.props.submitting}>
                Register
              </button>
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
})(LogInSignUp)
