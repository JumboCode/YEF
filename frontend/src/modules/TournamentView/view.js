import React from 'react';
import AddTeam from '../AddTeam';
import Header from '../Header';
import './styles.css';

class TournamentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: props.tournament ? true : false,
      tournament: props.tournament,
      tabID: 'teams'
    };
  }
  componentDidMount() {
    console.log(this.props);
    const { tournament } = this.state;
    if (!tournament) {
      fetch(`http://localhost:8000/tournaments/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              tournament: result,
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
  }

  render() {
    const { tournament } = this.state;
    if (
      this.state.isLoaded &&
      !this.state.error &&
      this.state.tabID == 'teams'
    ) {
      return (
        <div>
          <Header />
          <br />

          <br />
          <div style={{ display: 'flex' }}>
            <button
              style={{
                width: '15%',
                backgroundColor: '#ffffff',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'details' })}
            >
              Details
            </button>
            <button
              style={{
                width: '15%',
                backgroundColor: '#e07f00',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'teams' })}
            >
              Teams
            </button>
            <button
              style={{
                width: '15%',
                backgroundColor: '#ffffff',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'results' })}
            >
              Results
            </button>
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
                    {this.state.tournament.teams.map(item => (
                      <tr key={item.name}>
                        <td className="row" style={{ fontSize: 24 }}>
                          {item.name}
                        </td>
                        <td className="row" style={{ fontSize: 24 }}>
                          {item.club_name}
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
    } else if (
      this.state.isLoaded &&
      !this.state.error &&
      this.state.tabID == 'details'
    ) {
      return (
        <div>
          <Header />
          <br />

          <br />
          <div style={{ display: 'flex' }}>
            <button
              style={{
                width: '15%',
                backgroundColor: '#e07f00',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'details' })}
            >
              Details
            </button>
            <button
              style={{
                width: '15%',
                backgroundColor: '#ffffff',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'teams' })}
            >
              Teams
            </button>
            <button
              style={{
                width: '15%',
                backgroundColor: '#ffffff',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'results' })}
            >
              Results
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, backgroundColor: 'white' }}>
              <div
                style={{
                  textAlign: 'left',
                  color: 'gray',
                  paddingTop: 20,
                  paddingLeft: 50
                }}
              >
                <h1>Starts: {this.state.tournament.start_date}</h1>
                <h1>Ends: {this.state.tournament.start_date}</h1>
                <h1>Number of Teams: {this.state.tournament.teams.length}</h1>
                {/*<h1>Number of Rounds: </h1>*/}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      this.state.isLoaded &&
      !this.state.error &&
      this.state.tabID == 'results'
    ) {
      return (
        <div>
          <Header />
          <br />

          <br />
          <div style={{ display: 'flex' }}>
            <button
              style={{
                width: '15%',
                backgroundColor: '#ffffff',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'details' })}
            >
              Details
            </button>
            <button
              style={{
                width: '15%',
                backgroundColor: '#ffffff',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'teams' })}
            >
              Teams
            </button>
            <button
              style={{
                width: '15%',
                backgroundColor: '#e07f00',
                fontSize: 24,
                color: 'black',
                paddingTop: 20,
                paddingBottom: 20,
                outline: 'none',
                borderWidth: 0
              }}
              onClick={() => this.setState({ tabID: 'results' })}
            >
              Schedule
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, backgroundColor: ' #797877' }}>
              <div
                style={{ textAlign: 'center', color: 'white', paddingTop: 20 }}
              >
                <h1>Schedule</h1>
              </div>
              <div style={{ padding: 40 }}>
                <table style={{ width: '100%', backgroundColor: 'white' }}>
                  <tbody>
                    <tr>
                      <th>Round</th>
                      <th>Proposition Team</th>
                      <th>Opposition Team</th>
                    </tr>
                    {tournament.rounds.map(round =>
                      round.matchups.map(matchup => (
                        <tr
                          key={matchup.id}
                          onClick={() =>
                            this.props.history.push(
                              `/enterResults/${tournament.id}/${round.id}/${
                                matchup.id
                              }`
                            )
                          }
                        >
                          <td className="row" style={{ fontSize: 24 }}>
                            {round.round}
                          </td>
                          <td className="row" style={{ fontSize: 24 }}>
                            {
                              tournament.teams.find(t => t.id == matchup.propID)
                                .name
                            }
                          </td>
                          <td className="row" style={{ fontSize: 24 }}>
                            {
                              tournament.teams.find(t => t.id == matchup.oppID)
                                .name
                            }
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
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
