import { connect } from 'react-redux';
import {
  fetchTournaments,
  fetchTournamentsStart,
  fetchTournamentsSuccess,
  fetchTournamentsFailure
} from '../Actions';
import TournamentView from './view.js';

const mapStateToProps = (state, ownProps) => {
  const tournamentId = ownProps.match.params.id;
  return {
    tournament: state.tournaments.find(t => t.id === tournamentId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //fetchTournaments: () => dispatch(fetchTournaments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentView);
