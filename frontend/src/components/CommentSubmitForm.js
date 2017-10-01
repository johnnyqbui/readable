import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { addComment } from "../actions";
import { Redirect } from "react-router-dom";

class CommentSubmitForm extends React.Component {
	state = {
		author: "",
		body: "",
		openSubmit: false,
		submitted: false
	};

	handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = e => {
		const details = {
			...this.state,
			id: shortid.generate(),
			timestamp: Date.now()
		};
		this.props.addComment(details);
		this.setState({
			submitted: true
		});
		e.preventDefault();
	};

	openSubmitComment = comment => {
		const { id, body } = comment;
		this.setState({
			id,
			body,
			openEdit: !this.state.openEdit
		});
	};

	render() {
		const { selectedCategory } = this.props;
		return this.state.submitted ? (
			<Redirect to={`/${selectedCategory}`} />
		) : (
			<div className="submit-comment">
				<h3>Add a comment</h3>
				<form onSubmit={this.handleSubmit} autoComplete="off">
					<label>
						Author:
						<input
							required
							name="author"
							type="text"
							value={this.state.author}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					<label>
						Body:
						<textarea
							required
							name="body"
							type="text"
							style={{ width: 300, height: 100 }}
							value={this.state.body}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { selectedCategory, postData } = state;
	console.log(postData)
	return {
		...selectedCategory
	};
};

const mapDispatchToProps = dispatch => ({
	addComment: details => dispatch(addComment(details))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentSubmitForm);