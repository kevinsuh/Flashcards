import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createCard } from '../actions';

class CardNew extends Component {

	constructor(props) {
		super(props);
		this.state = { showForm: false }
	}

	onSubmit(props) {
		this.props.createCard({ ...props, DeckId: this.props.DeckId});
		this.props.resetForm();
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
					className="card click add-card"
					style={{border: "2pt solid green"}}
					onClick={this.showForm.bind(this)}
				>
					<h2 style={{color: "green"}}>Add Card</h2>
				</div>
			);
		}

		return (
			<div className="card-container col-xs-3">
				{formDisplay}
			</div>
		);
	}

	renderForm() {

		const { fields: { question, answer }, handleSubmit, createDeck } = this.props;

		return(

			<form className="card-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

				<div className={`form-group ${ question.touched && !question.valid ? 'has-danger' : ''}`} >
					<label>Question</label>
				  <input type="text" className="form-control" { ...question } />
				  { question.touched && question.error && <div className="text-help">{question.error}</div> }
				</div>

				<div className={`form-group ${ answer.touched && !answer.valid ? 'has-danger' : ''}`} >
					<label>Answer</label>
				  <input type="text" className="form-control" { ...answer } />
				  { answer.touched && answer.error && <div className="text-help">{answer.error}</div> }
				</div>

				<div style={{ textAlign: "center" }}>
					<div style={{marginBottom:"5px"}}>
						<input type="submit" className="btn btn-primary small-btn" value="Submit" />
					</div>
					<div>
						<button onClick={this.showForm.bind(this)} className="btn btn-danger small-btn">
							Cancel
						</button>
					</div>
				</div>

			</form>
		);
	}

}

const validate = (values) => {

	const errors = {};

	if (!values.question) {
		errors.question = "Required";
	}
	if (!values.answer) {
		errors.answer = "Required";
	}

	return errors;
}

export default reduxForm({
	form: 'CardNewForm',
	fields: ['question','answer'],
	validate
}, null, { createCard })(CardNew);
