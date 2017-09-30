import React, {Component} from 'react'
import {Field, reduxForm, focus} from 'redux-form'

import Input from '../../input/Input'
import {required, nonEmpty, isTrimmed} from '../../../validators'
import {createEmail} from '../../../actions/email'

import './CreateEmailModal.css'

class CreateEmailForm extends Component {
  onSubmit(values) {
    const {campaign} = values
    console.log(campaign);
    return this.props.dispatch(createEmail(campaign))
  }

  render() {
    return (
      <div>
        <form
          className="create-email-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
            <Field
              component={Input}
              type="text"
              name="campaign"
              validate={[required, nonEmpty, isTrimmed]}
            />
          <div className="btn-container">
            <button
              className="btn"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
            >
              Create
            </button>
          </div>
        </ form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'createEmail',
  onSubmitFail: (errors, dispatch) =>
        dispatch(focus('createEmail', Object.keys(errors)[0]))
})(CreateEmailForm)
