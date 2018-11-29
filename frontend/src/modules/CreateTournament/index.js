import { connect } from 'react-redux';
import {
  addTournament,
  addTournamentStart,
  addTournamentSuccess,
  addTournamentFailure
} from '../Actions';
import CreateTournament from './view.js';

const mapStateToProps = state => {
  return {
    tournamentList: state.tournamentList.tournaments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTournament: data => dispatch(addTournament(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTournament);
