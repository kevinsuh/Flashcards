import React, { Component } from 'react';
import DeckList from './deck_list';
import { connect } from 'react-redux';
import { fetchDecks, fetchDeck, getStudyCardsAsync } from '../actions';

class App extends Component {

	componentWillMount() {
		// initial page load data
		if (this.props.params.id) {
			this.props.fetchDecks("all", this.props.params.id);
			this.props.getStudyCardsAsync(this.props.params.id);
		} else {
			this.props.fetchDecks();
		}
	}

	render() {
		return (
			<div className="app container">
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps({ decks }) {
	return {
		decks
	}
}

export default connect(mapStateToProps, { fetchDeck, fetchDecks, getStudyCardsAsync })(App);