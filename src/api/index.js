/*
Mock REST backend
 */
import database from '../storage';
import { randomizeArray } from '../helpers';

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

export const getDeck = (id, random = false) => {
	let promise = asyncCall().then(() => {
		const decks = database.decks;
		for (var i = 0; i < decks.length; i++) {
			let deck = decks[i];
			if (deck.id == id) {

				if (random) {
					// run randomize function here
					deck.cards = randomizeArray(deck.cards);
					return deck;
				} else {
					return deck;
				}

			}
		}
		return null;
	});
	return promise;
}