import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK, CREATE_DECK } from '../actions/types';

export default function(state = { all: [], deck: null }, action) {

	switch (action.type) {
		case FETCH_DECKS:
			console.log(`\n\n fetching decks?`);
			console.log(action.payload);
			return { ...state, all: action.payload };
		case FETCH_DECK:
			return { ...state, deck: action.payload };
		case CLEAR_DECK:
			return { ...state, deck: null };
		case CREATE_DECK:
			const newState = { ...state, all: action.payload }
			return newState;
	}

	return state;

}