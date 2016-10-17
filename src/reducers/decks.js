import { FETCH_DECKS, FETCH_DECK, CLEAR_DECK, CREATE_DECK, CREATE_CARD, UPDATE_CARD_STATUSES } from '../actions/types';

export default function(state = { all: [], deck: null }, action) {

	switch (action.type) {
		case FETCH_DECKS:
			return { ...state, all: action.payload };
		case FETCH_DECK: {
			const id = action.payload;
			let deck = findDeck(id, state.all);
			return { ...state, deck };
		}
		case CLEAR_DECK:
			return { ...state, deck: null };
		case CREATE_DECK: {
			// unique deck id
			let MaxDeckId = 0;
			const newDeck = action.payload;
			state.all.forEach((deck) => {
				if (deck.id > MaxDeckId) {
					MaxDeckId = deck.id;
				}
			});
			newDeck.id = MaxDeckId + 1;
			return { ...state, all: [ ...state.all, newDeck ] };
		}
		case CREATE_CARD: {

			const card = action.payload;

			return {
				...state,
				deck: {
					...state.deck,
					cards: [ ...state.deck.cards, card ]
				}
			}
		}
		case UPDATE_CARD_STATUSES: {

			// these are the cards to update status
			let { correct, incorrect } = action.payload;
			const { deck } = state;

			correct = correct.map((card) => {
				return {
					...card,
					status: "correct"
				}
			});

			incorrect = incorrect.map((card) => {
				return {
					...card,
					status: "incorrect"
				}
			});

			let newDecks = state.all.slice();
			let updateDeck = findDeck(deck.id, newDecks);
			updateDeck.cards = [ ...correct, ...incorrect ];

			return {
				...state,
				all: newDecks
			}

		}
	}

	return state;

}

function removeDeck(decks, deck) {
	let deckIndex = 0;
	for (var i = 0; i < decks.length; i++) {
		if (decks[i].id == deck.id) {
			deckIndex = i;
			break;
		}
	}
	decks.splice(deckIndex, 1);
}

function findDeck(id, decks) {
	for (var i = 0; i < decks.length; i++) {
		if (decks[i].id == id) {
			return decks[i];
		}
	}
	return null;
}