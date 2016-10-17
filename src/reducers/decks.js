import { FETCH_DECKS } from '../actions/types';

export default function(state = { all: [], deck: null }, action) {

	switch (action.type) {
		case FETCH_DECKS:
			return { ...state, all: action.payload };
	}

	return state;

}