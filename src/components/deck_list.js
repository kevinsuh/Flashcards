import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearDeck } from '../actions';
import { Link } from 'react-router';
import DeckNew from './deck_new';

class DeckList extends Component {

	constructor(props) {
		super(props);
		// this.enterDeck = this.enterDeck.bind(this);
	}

	componentWillMount() {
		this.props.clearDeck();
	}

	displayDeck(deck, i) {

		const correctCards = deck.cards.filter(card => card.status === "correct");
		const incorrectCards = deck.cards.filter(card => card.status === "incorrect");
		const newCards = deck.cards.filter(card => card.status === "pristine");

		return (
			<div key={i} className="col-xs-4 col-lg-3 card-container">
				<Link to={`/decks/${deck.id}`} className="card click">
					<h2 className="title">{deck.name}</h2>
					<p>{deck.cards.length} cards total</p>
					<p className="detail">{correctCards.length} correct</p>
					<p className="detail">{incorrectCards.length} incorrect</p>
					<p className="detail">{newCards.length} new</p>
				</Link>
			</div>
		);

	}

	render() {

		return (
			<div className="card-list row">
				<h1 className="main-title">Decks</h1>
				{this.props.decks.map(this.displayDeck)}
				<DeckNew />
			</div>
		);

	}
}

function mapStateToProps({ decks }) {
	return {
		decks: decks.all
	}
}

export default connect(mapStateToProps, { clearDeck })(DeckList);