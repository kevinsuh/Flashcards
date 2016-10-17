import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK, CREATE_DECK } from './types';
import { getDecks, getDeck, postDeck } from '../api';
import { browserHistory } from 'react-router';

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

export function createDeck(props) {

	return (dispatch) => {
		postDeck(props).then((data) => {
			dispatch({
				type: CREATE_DECK,
				payload: data
			});
			browserHistory.push("/");
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