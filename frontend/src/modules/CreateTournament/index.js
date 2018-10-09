import React, { Component } from "react";
import "./styles.css"

class CreateTournament extends Component {
constructor(props) {
	super(props);
	this.state = {name: '', startDate: '', endDate: '', location: ''};

	this.nameChange = this.nameChange.bind(this);
	this.startDateChange = this.startDateChange.bind(this);
	this.endDateChange = this.endDateChange.bind(this);
	this.locationChange = this.locationChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
}

nameChange(event) {
	this.setState({name: event.target.value});
}

startDateChange(event) {
	this.setState({startDate: event.target.value});
}

endDateChange(event) {
	this.setState({endDate: event.target.value});
}

locationChange(event) {
	this.setState({location: event.target.value});
}

handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }



  render() {
    return (<form onSubmit={this.handleSubmit}>
   	<p> Name: </p>
  	<p> <input type="text" name="name" value={this.state.name} onChange={this.nameChange}/> </p> 

  	<p> Start Date: </p>
  	<p> <input type="text" name="startDate" value={this.state.startDate} onChange={this.startDateChange}/> </p>

  	<p> End Date: </p>
  	<p> <input type="text" name="endDate" value={this.state.endDate} onChange={this.endDateChange}/> </p>

  	<p> Location: </p>
  	<p> <input type="text" name="location" value={this.state.location} onChange={this.locationChange}/> </p>

	 <p> <input type="submit" value="Submit"/> </p>

	    </form>
  );

  }
}

export default CreateTournament;







