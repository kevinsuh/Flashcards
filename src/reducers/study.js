import { GET_STUDY_CARDS, TAKE_STUDY_CARD, REVEAL_STUDY_CARD, MARK_CORRECT, MARK_INCORRECT } from '../actions/types';

export default function(state = { remaining: [], currentCard: {}, revealed: false, correct: [], incorrect: [] }, action) {

	switch (action.type) {
		case GET_STUDY_CARDS: {
			console.log(action.payload);
			let { remaining, currentCard } = action.payload;
			return  { ...state, remaining, currentCard };
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
	}

	return state;

}