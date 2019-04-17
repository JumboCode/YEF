import React, { Component } from 'react';
import { DatePicker } from '@blueprintjs/datetime';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import './styles.css';

class CreateTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
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
      start_date: this.state.startDate.toJSON().slice(0, 10),
      end_date: this.state.endDate.toJSON().slice(0, 10)
    });
    console.log(data);
    this.props.addTournament(data);
    this.setState({});
  };

  nameChange(event) {
    this.setState({ name: event.target.value });
  }
  startDateChange(date) {
    this.setState({ startDate: date });
  }
  numTeamsChange(event) {
    this.setState({ numTeams: event.target.value });
  }
  endDateChange(date) {
    this.setState({ endDate: date });
  }
  numRoundsChange(event) {
    this.setState({ numRounds: event.target.value });
  }
  locationChange(event) {
    this.setState({ location: event.target.value });
  }

  render() {
    const {
      name,
      location,
      startDate,
      endDate,
      numTeams,
      numRounds
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <ul class="flex">
          <p> Tournament Name: </p>
          <p>
            <input
              type="text"
              name="name"
              onChange={this.nameChange}
              value={name}
            />
          </p>

          <p> Location: </p>
          <p>
            <input
              type="text"
              name="location"
              onChange={this.locationChange}
              value={location}
            />
          </p>
          <div style={{ width: '50%' }}>
            <p> Start Date: </p>
            <DatePicker onChange={this.startDateChange} value={startDate} />
          </div>
          <br />
          <p> Number of Teams: </p>
          <p>
            <input type="text" name="numTeams" />
          </p>
          <div style={{ width: '50%' }}>
            <p> End Date: </p>
            <DatePicker onChange={this.endDateChange} value={endDate} />
          </div>
          <br />
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
