import React, { Component } from 'react';
import './styles.css';

class TournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/tournaments/')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            items: result,
            isLoaded: true
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      );
  }

  render() {
    if (this.state.isLoaded && !this.state.error) {
      console.log(this.state.items);
      return (
        <div>
          <h3>List of Available Tournaments</h3>

          <table>
            <tbody>
              {this.state.items.map(row => (
                <tr>
                  <td key={row.id}>{row.name}</td>
                  <td key={row.id}>{row.location}</td>
                  <td key={row.id}>{row.end_date}</td>
                  <td key={row.id}>{row.start_date}</td>
                </tr>
              ))}
              }
            </tbody>
          </table>
        </div>
      );
    } else {
      return 'Loading...';
    }
  }
}
export default TournamentList;
