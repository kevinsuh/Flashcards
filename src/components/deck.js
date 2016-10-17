import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchDeck } from '../actions';
import Card from './card';
import CardNew from './card_new';

class Deck extends Component {

	componentWillMount() {
		this.props.fetchDeck(this.props.params.id);
	}

	renderDeck() {

		const deck = this.props.deck;

		const cardsList = deck.cards.map((card) => {

			return (
				<Card card={card} key={card.id} />
			);
		});

		return (
			<div className="card-list">
				{cardsList}
			</div>
		);
	}

	render() {

		const deck = this.props.deck;
		let deckTitle;

		if (deck) {
			deckTitle = `${deck.name} Deck`;
		} else {
			deckTitle = "Loading...";
		}

		return (
			<div className="container card-list" style={{ marginTop: "30px" }}>
				<Link to="/" className="btn btn-primary" style={{ float: "right" }}>
					Back to Index
				</Link>
				<h1 className="main-title">{deckTitle}</h1>
				{deck ? this.renderDeck() : ''}
				<CardNew DeckId={this.props.params.id}/>
			</div>
		);
	}

}

function mapStateToProps({ decks }) {
	return {
		deck: decks.deck
	}
}

export default connect(mapStateToProps, { fetchDeck })(Deck);