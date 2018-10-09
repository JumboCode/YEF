import React, { Component } from "react";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: ''
		};
		this.props = {
			title: 'Sign In Page'
		}
		this.setEmail = this.setEmail.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.setConfirmPassword = this.setConfirmPassword.bind(this);
		this.sendSubmit = this.sendSubmit.bind(this);
	}

	setEmail(event) {
		this.setState({email: event.target.value});
	}

	setPassword(event) {
		this.setState({password: event.target.value});
	}

	setConfirmPassword(event) {
		this.setState({confirmPassword: event.target.value});
	}


	validate(email,password,conPas) {
		const emailRegex = RegExp(/.+\@.+\..+/);
		return {
			email: !emailRegex.test(email),
			password: (password === conPas) && password.length > 0
		};
	}
	
	sendSubmit() {
		console.log("email: " + this.state.email);
		console.log("password: " + this.state.password);
	}


	render() {
		const invalidInputClass = "error"; //class name assigned to input elements with invalid values
		const errors = this.validate(this.state.email, this.state.password, this.state.confirmPassword);

		return (
			<form>
				<label htmlFor="form-email-input"> Email: </label>
				<input
					id="form-email-input"
					className={errors.email ? invalidInputClass : ""} 
					type="text" 
					value={this.state.email} 
					placeholder="Enter email here" 
					onChange={this.setEmail} 
				/>
				<br/>
				<label htmlFor="form-pass-input"> Password: </label>
				<input 
					id="form-pass-input"
					className={errors.password ? invalidInputClass : ""} 
					type="password" 
					value={this.state.password} 
					placeholder="Enter password here" 
					onChange={this.setPassword} 
				/>
				<br/>
				<label htmlFor="form-pass-confirm-input"> Confirm Password: </label>
				<input
					id="form-pass-confirm-input"
					className={errors.password ? invalidInputClass : ""} 
					type="password" 
					value={this.state.confirmPassword}
					placeholder="Retype password here" 
					onChange={this.setConfirmPassword} 
				/>
				<br/>
				<button onClick={this.sendSubmit}>Submit</button>
			</form>

		);
	}


}


export default SignIn;