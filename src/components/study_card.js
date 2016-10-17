import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { revealStudyCard, markIncorrect, answerCard } from '../actions';

class StudyCard extends Component {

	constructor(props) {
		super(props);
		this.markCorrect = this.markCorrect.bind(this);
		this.markIncorrect = this.markIncorrect.bind(this);
	}

	markCorrect() {
		const { remaining, currentCard } = this.props.study;
		const isCorrect = true;
		this.props.answerCard(currentCard, remaining, isCorrect);
	}

	markIncorrect() {
		const { remaining, currentCard } = this.props.study;
		const isCorrect = false;
		this.props.answerCard(currentCard, remaining, isCorrect);
	}

	render() {

		const { remaining, correct, incorrect, revealed, currentCard } = this.props.study;

		if (currentCard) {

			let options;
			if (revealed) {
				options = (
					<div>
						<button
							className="btn btn-success"
							style={{marginRight: "10px"}}
							onClick={this.markCorrect}
						>
							Correct
						</button>
						<button
							className="btn btn-danger"
							onClick={this.markIncorrect}
						>
							Incorrect
						</button>
					</div>
				);
			} else {
				options = (
					<button className="btn btn-primary" onClick={this.props.revealStudyCard}>Reveal</button>
				);
			}

			let cardContent = revealed ? currentCard.answer : currentCard.question;

			return (
				<div>
					<h6 className="title-detail">Remaining: {remaining.length}</h6>
					<h6 className="title-detail">Correct: {correct.length}</h6>
					<h6 className="title-detail">Incorrect: {incorrect.length}</h6>
					<div
						className="offset-xs-3 col-xs-6 card-container study"
					>
						<div
							className="card study"
							>
							{ cardContent }
						</div>
					</div>
					<div className="offset-xs-3 col-xs-6 card-container study-button-container">
						{ options }
					</div>
				</div>
			);

		} else {
			// FINISHED STUDYING!
			return (
				<div>
					Congrats! Here are your scores...
				</div>
			);
		}

	}

}

function mapStateToProps({ study, decks }) {
	return {
		study
	}
}

export default connect(mapStateToProps, { revealStudyCard, answerCard })(StudyCard);