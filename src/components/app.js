import React, { Component } from 'react';
import DeckList from './deck_list';

export default class App extends Component {
	render() {
		return (
			<div className="app container">
				{this.props.children}
			</div>
		);
	}
}