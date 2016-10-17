import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK, CREATE_DECK, CREATE_CARD } from './types';
import { getDecks, getDeck, postDeck, postCard } from '../api';
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

export function createCard(props) {

	return (dispatch) => {
		postCard(props).then((data) => {
			dispatch({
				type: CREATE_CARD,
				payload: data
			});
			browserHistory.push(`/decks/${props.DeckId}`);
		})
	}
	
}

export function fetchDeck(id) {

	// redux-thunk
	return (dispatch) => {
		getDeck(id).then((data) => {
			if (!data) {
				browserHistory.push(`/`);
			} else {
				dispatch({
					type: FETCH_DECK,
					payload: data
				})
			}
		})
	}

}

export function clearDeck() {
	return {
		type: CLEAR_DECK
	}
}