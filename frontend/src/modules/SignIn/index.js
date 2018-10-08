import React, { Component } from "react";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.props = {
			title: 'Sign In Page'
		}
		this.setEmail = this.setEmail.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}

	setEmail(event) {
		this.setState({email: event.target.value});
	}

	setPassword(event) {
		this.setState({password: event.target.value});
	}

	validate(email,password) {
		const emailRegex = RegExp(/.+\@.+\..+/);
		return {
			email: !emailRegex.test(email),
			password: password.length === 0
		};
	}


	render() {
		const invalidInputClass = "error"; //class name assigned to input elements with invalid values
		const errors = this.validate(this.state.email, this.state.password);

		return (
			<form>
				<label>
					Email:
					<input 
						className={errors.email ? invalidInputClass : ""} 
						type="text" 
						value={this.state.email} 
						placeholder="Enter email here" 
						onChange={this.setEmail} 
					/>
				</label>
				<br/>
				<label>
					Password:
					<input 
						className={errors.password ? invalidInputClass : ""} 
						type="password" 
						value={this.state.password} 
						placeholder="Enter password here" 
						onChange={this.setPassword} 
					/>
				</label>
				<button>Submit</button>
			</form>

		);
	}


}


export default SignIn;