import React, { Component } from 'react';

export default class Card extends Component {

	constructor(props) {
		super(props);
		this.state = { question: true }
	}

	flipCard() {
		this.setState({ question: !this.state.question });
	}

	render() {

		const { card } = this.props;

		return (
			<div
				className="col-xs-3 card-container"
				key={card.id}
			>
				<div
					onClick={this.flipCard.bind(this)}
					className={`card click ${ this.state.question ? 'question' : 'answer'}`}
					>
					{ this.state.question ? card.question : card.answer }
				</div>
			</div>
		);

	}

}