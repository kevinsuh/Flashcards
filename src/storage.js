// mock DB
const database = {

	decks: [
		{
			id: 1,
			name: "Math",
			cards: [
				{
					id: 1,
					DeckId: 1,
					question: "5+5",
					answer: "10",
					status: "correct"
				},
				{
					id: 2,
					DeckId: 1,
					question: "10-2",
					answer: "8",
					status: "incorrect"
				},
				{
					id: 3,
					DeckId: 1,
					question: "5*8",
					answer: "40",
					status: "pristine"
				},
				{
					id: 7,
					DeckId: 1,
					question: "15*10",
					answer: "150",
					status: "correct"
				}
			]
		},
		{
			id: 2,
			name: "Computer Science",
			cards: [
				{
					id: 4,
					DeckId: 2,
					question: "What is ReactJS?",
					answer: "React is an open-source JavaScript library that provides a view for data rendered as HTML.",
					status: "correct"
				},
				{
					id: 5,
					DeckId: 2,
					question: "What is a data structure?",
					answer: "A data structure is a specialized format for organizing and storing data. General data structure types include the array, linked list, and class.",
					status: "pristine"
				},
				{
					id: 6,
					DeckId: "What is the modulus operation?",
					question: "The modulus operation finds the remainder after division of one number by another",
					answer: "40",
					status: "pristine"
				}
			]
		}
	]

}

export default database;