import { FETCH_DECKS } from './types';
import { getDecks } from '../api';

export function fetchDecks(filter = "all") {

	// redux-thunk
	return (dispatch) => {
		getDecks().then((data) => {
			dispatch({
				type: FETCH_DECKS,
				payload: data
			})
		})
	}

}