import React, { Component } from "react";


class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			email:'',
			password:''
		}
	}

	render() {
		return (
			<form>
				<label>
					Email:
					<input type="text" email={this.state.email} onChange={this.setEmail} />
				</label>
				<br/>
				<label>
					Password:
					<input type="password" email={this.state.password} onChange={this.setPassword} />
				</label>
			</form>

		);
	}

	setEmail(event) {
		this.setState({email: event.target.email});
	}

	setPassword(event) {
		this.setState({password: event.target.password});
	}
}


export default SignIn;