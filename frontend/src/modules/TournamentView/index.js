import React from 'react';
import AddTeam from '../AddTeam';
import Header from '../Header';
import './styles.css';

class TournamentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch('http://localhost:8000/teams')
      .then(res => res.json())
      .then(
        result => {
          const link_id = this.props.match.params.id;
          this.setState({
            items: result.filter(r => r.tournamentID === parseInt(link_id, 10)),
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
      return (
        <div>
          <Header />
          <br />
          <div style={{ margin: 20 }}>
            <h1>Tournament ID: {this.props.match.params.id}</h1>
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ padding: 20 }}>
              <h2>Details</h2>
            </div>
            <div style={{ padding: 20, backgroundColor: '#e07f00' }}>
              <h2>Teams</h2>
            </div>
            <div style={{ padding: 20 }}>
              <h2>Results</h2>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, backgroundColor: ' #797877' }}>
              <div
                style={{ textAlign: 'center', color: 'white', paddingTop: 20 }}
              >
                <h1>Registered Teams</h1>
              </div>
              <div style={{ padding: 40 }}>
                <table style={{ width: '100%', backgroundColor: 'white' }}>
                  <tbody>
                    <tr>
                      <th>Team Name</th>
                      <th>Club</th>
                      <th>City</th>
                    </tr>
                    {this.state.items.map(item => (
                      <tr key={item.name}>
                        <td className="row" style={{ fontSize: 24 }}>
                          {item.name}
                        </td>
                        <td className="row" style={{ fontSize: 24 }}>
                          {item.clubName}
                        </td>
                        <td className="row" style={{ fontSize: 24 }}>
                          {item.city}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#e07f00' }}>
              <div
                style={{
                  textAlign: 'center',
                  color: 'white',
                  paddingTop: 20,
                  paddingBottom: 5
                }}
              >
                <h1>Add a team</h1>
              </div>
              <div style={{ backgroundColor: 'white', margin: 40 }}>
                <AddTeam />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return 'Loading...';
    }
  }
}

export default TournamentView;
