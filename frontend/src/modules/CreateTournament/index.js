import React, { Component } from "react";

class CreateTournament extends Component {
constructor(props) {
	super(props);
	this.state = {name: '', startdate: '', enddate: '', location: ''};

	this.nameChange = this.nameChange.bind(this);
	this.startdateChange = this.startdateChange.bind(this);
	this.enddateChange = this.enddateChange.bind(this);
	this.locationChange = this.locationChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
}

nameChange(event) {
	this.setState({name: event.target.value});
}

startdateChange(event) {
	this.setState({startdate: event.target.value});
}

enddateChange(event) {
	this.setState({enddate: event.target.value});
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
   	<p> Name:</p>
  	<input type="text" name="name" value={this.state.name} onChange={this.nameChange}/>

  	<p> Start Date: </p>
  	<input type="text" name="startdate" value={this.state.startdate} onChange={this.startdateChange}/>

  	<p> End Date: </p>
  	<input type="text" name="enddate" value={this.state.enddate} onChange={this.enddateChange}/>

  	<p> Location: </p>
  	<input type="text" name="location" value={this.state.location} onChange={this.locationChange}/>

  	 <input type="submit" value="Submit"/>

    </form>
  );

  }
}

export default CreateTournament;







