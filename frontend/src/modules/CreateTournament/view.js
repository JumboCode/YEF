import React, { Component } from 'react';
import './styles.css';

class CreateTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startDate: '',
      endDate: '',
      numTeams: '',
      location: '',
      numRounds: ''
    };
    this.nameChange = this.nameChange.bind(this);
    this.startDateChange = this.startDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.numTeamsChange = this.numTeamsChange.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.numRoundsChange = this.numRoundsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = JSON.stringify({
      name: this.state.name,
      location: this.state.location,
      start_date: this.state.startDate,
      end_date: this.state.endDate
    });
    this.props.addTournament(data);
    this.setState({});
  };

  nameChange(event) {
    this.setState({ name: event.target.value });
  }
  startDateChange(event) {
    this.setState({ startDate: event.target.value });
  }
  numTeamsChange(event) {
    this.setState({ numTeams: event.target.value });
  }
  endDateChange(event) {
    this.setState({ endDate: event.target.value });
  }
  numRoundsChange(event) {
    this.setState({ numRounds: event.target.value });
  }
  locationChange(event) {
    this.setState({ location: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul class="flex">
          <p> Tournament Name: </p>
          <p>
            <input
              type="text"
              name="name"
              onChange={this.nameChange}
              value={this.state.name}
            />
          </p>

          <p> Location: </p>
          <p>
            <input
              type="text"
              name="location"
              onChange={this.locationChange}
              value={this.state.location}
            />
          </p>

          <u2 class="flex2">
            <u2>
              <p> Start Date: </p>
              <p>
                <input
                  type="text"
                  name="startDate"
                  onChange={this.startDateChange}
                  value={this.state.startDate}
                />
              </p>
            </u2>

            <u2>
              <p> Number of Teams: </p>
              <p>
                <input type="text" name="numTeams" />
              </p>
            </u2>
          </u2>

          <p> End Date: </p>
          <p>
            <input
              type="text"
              name="endDate"
              onChange={this.endDateChange}
              value={this.state.endDate}
            />
          </p>

          <p> Number of Rounds: </p>
          <p>
            <input type="text" name="numRounds" />
          </p>

          <p>
            <input type="submit" value="Create" />
          </p>
        </ul>
      </form>
    );
  }
}

export default CreateTournament;
