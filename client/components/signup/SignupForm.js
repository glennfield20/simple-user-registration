import React from 'react'
import timezones from '../../data/timezones'
import map from 'lodash/map'
import axios from 'axios'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import validateInput from '../../../server/shared/validations/signup'
import TextFieldGroup from  '../common/TextFieldGroup'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.checkUserExists = this.checkUserExists.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })	
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  onSubmit(e) {
    e.preventDefault()

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.props.history.push('/')
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      )
    }
  }

  checkUserExists(e) {
    const field =  e.target.name
    const val = e.target.value

    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors     
        let invalid

        if (res.data.user) {
          errors[field] = 'There is user with such ' + field
          invalid = true
        } else {
          errors[field] = ''
          invalid = false
        }
        this.setState({ errors, invalid })
      })
    }
  }

  render () {
    const { errors } = this.state

    const options = map(timezones, (val, key) => 
      <option key={val} value={val}>{key}</option>
    )

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

        <TextFieldGroup 
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          value={this.state.username}
          field="username"
          checkUserExists={this.checkUserExists}
        />

      <TextFieldGroup 
        error={errors.email}
        label="Email"
        onChange={this.onChange}
        value={this.state.email}
        field="email"
        type="email"
        checkUserExists={this.checkUserExists}
      />

    <TextFieldGroup 
      error={errors.password}	
      label="Password"
      onChange={this.onChange}
      value={this.state.password}
      field="password"
      type="password"
    />

  <TextFieldGroup 
    error={errors.passwordConfirmation}
    label="Password Confirmation"
    onChange={this.onChange}
    value={this.state.passwordConfirmation}
    field="passwordConfirmation"
    type="password"
  />

<div className={ classnames("form-group", { 'has-error': errors.timezone }) }>
  <label className="control-label">Timezone</label>
  <select
    className="form-control"
    name="timezone"
    onChange={this.onChange}
    value={this.state.timezone}
  >
    <option value="">Choose Your Timezone</option>
    {options}
  </select>
  { errors.timezone && <span className='help-block'>{ errors.timezone }</span> }
</div>

<div className="form-group">
  <button disabled={this.state.isLoading || this.state.invalid } className="btn btn-primary btn-lg">
    Sign up
  </button>
</div>
      </form>
    )
  }
}

SignupForm.propsTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

export default SignupForm
