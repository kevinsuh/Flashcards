import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK } from './types';
import { getDecks, getDeck } from '../api';

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

export function fetchDeck(id) {

	// redux-thunk
	return (dispatch) => {
		getDeck(id).then((data) => {
			dispatch({
				type: FETCH_DECK,
				payload: data
			})
		})
	}

}

export function clearDeck() {
	return {
		type: CLEAR_DECK
	}
}