const _$ = require('jquery');
const { jsdom } = require('jsdom');

// Set up testing environment to run like a browser in the command line (using jsdom)
// window must be set up before using ReactDOM
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = window.navigator;

// tell jQuery to use our simulated window
const $ = _$(global.window);

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const chai = require('chai');
const { expect } = require('chai');
const chaiJquery = require('chai-jquery');
const thunk = require('redux-thunk').default;
const { Provider } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const reducers = require('../src/reducers').default;

chaiJquery(chai, chai.util, $);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// this renders a given react component
function renderComponent(ComponentClass, props = {}, state = {}) {
	
	const componentInstance =  TestUtils.renderIntoDocument(
		<Provider store={createStoreWithMiddleware(reducers, state)}>
			<ComponentClass {...props} />
		</Provider>
	);

	return $(ReactDOM.findDOMNode(componentInstance));
	
}

// use jQuery to simulate events (click, change, etc.)
$.fn.simulate = function(eventName, value) {
	if (value) {
		this.val(value);
	}
	TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
