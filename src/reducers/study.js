import { GET_STUDY_CARDS, GET_STUDY_CARDS_ASYNC, TAKE_STUDY_CARD, REVEAL_STUDY_CARD, MARK_CORRECT, MARK_INCORRECT, RESET_STUDY } from '../actions/types';
import { randomizeArray } from '../helpers';

const initialState = { remaining: [], currentCard: {}, revealed: false, correct: [], incorrect: [] };
export default function(state = initialState, action) {

	switch (action.type) {
		case GET_STUDY_CARDS: {
			
			if (action.payload) {
				const cards = action.payload.cards;
				let studyCards = randomizeArray(cards.slice());
				let currentCard = studyCards.pop();
				return  { ...state, remaining: studyCards, currentCard };
			}
			
			return state;

		}
		case GET_STUDY_CARDS_ASYNC: {
			const cards = action.payload.cards;
			let studyCards = randomizeArray(cards.slice());
			let currentCard = studyCards.pop();
			return  { ...state, remaining: studyCards, currentCard };
		}
		case TAKE_STUDY_CARD: {
			return {
				...state,
				currentCard: card,
				revealed: false,
				remaining: newRemaining
			}
		}
		case REVEAL_STUDY_CARD: {
			return {
				...state,
				revealed: true
			}
		}
		case MARK_CORRECT: {
			let { answeredCard, currentCard, remaining } = action.payload;
			return {
				...state,
				revealed: false,
				correct: [ ...state.correct, answeredCard],
				currentCard,
				remaining
			}
		}
		case MARK_INCORRECT: {
			let { answeredCard, currentCard, remaining } = action.payload;
			return {
				...state,
				revealed: false,
				incorrect: [ ...state.incorrect, answeredCard],
				currentCard,
				remaining
			}
		}
		case RESET_STUDY: {
			return initialState;
		}
	}

	return state;

}

