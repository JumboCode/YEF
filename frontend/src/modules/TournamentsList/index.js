import { connect } from 'react-redux';
import {
  fetchTournaments,
  fetchTournamentsStart,
  fetchTournamentsSuccess,
  fetchTournamentsFailure
} from '../Actions';
import TournamentsList from './view.js';

const mapStateToProps = state => {
  return {
    tournamentList: state.tournamentList.tournaments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTournaments: () => dispatch(fetchTournaments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentsList);
