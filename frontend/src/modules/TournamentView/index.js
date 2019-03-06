import { connect } from 'react-redux';
import { fetchTournaments } from '../Actions';
import TournamentView from './view';

const mapStateToProps = (state, ownProps) => {
  const tournamentId = ownProps.match.params.id;
  return {
    tournament: state.tournaments.find(t => t.id === tournamentId)
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTournaments: () => dispatch(fetchTournaments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentView);
