import React, { Component } from "react";
import "./styles.css"

class AddTeam extends Component {
    constructor(props) {
	super(props);
	this.state = {clubName: '', city: '', teamName: '', teamMembers1: '', teamMembers2: '', teamMembers3: ''};

	this.clubNameChange = this.clubNameChange.bind(this);
	this.cityChange = this.cityChange.bind(this);
	this.teamNameChange = this.teamNameChange.bind(this);
	this.teamMembers1Change = this.teamMembers1Change.bind(this);
	this.teamMembers2Change = this.teamMembers2Change.bind(this);
	this.teamMembers3Change = this.teamMembers3Change.bind(this);
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

    teamMembers1Change(event) {
	this.setState({teamMembers1: event.target.value});
    }

    teamMembers2Change(event) {
	this.setState({teamMembers2: event.target.value});
    }

    teamMembers3Change(event) {
	this.setState({teamMembers3: event.target.value});
    }

    handleSubmit(event) {
	console.log(this.state);
	event.preventDefault();
    }



    render() {

	return (<form onSubmit={this.handleSubmit}>
	<div className = "flex-container">

		
	<p> Add a Team </p>
		
	<p className = "input-label"> Club Name: 
	<input type="text" name="clubName" value={this.state.clubName} onChange={this.clubNameChange}/></p> 



	<p className= "input-label"> City: 
	<input type="text" name="city" value={this.state.city} onChange={this.cityChange}/></p>



	<p className = "input-label"> Team Name: 
	<input type="text" name="teamName" value={this.state.teamName} onChange={this.teamNameChange}/></p>



	<p className = "input-label"> Team Members: </p>
	<input type="text" name="teamMembers1" value={this.state.teamMembers1} onChange={this.teamMembers1Change}/>
	<input type="text" name="teamMembers2" value={this.state.teamMembers2} onChange={this.teamMembers2Change}/>
	<input type="text" name="teamMembers3" value={this.state.teamMembers3} onChange={this.teamMembers3Change}/>

	<p></p>
	<input type="submit" value="Submit"/> 
	</div>


	

	</form>
       );

    }
}

export default AddTeam;
