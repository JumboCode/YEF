import React, { Component } from 'react';

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#e07f00'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 200,
            paddingBottom: 200,
            paddingLeft: 150,
            paddingRight: 150,
            backgroundColor: 'white'
          }}
        >
          <form>
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
            <br />
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
            <button
              onClick={this.sendSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                fontSize: 16,
                color: 'white',
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 50,
                paddingRight: 50,
                outline: 'none',
                backgroundColor: '#e07f00'
              }}
            >
              Log In
            </button>
            <br />
            <p>Forgot Your Password?</p>
            <a href="/tournaments">Click here</a>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
