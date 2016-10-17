import { renderComponent , expect } from '../test_helper';
import DeckList from '../../src/components/deck_list';

describe('DeckList', () => {

	let component;
	beforeEach(() => {
		component = renderComponent(DeckList);
	})

	describe('html display', () => {

		it('is a deck list', () => {
			expect(component).to.have.class('card-list');
		});

		it('has container for cards', () => {
			expect(component.find('.card-container')).to.exist;
		});

		it('has new form for submitting decks', () => {
			expect(component.find('.add-card')).to.exist;
		});

	});

})