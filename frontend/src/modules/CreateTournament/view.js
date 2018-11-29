import React, { Component } from 'react';
import './styles.css';

class CreateTournament extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('submitting');
    console.log(this.props);
    const data = JSON.stringify({
      name: this.getName.value,
      location: this.getLocation.value,
      start_date: this.getSDate.value,
      end_date: this.getEDate.value
    });
    console.log(data);
    this.props.addTournament(data);
    console.log(this.props);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul class="flex">
          <p> Tournament Name: </p>
          <p>
            <input
              type="text"
              name="name"
              ref={input => (this.getName = input)}
            />
          </p>

          <p> Location: </p>
          <p>
            <input
              type="text"
              name="location"
              ref={input => (this.getLocation = input)}
            />
          </p>

          <u2 class="flex2">
            <u2>
              <p> Start Date: </p>
              <p>
                <input
                  type="text"
                  name="startDate"
                  ref={input => (this.getSDate = input)}
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
              ref={input => (this.getEDate = input)}
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
