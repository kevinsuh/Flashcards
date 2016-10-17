import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK, CREATE_DECK, CREATE_CARD } from '../actions/types';

export default function(state = { all: [], deck: null }, action) {

	switch (action.type) {
		case FETCH_DECKS:
			return { ...state, all: action.payload };
		case FETCH_DECK:
			return { ...state, deck: action.payload };
		case CLEAR_DECK:
			return { ...state, deck: null };
		case CREATE_DECK:
			return { ...state, all: action.payload };
		case CREATE_CARD:
			return  { ...state, all: action.payload };
	}

	return state;

}