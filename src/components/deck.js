import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Deck extends Component {

	componentWillMount() {
		console.log(this.props.params.id);
	}

	renderDeck() {
		return (
			<div>DECK!</div>
		);
	}

	render() {
		const post = this.props.deck;
		return (
			<div>
				<div style={{ float: "right", margin: "10px 0" }}>
					<Link to="/" className="btn btn-primary">
						Back to Index
					</Link>
				</div>
				{post ? this.renderDeck() : <div>Loading...</div>}
			</div>
		);
	}

}

function mapStateToProps({ decks }) {
	return {
		deck: decks.deck
	}
}

export default connect(mapStateToProps)(Deck);