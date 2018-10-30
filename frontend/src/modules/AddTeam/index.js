import React, { Component } from 'react';
import './styles.css';

class AddTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubName: '',
      city: '',
      teamName: '',
      teamMember1: '',
      teamMember2: '',
      teamMember3: ''
    };

    this.clubNameChange = this.clubNameChange.bind(this);
    this.cityChange = this.cityChange.bind(this);
    this.teamNameChange = this.teamNameChange.bind(this);
    this.teamMember1Change = this.teamMember1Change.bind(this);
    this.teamMember2Change = this.teamMember2Change.bind(this);
    this.teamMember3Change = this.teamMember3Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clubNameChange(event) {
    this.setState({ clubName: event.target.value });
  }

  cityChange(event) {
    this.setState({ city: event.target.value });
  }

  teamNameChange(event) {
    this.setState({ teamName: event.target.value });
  }

  teamMember1Change(event) {
    this.setState({ teamMember1: event.target.value });
  }

  teamMember2Change(event) {
    this.setState({ teamMember2: event.target.value });
  }

  teamMember3Change(event) {
    this.setState({ teamMember3: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ paddingTop: 40, paddingBottom: 40 }}
      >
        <div className="flex-container">
          <p className="input-label"> Club Name: </p>
          <input
            type="text"
            name="clubName"
            value={this.state.clubName}
            onChange={this.clubNameChange}
          />
        </div>

        <div className="flex-container">
          <p className="input-label"> City: </p>
          <input
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.cityChange}
          />
        </div>

        <div className="flex-container">
          <p className="input-label"> Team Name: </p>
          <input
            type="text"
            name="teamName"
            value={this.state.teamName}
            onChange={this.teamNameChange}
          />
        </div>

        <div className="flex-container">
          <p className="input-label"> Team Member 1: </p>
          <input
            type="text"
            name="teamMembers"
            value={this.state.teamMember1}
            onChange={this.teamMember1Change}
          />
        </div>

        <div className="flex-container">
          <p className="input-label"> Team Member 2: </p>
          <input
            type="text"
            name="teamMembers"
            value={this.state.teamMember2}
            onChange={this.teamMember2Change}
          />
        </div>

        <div className="flex-container">
          <p className="input-label"> Team Member 3: </p>
          <input
            type="text"
            name="teamMembers"
            value={this.state.teamMember3}
            onChange={this.teamMember3Change}
          />
        </div>

        <div className="flex-container">
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default AddTeam;
