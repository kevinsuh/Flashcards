import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';

describe('App', () => {

	let component;
	beforeEach(() => {
		component = renderComponent(App);
	})

	it('has hello world', () => {
		expect(component).to.contain('hello world');
	})

})


