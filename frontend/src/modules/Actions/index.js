import {FETCH_TOURNAMENTS_START, FETCH_TOURNAMENTS_SUCCESS, 
       FETCH_TOURNAMENTS_FAILURE, ADD_TOURNAMENT_START,
       ADD_TOURNAMENT_SUCCESS, ADD_TOURNAMENTS_FAILURE} from './ActionTypes.js';

export const fetchTournaments = () => {
  return dispatch => {
    dispatch(fetchTournamentsStart);
    fetch('http://localhost:8000/tournaments/')
      .then(res => res.json())
      .then(res => dispatch(fetchTournamentsSuccess(res)))
      .catch(err => dispatch(fetchTournamentsFailure(err)));
  };
};

export const fetchTournamentsStart = () => {
  return {
    type: FETCH_TOURNAMENTS_START
  };
};

export const fetchTournamentsSuccess = tournaments => ({
  type: FETCH_TOURNAMENTS_SUCCESS,
  payload: tournaments
});

export const fetchTournamentsFailure = error => ({
  type: FETCH_TOURNAMENTS_FAILURE,
  payload: error
});

export const addTournament = data => {
  return dispatch => {
    dispatch(addTournamentStart);
    fetch('http://localhost:8000/tournaments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(res => res.json())
      .then(res => dispatch(addTournamentSuccess(res)))
      .catch(err => dispatch(addTournamentFailure(err)));
  };
};

export const addTournamentStart = () => ({
  type: ADD_TOURNAMENT_START
});

export const addTournamentSuccess = tournament => ({
  type: ADD_TOURNAMENT_SUCCESS,
  payload: tournament
});

export const addTournamentFailure = error => ({
  type: ADD_TOURNAMENTS_FAILURE,
  payload: error
});
