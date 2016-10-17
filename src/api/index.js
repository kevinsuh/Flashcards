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

function randomizeArray(array) {

	let currentIndex = array.length;
	let temp;
	let randomIndex;

	while (currentIndex !== 0) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// swap random index with current element
		temp = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temp;

	}

	return array;

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

// mock REST api call to create a card
export const postCard = (props) => {

	let promise = asyncCall().then(() => {

		const decks = database.decks;
		const { question, answer, DeckId } = props;
		const newId = Math.floor(Math.random() * 100);

		// "pristine" means it has not been answered as correct or incorrect yet
		const newCard = {
			id: newId,
			question,
			answer,
			DeckId,
			status: "pristine"
		}

		// find deck and attach card to it
		decks.forEach((deck) => {
			if (deck.id == DeckId) {
				deck.cards.push(newCard);
			}
		});

		return database.decks;

	});

	return promise;
}