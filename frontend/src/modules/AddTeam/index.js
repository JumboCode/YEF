import React, { Component } from 'react';
import * as B from '@blueprintjs/core';
import CreateTournament from '../CreateTournament';
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
    event.preventDefault();

    fetch('http://localhost:8000/teams/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.teamName,
        city: this.state.city,
        clubName: this.state.clubName,
        member1: this.state.teamMember1,
        member2: this.state.teamMember2,
        member3: this.state.teamMember3,
        tournamentID: 2
      })
    });
    debugger;
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          style={{ paddingTop: 40, paddingBottom: 40 }}
        >
          <div className="flex-container">
            <p className="input-label2"> Club Name: </p>
            <input
              type="text"
              name="clubName"
              value={this.state.clubName}
              onChange={this.clubNameChange}
            />

            <div className="right-container">
              <button
                style={{
                  //width: '100%',
                  backgroundColor: '#ffaf3c',
                  fontSize: 24,
                  color: 'white',
                  paddingTop: 3,
                  paddingBottom: 3
                }}
                onClick={() => this.setState({ isModalOpen: true })}
              >
                +
              </button>
            </div>
            <div>
              <B.Dialog
                isOpen={this.state.isModalOpen}
                onClose={() => this.setState({ isModalOpen: false })}
                title="Clubs (Add)"
              >
                <CreateTournament />
              </B.Dialog>
            </div>
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
            <div className="flex-container2">
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTeam;
