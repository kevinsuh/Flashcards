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