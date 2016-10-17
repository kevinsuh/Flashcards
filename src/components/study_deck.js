import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { takeStudyCard, getStudyCards, fetchDeck, revealStudyCard } from '../actions';
import StudyCard from './study_card';

class StudyDeck extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchDeck(this.props.params.id);
		this.props.getStudyCards(this.props.params.id);
	}

	render() {

		const deck = this.props.deck;
		let deckTitle;
		let deckBody;

		if (deck) {
			deckTitle = `${deck.name} Study Mode`;
			deckBody  = <StudyCard />;
		} else {
			deckTitle = "Loading...";
			deckBody  = '';
		}

		return (
			<div className="container card-list" style={{ marginTop: "30px" }}>
				<h2>{deckTitle}</h2>
				{deckBody}
			</div>
		);
	}

}

function mapStateToProps({ study, decks }) {
	return {
		study,
		deck: decks.deck
	}
}

export default connect(mapStateToProps, { getStudyCards, takeStudyCard, fetchDeck, revealStudyCard })(StudyDeck);