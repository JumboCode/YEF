import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as B from '@blueprintjs/core';
import CreateTournament from '../CreateTournament';
import Header from '../Header';
import './styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

class TournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      searchRes: []
    };
    this.updateSearchResults = this.updateSearchResults.bind(this);
  }

  componentDidMount() {
    const { fetchTournaments } = this.props;
    fetchTournaments();
  }

  updateSearchResults(event) {
    const { tournamentList } = this.props;
    let searchResults = [];
    if (event.target.value !== '') {
      searchResults = tournamentList.filter(tourn => {
        const tournName = tourn.name.toLowerCase();
        const searchVal = event.target.value.toLowerCase();
        return tournName.includes(searchVal);
      });
    }
    this.setState({ searchRes: searchResults });

    console.log(this.state);
  }

  checkDate(t_date) {
    for (let i = 0; i < t_date.length; i++) {
      t_date[i] = parseInt(t_date[i], 10);
    }
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    if (year === t_date[0]) {
      if (month === t_date[1]) {
        if (date <= t_date[2]) {
          return 1;
        }
        return 0;
      }
      if (month < t_date[1]) {
        return 1;
      }
    } else if (year < t_date[0]) {
      return 1;
    }
    return 0;
  }

  render() {
    const monthList = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sept',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    };

    const { loading, tournamentList } = this.props;
    const { searchRes, isModalOpen } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }

    const presentTlist = [];
    const pastTlist = [];
    tournamentList.forEach(item => {
      const e_date = item.end_date.split('-');
      const s_date = item.start_date.split('-');
      item.date = { date: s_date[2], month: monthList[s_date[1]] };
      const flag_present = this.checkDate(e_date);
      if (flag_present) {
        presentTlist.push(item);
      } else {
        pastTlist.push(item);
      }
    });

    tournamentList.forEach(item => {
      const e_date = item.end_date.split('-');
      const s_date = item.start_date.split('-');
      item.date = { date: s_date[2], month: monthList[s_date[1]] };
      const flag_present = this.checkDate(e_date);
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
            <div className="tournament-list-small-container">
              {presentTlist.length === 0 ? (
                <h2>No upcoming tournaments</h2>
              ) : (
                presentTlist.map(item => (
                  <Link to={`/tournaments/${item.id}`}>
                    <div className="tournament_div" key={item.id}>
                      <div className="present_date_box">
                        <p className="month">{item.date.month}</p>
                        <p className="date"> {item.date.date} </p>
                      </div>
                      <div className="current_tournament_box">
                        <p className="tournament_name"> {item.name} </p>
                        <p className="tournament_name"> {item.location} </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <h3 className="titles"> Past Tournaments </h3>
            <hr className="orange_line" />
            <div className="tournament-list-small-container2">
              {pastTlist.length === 0 ? (
                <h2>No past tournaments</h2>
              ) : (
                pastTlist.map(item => (
                  <Link to={`/tournaments/${item.id}`}>
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
                ))
              )}
            </div>
          </div>
          <div className="right-container">
            <button
              style={{
                width: '100%',
                backgroundColor: '#ffaf3c',
                fontSize: 20,
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
                className="bp3-input-group bp3-large .modifier"
              >
                <span className="bp3-icon bp3-icon-search" />
                <input
                  style={{ fontSize: 24, paddingLeft: 50 }}
                  type="text"
                  className="bp3-input"
                  placeholder="Search"
                  onChange={this.updateSearchResults}
                />
                <div className="search-results-container">
                  {searchRes.map(item => (
                    <Link to={`/tournaments/${item.id}`} key={item.id}>
                      <p>{item.name}</p>
                    </Link>
                  ))}
                </div>

                <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" />
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
            isOpen={isModalOpen}
            onClose={() => this.setState({ isModalOpen: false })}
            title="Create a Tournament"
          >
            <CreateTournament />
          </B.Dialog>
        </div>
      </div>
    );
  }
}

TournamentList.propTypes = {
  tournamentList: PropTypes.instanceOf(Array).isRequired,
  fetchTournaments: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default TournamentList;
