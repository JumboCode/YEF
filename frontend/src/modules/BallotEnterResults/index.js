/* eslint-disable */
import { connect } from 'react-redux';
import {
  fetchTournaments,
  fetchTournamentsStart,
  fetchTournamentsSuccess,
  fetchTournamentsFailure
} from '../Actions';
import EnterResults from './view.js';

const mapStateToProps = (state, ownProps) => {
  const tournamentId = ownProps.match.params.tournamentId;
  const roundId = ownProps.match.params.roundId;
  const matchupId = ownProps.match.params.matchupId;
  let tournament, round, matchup, propTeam, oppTeam;
  if (state.tournaments) {
    tournament = state.tournaments.find(t => t.id == tournamentId);
    round = tournament.rounds.find(r => r.id == roundId);
    matchup = round.matchups.find(m => m.id == matchupId);
    propTeam = tournament.teams.find(t => t.id == matchup.propID);
    oppTeam = tournament.teams.find(t => t.id == matchup.oppID);
  }
  return {
    tournament,
    round,
    matchup,
    propTeam,
    oppTeam
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
)(EnterResults);
