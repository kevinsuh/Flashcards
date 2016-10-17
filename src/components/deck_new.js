import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createDeck } from '../actions';

class DeckNew extends Component {

	constructor(props) {
		super(props);
		this.state = { showForm: false }
	}

	onSubmit(props) {

		const { name } = props;

		// check for unique name before submitting
		if (this.nameIsUnique(name)) {
			this.props.createDeck(props);
			this.props.resetForm();
		}

	}

	nameIsUnique(name) {

		const decks = this.props.decks;
		for (var i = 0; i < decks.length; i++) {
			const deck = decks[i];
			if (deck.name == name) {
				this.props.fields.name.valid = false;
				this.props.fields.name.error = "Must be unique";
				return false;
			}
		}
		return true;

	}

	showForm() {
		this.setState({ showForm: !this.state.showForm });
	}

	render() {

		let formDisplay;
		if (this.state.showForm) {
			formDisplay = this.renderForm();
		} else {
			formDisplay = (
				<div
					className="card click"
					style={{border: "2pt solid green"}}
					onClick={this.showForm.bind(this)}
				>
					<h2 style={{color: "green"}}>Add Deck</h2>
				</div>
			);
		}

		return (
			<div className="card-container col-xs-4 col-lg-3">
				{formDisplay}
			</div>
		);
	}

	renderForm() {

		const { fields: { name }, handleSubmit, createDeck } = this.props;

		return(

			<form className="card-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

				<div className={`form-group ${ name.touched && !name.valid ? 'has-danger' : ''}`} >
					<label>Name</label>
				  <input type="text" className="form-control" { ...name } />
				  { name.touched && name.error && <div className="text-help">{name.error}</div> }
				</div>

				<div style={{ textAlign: "center" }}>
					<input type="submit" className="btn btn-primary small-btn" style={{marginRight:"5px"}} value="Submit" />
					<button onClick={this.showForm.bind(this)} className="btn btn-danger small-btn">
							Cancel
						</button>
				</div>

			</form>
		);
	}

}

const validate = (values) => {

	const errors = {};

	if (!values.name) {
		errors.name = "Required";
	}

	return errors;
}

function mapStateToProps({ decks }) {
	return {
		decks: decks.all
	}
}

export default reduxForm({
	form: 'DeckNewForm',
	fields: ['name'],
	validate
}, mapStateToProps, { createDeck })(DeckNew);
