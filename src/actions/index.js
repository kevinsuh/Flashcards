import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK, CREATE_DECK, CREATE_CARD, GET_STUDY_CARDS, TAKE_STUDY_CARD, REVEAL_STUDY_CARD, MARK_CORRECT, MARK_INCORRECT } from './types';
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

// study mode actions
export function getStudyCards(DeckId) {
	return (dispatch) => {
		const random = true;
		getDeck(DeckId, random).then((data) => {
			if (!data) {
				browserHistory.push(`/`);
			} else {

				// first one is current card
				let currentCard = data.cards.pop();

				dispatch({
					type: GET_STUDY_CARDS,
					payload: {
						remaining: data.cards,
						currentCard
					}
				});
			}
		})
	}
}

export function takeStudyCard(cards) {

	const card = cards[0];
	let newRemaining = cards.slice(1);

	return {
		type: GET_STUDY_CARD,
		payload: {
			card,
			newRemaining
		}
	};

}

export function revealStudyCard() {
	return {
		type: REVEAL_STUDY_CARD
	}
}

export function answerCard(answeredCard, cards, isCorrect) {
	const type = isCorrect ? MARK_CORRECT : MARK_INCORRECT;
	const newCard = cards[0];
	let newRemaining = cards.slice(1);
	return {
		type,
		payload: {
			answeredCard,
			currentCard: newCard,
			remaining: newRemaining
		}
	}
}
