import {
  FETCH_TOURNAMENTS_START,
  FETCH_TOURNAMENTS_SUCCESS,
  FETCH_TOURNAMENTS_FAILURE,
  ADD_TOURNAMENT_START,
  ADD_TOURNAMENT_SUCCESS,
  ADD_TOURNAMENTS_FAILURE
} from '../Actions/ActionTypes.js';

const INITIAL_STATE = {
  tournaments: [],
  error: null,
  loading: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TOURNAMENT_START':
      return {
        tournaments: state.tournaments,
        error: null,
        loading: true
      };
    case 'ADD_TOURNAMENT_SUCCESS':
      return {
        tournaments: [...state.tournaments, action.payload],
        error: null,
        loading: false
      };
    case 'ADD_TOURNAMENT_FAILURE':
      return {
        tournaments: state.tournaments,
        error: action.payload,
        loading: false
      };

    case 'FETCH_TOURNAMENTS_START':
      return {
        tournaments: state.tournaments,
        error: null,
        loading: true
      };
    case 'FETCH_TOURNAMENTS_SUCCESS':
      return {
        tournaments: action.payload,
        error: null,
        loading: false
      };
    case 'FETCH_TOURNAMENTS_FAILURE':
      return {
        tournaments: state.tournaments,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
