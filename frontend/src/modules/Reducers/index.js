let error;

const INITIAL_STATE = {
  tournamentList: { tournaments: [], error: null, loading: false },
  newTournament: { tournament: null, error: null, loading: false }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TOURNAMENT':
      return {
        ...state,
        newTournament: { tournament: null, error: null, loading: true }
      };
    case 'ADD_TOURNAMENT_SUCCESS':
      return {
        tournamentList: {
          tournaments: [...state.tournamentList.tournaments, action.payload],
          error: null,
          loading: false
        },
        newTournament: {
          tournament: action.payload,
          error: null,
          loading: false
        }
      };
    case 'ADD_TOURNAMENT_FAILURE':
      error = action.payload;
      return {
        ...state,
        newTournament: { tournament: null, error: error, loading: false }
      };

    case 'FETCH_TOURNAMENTS':
      return {
        ...state,
        tournamentList: { tournaments: [], error: null, loading: true }
      };
    case 'FETCH_TOURNAMENTS_SUCCESS':
      return {
        ...state,
        tournamentList: {
          tournaments: action.payload,
          error: null,
          loading: false
        }
      };
    case 'FETCH_TOURNAMENTS_FAILURE':
      error = action.payload;
      return {
        ...state,
        tournamentList: { tournaments: [], error: error, loading: false }
      };
    default:
      return state;
  }
};

export default reducer;
