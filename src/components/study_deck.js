import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchDeck } from '../actions';

class StudyDeck extends Component {

	constructor(props) {
		super(props);
		this.state = {
			remainingCards: [],
			currentCard: {},
			revealed: false,
			correct: [],
			incorrect: []
		}
		this.revealCurrentCard = this.revealCurrentCard.bind(this);
	}

	componentWillMount() {
		this.props.fetchDeck(this.props.params.id);
	}

	revealCurrentCard() {
		console.log(`\n\n revealing current card`);
		this.setState({revealed: true})
	}

	renderStudyMode() {

		// copy over array
		const deck = this.props.deck;
		const remainingCards = deck.cards.slice();

		if (remainingCards.length > 0) {

			const card = remainingCards.pop();

			const studyQuestion = (
				<div>
					<h6 className="title-detail">Remaining: {this.state.remainingCards.length}</h6>
					<h6 className="title-detail">Correct: {this.state.correct.length}</h6>
					<h6 className="title-detail">Incorrect: {this.state.incorrect.length}</h6>
					<div
						className="offset-xs-3 col-xs-6 card-container study"
						key={card.id}
					>
						<div
							className="card study"
							>
							{card.question}
						</div>
					</div>
					<div className="offset-xs-3 col-xs-6 card-container study-button-container">
						{ this.state.revealed ? <button className="btn btn-primary">Correct / Incorrect</button> : <button className="btn btn-primary" onClick={this.revealCurrentCard}>Reveal</button> }
					</div>
				</div>
			);

			return studyQuestion;

		} else {
			// FINISHED STUDYING!
			return (
				<div>
					Congrats! Here are your scores...
				</div>
			);
		}

	}

	render() {

		const deck = this.props.deck;
		let deckTitle;

		if (deck) {
			deckTitle = `${deck.name} Study Mode`;
		} else {
			deckTitle = "Loading...";
		}

		return (
			<div className="container card-list" style={{ marginTop: "30px" }}>
				<h2>{deckTitle}</h2>
				{deck ? this.renderStudyMode() : ''}
			</div>
		);
	}

}

function mapStateToProps({ decks }) {
	return {
		deck: decks.deck
	}
}

export default connect(mapStateToProps, { fetchDeck })(StudyDeck);