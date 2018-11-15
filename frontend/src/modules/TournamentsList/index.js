import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddTeam from '../AddTeam';
import CreateTournament from '../CreateTournament';
import Header from '../Header';
import * as B from '@blueprintjs/core';
import './styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

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

  checkDate(t_date) {
    for (var i = 0; i < t_date.length; i++) {
      t_date[i] = parseInt(t_date[i], 10);
    }
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    if (year == t_date[0]) {
      if (month == t_date[1]) {
        if (date <= t_date[2]) {
          return 1;
        } else {
          return 0;
        }
      } else if (month < t_date[1]) {
        return 1;
      }
    } else if (year < t_date[0]) {
      return 1;
    }
    return 0;
  }

  render() {
    var monthList = {
      '1': 'Jan',
      '2': 'Feb',
      '3': 'Mar',
      '4': 'Apr',
      '5': 'May',
      '6': 'Jun',
      '7': 'Jul',
      '8': 'Aug',
      '9': 'Sept',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };
    if (this.state.isLoaded && !this.state.error) {
      var presentTlist = [];
      var pastTlist = [];
      this.state.items.forEach(item => {
        var e_date = item.end_date.split('-');
        var s_date = item.start_date.split('-');
        item['date'] = { date: s_date[2], month: monthList[s_date[1]] };
        var flag_present = this.checkDate(e_date);
        if (flag_present) {
          presentTlist.push(item);
        } else {
          pastTlist.push(item);
        }
      });

      return (
        <div>
          <Header />
          <div className="container">
            <div className="tournament-list-container">
              <h3 className="titles"> Upcoming Tournaments </h3>
              <hr className="orange_line" />
              <div>
                {presentTlist.map(item => (
                  <Link to="/tournament">
                    <div className="tournament_div" key={item.id}>
                      <div className="present_date_box">
                        <p className="month"> {item.date.month} </p>
                        <p className="date"> {item.date.date} </p>
                      </div>
                      <div className="current_tournament_box">
                        <p className="tournament_name"> {item.name} </p>
                        <p className="tournament_name"> {item.location} </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div>
                <h3 className="titles"> Past Tournaments </h3>
                <hr className="orange_line" />
                {pastTlist.map(item => (
                  <div className="tournament_div" key={item.id}>
                    <div className="present_date_box">
                      <p className="month"> {item.date.month} </p>
                      <p className="date"> {item.date.date} </p>
                    </div>
                    <div className="current_tournament_box">
                      <p className="tournament_name"> {item.name} </p>
                      <p className="tournament_name"> {item.location} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="right-container">
              <button
                style={{
                  width: '100%',
                  backgroundColor: '#ffaf3c',
                  fontSize: 24,
                  color: 'white',
                  paddingTop: 10,
                  paddingBottom: 10
                }}
                onClick={() => this.setState({ isModalOpen: true })}
              >
                Create New Tournament
              </button>
              <div>
                <h3 className="titles"> Search Tournaments </h3>
                <hr className="orange_line" />
                <div
                  style={{
                    fontSize: 24
                  }}
                  class="bp3-input-group bp3-large .modifier"
                >
                  <span class="bp3-icon bp3-icon-search" />
                  <input
                    style={{ fontSize: 24, paddingLeft: 50 }}
                    type="text"
                    class="bp3-input"
                    placeholder="Search"
                  />
                  <button class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" />
                </div>
                <br />
                <div>
                  <h3 className="titles"> Master Calendar </h3>
                  <hr className="orange_line" />
                  <div style={{ height: 400, backgroundColor: '#a09f9d' }} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <B.Dialog
              isOpen={this.state.isModalOpen}
              onClose={this._handleClose}
              title="Create a Tournament"
            >
              <CreateTournament onSubmit={data => this._onSubmit(data)} />
            </B.Dialog>
          </div>
        </div>
      );
    } else {
      return 'Loading...';
    }
  }

  _onSubmit(data) {
    fetch('http://localhost:8000/tournaments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(response => response.json())
      .then(result => console.log('Success:', result))
      .catch(error => console.error('Error:', error));
  }

  _handleClose = () => this.setState({ isModalOpen: false });
}
export default TournamentList;
