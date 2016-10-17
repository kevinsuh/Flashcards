import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK } from '../actions/types';

export default function(state = { all: [], deck: null }, action) {

	switch (action.type) {
		case FETCH_DECKS:
			return { ...state, all: action.payload };
		case FETCH_DECK:
			return { ...state, deck: action.payload };
		case CLEAR_DECK:
			return { ...state, deck: null };
	}

	return state;

}