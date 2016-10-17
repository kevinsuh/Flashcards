/*
Mock REST backend
 */
import database from '../storage';

// simulate async call
const asyncCall = () => {
	let promise = new Promise((resolve) => {
		setTimeout(resolve, 500);
	});
	return promise;
}

// API calls
export const getDecks = (filter = 'all') => {
	let promise = asyncCall().then(() => {
		switch (filter) {
			case 'all':
				return database.decks;
		}
	});
	return promise;
}

export const getDeck = (id) => {
	let promise = asyncCall().then(() => {
		const decks = database.decks;
		for (var i = 0; i < decks.length; i++) {
			let deck = decks[i];
			if (deck.id == id) {
				return deck;
			}
		}
		return null;
	});
	return promise;
}

// REST mockup of creating a deck
export const postDeck = (props) => {

	let promise = asyncCall().then(() => {

		const decks = database.decks;
		const { name } = props;

		const deck = {
			name,
			cards: []
		};

		// unique deck id
		let MaxDeckId = 0;
		decks.forEach((deck) => {
			if (deck.id > MaxDeckId) {
				MaxDeckId = deck.id;
			}
		});
		deck.id = MaxDeckId + 1;

		database.decks.push(deck);

		return database.decks;

	});

	return promise;
}