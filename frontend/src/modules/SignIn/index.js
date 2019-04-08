import React, { Component } from 'react';
import './style.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.props = {
      title: 'Sign In Page'
    };
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.sendSubmit = this.sendSubmit.bind(this);
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  validate(email, password) {
    const emailRegex = RegExp(/.+\@.+\..+/);
    return {
      email: !emailRegex.test(email),
      password: password.length > 0
    };
  }

  sendSubmit() {
    console.log(`email: ${this.state.email}`);
    console.log(`password: ${this.state.password}`);
  }

  render() {
    const invalidInputClass = 'error'; // class name assigned to input elements with invalid values
    const errors = this.validate(this.state.email, this.state.password);

    return (
      <div className="back">
        <div className="form">
          <h1>Youth Educational Forum</h1>

          <label htmlFor="form-email-input">
            {' '}
            Email Address <br />{' '}
          </label>
          <input
            id="form-email-input"
            className={errors.email ? invalidInputClass : ''}
            type="text"
            value={this.state.email}
            placeholder="Enter email here"
            onChange={this.setEmail}
            style={{ width: 400 }}
          />
          <br />
          <label htmlFor="form-pass-input">
            {' '}
            Password <br />{' '}
          </label>
          <input
            id="form-pass-input"
            className={errors.password ? invalidInputClass : ''}
            type="password"
            value={this.state.password}
            placeholder="Enter password here"
            onChange={this.setPassword}
            style={{ width: 400 }}
          />
          <br />
          <br />
          <div className="linking">
            <button onClick={this.sendSubmit} className="button">
              Log In
            </button>
            <br />
            <p>Forgot Your Password?</p>
            <a href="/tournaments">Click here</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
