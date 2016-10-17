import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK, CREATE_DECK, CREATE_CARD, GET_STUDY_CARDS, GET_STUDY_CARDS_ASYNC, TAKE_STUDY_CARD, REVEAL_STUDY_CARD, MARK_CORRECT, MARK_INCORRECT, UPDATE_CARD_STATUSES, RESET_STUDY } from './types';
import { getDecks, getDeck } from '../api';
import { browserHistory } from 'react-router';
import { randomizeArray } from '../helpers';

export function fetchDecks(filter = "all", id = null) {

	// redux-thunk
	return (dispatch) => {
		getDecks().then((data) => {
			dispatch({
				type: FETCH_DECKS,
				payload: data
			});
			if (id) {
				dispatch({
					type: FETCH_DECK,
					payload: id
				});
			}
		})
	}

}

export function createDeck(props) {

	const { name } = props;
	const deck = {
		name,
		cards: []
	};

	return {
		type: CREATE_DECK,
		payload: deck
	}
	
}

export function createCard(props) {

	// card data here
	const { question, answer, DeckId } = props;
	const newId = Math.floor(Math.random() * 100);
	const newCard = {
		id: newId,
		question,
		answer,
		DeckId,
		status: "pristine"
	}

	return {
		type: CREATE_CARD,
		payload: newCard
	};
	
}

export function fetchDeck(id) {
	return {
		type: FETCH_DECK,
		payload: parseInt(id)
	}
}

export function clearDeck() {
	return {
		type: CLEAR_DECK
	}
}

// study mode actions
export function getStudyCards(deck) {

	if (!deck) {
		return {
			type: GET_STUDY_CARDS
		}
	}

	const cards = deck.cards;
	let studyCards = randomizeArray(cards.slice());
	let currentCard = studyCards.pop();

	return {
		type: GET_STUDY_CARDS,
		payload: { studyCards, currentCard }
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

export function updateCardStatuses(correct, incorrect) {
	return {
		type: UPDATE_CARD_STATUSES,
		payload: {
			correct,
			incorrect
		}
	}
}

export function resetStudy() {
	return {
		type: RESET_STUDY
	}
}

export function getStudyCardsAsync(DeckId) {

	return (dispatch) => {
		const random = true;
		getDeck(DeckId, random).then((data) => {
			if (!data) {
				browserHistory.push(`/`);
			} else {
				const cards = data.cards;
				let studyCards = randomizeArray(cards.slice());
				let currentCard = studyCards.pop();
				dispatch({
					type: GET_STUDY_CARDS_ASYNC,
					payload: { studyCards, currentCard }
				});
			}

		})
	}

}
