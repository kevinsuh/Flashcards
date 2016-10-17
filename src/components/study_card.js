import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { revealStudyCard, markIncorrect, answerCard, updateCardStatuses, resetStudy } from '../actions';

class StudyCard extends Component {

	constructor(props) {
		super(props);
		this.markCorrect = this.markCorrect.bind(this);
		this.markIncorrect = this.markIncorrect.bind(this);
		this.confirmStudy = this.confirmStudy.bind(this);
	}

	markCorrect() {
		const isCorrect = true;
		const { remaining, currentCard } = this.props.study;
		this.props.answerCard(currentCard, remaining, isCorrect);
	}

	markIncorrect() {
		const isCorrect = false;
		const { remaining, currentCard } = this.props.study;
		this.props.answerCard(currentCard, remaining, isCorrect);
	}

	// this is what updates correct/incorrect status with most recent study
	confirmStudy() {
		const { correct, incorrect } = this.props.study;
		this.props.resetStudy(); // clear study mode
		this.props.updateCardStatuses(correct, incorrect);
		browserHistory.push("/"); // back to home page w/ updated statuses
	}

	// calculate questions you got right this time around
	newlyCorrect(correct) {
		// the two statues of questions before
		let newlyCorrect = {
			pristine: [],
			incorrect: []
		}
		correct.forEach((card) => {
			if (card.status == "incorrect") newlyCorrect.incorrect.push(card);
			else if (card.status == "pristine") newlyCorrect.pristine.push(card);
		});
		return newlyCorrect;
	}

	// calculate questions you got wrong this time around
	newlyIncorrect(incorrect) {
		let newlyIncorrect = {
			pristine: [],
			correct: []
		}
		incorrect.forEach((card) => {
			if (card.status == "correct") newlyIncorrect.correct.push(card);
			else if (card.status == "pristine") newlyIncorrect.pristine.push(card);
		});
		return newlyIncorrect;
	}

	render() {

		const { remaining, correct, incorrect, revealed, currentCard } = this.props.study;
		// which questions did you get correct / incorrect this time around?
		const newlyCorrect = this.newlyCorrect(correct);
		const newlyIncorrect = this.newlyIncorrect(incorrect);

		// update redux state
		if (currentCard) {

			let options;
			if (revealed) {
				options = (
					<div>
						<button
							className="btn btn-success correct"
							style={{marginRight: "10px"}}
							onClick={this.markCorrect}
						>
							Correct
						</button>
						<button
							className="btn btn-danger incorrect"
							onClick={this.markIncorrect}
						>
							Incorrect
						</button>
					</div>
				);
			} else {
				options = (
					<button className="btn btn-primary reveal" onClick={this.props.revealStudyCard}>Reveal</button>
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
			
			// total correct / incorrect
			const totalCorrect = correct.length == 1 ? `${correct.length} question right` : `${correct.length} total questions right`;
			const totalIncorrect = incorrect.length == 1 ? `${incorrect.length} question wrong` : `${incorrect.length} total questions wrong`;

			// correct before / after
			const correctFromIncorrect = newlyCorrect.incorrect.length == 1 ? `${newlyCorrect.incorrect.length} question right that was wrong before` : `${newlyCorrect.incorrect.length} questions right that were wrong before`;
			const correctFromPristine = newlyCorrect.pristine.length == 1 ? `${newlyCorrect.pristine.length} new question right` : `${newlyCorrect.pristine.length} new questions right`;

			// incorrect before / after
			const incorrectFromCorrect = newlyIncorrect.correct.length == 1 ? `${newlyIncorrect.correct.length} question wrong that was right before` : `${newlyIncorrect.correct.length} questions wrong that were right before`;
			const incorrectFromPristine = newlyIncorrect.pristine.length == 1 ? `${newlyIncorrect.pristine.length} new question wrong` : `${newlyIncorrect.pristine.length} new questions wrong`;
			
			return (
				<div>
					Congrats!
					<p>
						You got {totalCorrect}.
					</p>
					<p>
						You got {totalIncorrect}.
					</p>
					{/* newly correct */}
					<p>
						You got {correctFromIncorrect}.
					</p>
					<p>
						You got {correctFromPristine}.
					</p>
				{/* newly incorrect */}
					<p>
						You got {incorrectFromCorrect}.
					</p>
					<p>
						You got {incorrectFromPristine}.
					</p>
					<button
						className="btn btn-success"
						onClick={this.confirmStudy}
					>
						Confirm
					</button>
				</div>
			);
		}

	}

}

function mapStateToProps({ study, decks }) {
	return {
		decks,
		study
	}
}

export default connect(mapStateToProps, { revealStudyCard, answerCard, updateCardStatuses, resetStudy })(StudyCard);