import React from 'react';
import AddTeam from '../AddTeam';
import Header from '../Header';
import './styles.css';

class TournamentView extends React.Component {
  render() {
    const { tournamentName, tournamentId } = this.props;
    return (
      <div>
        <Header />
        <br />
        <div style={{ margin: 20 }}>
          <h1>Tufts Halloween Invitational</h1>
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
                <tr>
                  <th>Team Name</th>
                  <th>Club</th>
                  <th>City</th>
                </tr>
                <tr>
                  <td className="row" style={{ fontSize: 24 }}>
                    Tufts A
                  </td>
                  <td className="row" style={{ fontSize: 24 }}>
                    Tufts University
                  </td>
                  <td className="row" style={{ fontSize: 24 }}>
                    Medford, MA
                  </td>
                </tr>
                <tr>
                  <td className="row" style={{ fontSize: 24 }}>
                    Tufts B
                  </td>
                  <td className="row" style={{ fontSize: 24 }}>
                    Tufts University
                  </td>
                  <td className="row" style={{ fontSize: 24 }}>
                    Medford, MA
                  </td>
                </tr>
                <tr>
                  <td className="row" style={{ fontSize: 24 }}>
                    Tufts C
                  </td>
                  <td className="row" style={{ fontSize: 24 }}>
                    Tufts University
                  </td>
                  <td className="row" style={{ fontSize: 24 }}>
                    Medford, MA
                  </td>
                </tr>
                <tr>
                  <td className="row" style={{ fontSize: 24 }}>
                    Tufts D
                  </td>
                  <td className="row" style={{ fontSize: 24 }}>
                    Tufts University
                  </td>
                  <td className="row" style={{ fontSize: 24 }}>
                    Medford, MA
                  </td>
                </tr>
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
  }
}

export default TournamentView;
