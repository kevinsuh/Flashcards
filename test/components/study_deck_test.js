import { renderComponent , expect } from '../test_helper';
import StudyDeck from '../../src/components/study_deck';
import database from '../../src/storage';
import { randomizeArray } from '../../src/helpers';

// id 1 is math deck
let deck;
for (var i = 0; i < database.decks.length; i++) {
	if (database.decks[i].id == 1) {
		deck = database.decks[i];
		break;
	}
}

let studyCards = deck.cards.slice();
let currentCard = studyCards.pop();

const state = { decks: { all: database.decks, deck }, study: { remaining: studyCards, currentCard, correct: [], incorrect: [], revealed: false } };

describe('StudyDeck', () => {

	let component;
	beforeEach(() => {

		component = renderComponent(StudyDeck, { instantiated: true, params: { id: 1 } }, state);

	});

	describe('html display', () => {

		it('is a study deck', () => {
			console.log(component);
			expect(component).to.have.class('study-deck');
		});

	});

	// properly goes through 
	describe('spacing algorithm', () => {

		it('properly goes through study mode', () => {

			// click through each step should work until we reach end of study mode
			let remaining = studyCards.slice();
			let card = { ...currentCard }
			
			while (remaining.length > 0) {

				// for each study card...
				// starts as question
				// revealed => answer
				// correct => next question
				// repeat for each of the cards

				expect(component.find('.card.study')).to.have.text(card.question);
				component.find('button.reveal').simulate('click');
				expect(component.find('.card.study')).to.have.text(card.answer);
				component.find('button.correct').simulate('click');
				
				card = remaining[0];
				remaining = remaining.slice(1);

			}


		})

	});

	

});

/*

describe('html display', () => {

		it('is a deck', () => {
			expect(component).to.have.class('deck');
		});

		it('has new form for submitting cards', () => {
			expect(component.find('.add-card')).to.exist;
		});

		it('is the math deck', () => {
			expect(component).to.contain("Math");
		});

		it('should have form', () => {
			// click add card form then continue
			component.find('.add-card').simulate('click');
			expect(component.find('.card-form')).to.exist;
		});

	});

	describe('adding a card', () => {

		beforeEach(() => {
			component.find('.add-card').simulate('click');
			// fill in info
			component.find("input[name=question]").simulate('change', "What color is the sky?");
			component.find("input[name=answer]").simulate('change', "Blue");
			// component.find('textarea').simulate('change', comment);
		});

		it('should have question value', () => {
			expect(component.find('input[name=question]')).to.have.value("What color is the sky?");
		});

		it('should have answer value', () => {
			expect(component.find('input[name=answer]')).to.have.value("Blue");
		});

		it('should empty after submit', () => {
			component.find('.card-form').simulate('submit');
			expect(component.find('input[name=answer]')).to.have.value("");
		});

		it('create a card on submit', () => {
			component.find('.card-form').simulate('submit');
			expect(component.find('.card-list')).to.contain("What color is the sky");
		})

	});

 */