import React, { Component } from "react";
import "./styles.css"

class AddTeam extends Component {
    constructor(props) {
	super(props);
	this.state = {clubName: '', city: '', teamName: '', teamMembers: ''};

	this.clubNameChange = this.clubNameChange.bind(this);
	this.cityChange = this.cityChange.bind(this);
	this.teamNameChange = this.teamNameChange.bind(this);
	this.teamMembersChange = this.teamMembersChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    clubNameChange(event) {
	this.setState({clubName: event.target.value});
    }

    cityChange(event) {
	this.setState({city: event.target.value});
    }

    teamNameChange(event) {
	this.setState({teamName: event.target.value});
    }

    teamMembersChange(event) {
	this.setState({location: event.target.value});
    }

    handleSubmit(event) {
	console.log(this.state);
	event.preventDefault();
    }



    render() {

	return (<form onSubmit={this.handleSubmit}>
	<p> Club Name: </p>
	<p> <input type="text" name="clubName" value={this.state.clubName} onChange={this.clubNameChange}/> </p>

	<p> City: </p>
	<p> <input type="text" name="city" value={this.state.city} onChange={this.cityChange}/> </p>

	<p> Team Name: </p>
	<p> <input type="text" name="teamName" value={this.state.teamName} onChange={this.teamNameChange}/> </p>

	<p> Team Members: </p>
	<p> <input type="text" name="teamMembers" value={this.state.teamMembers} onChange={this.teamMembersChange}/> </p>

	<p> <input type="submit" value="Submit"/> </p>

	</form>
       );

    }
}

export default AddTeam;