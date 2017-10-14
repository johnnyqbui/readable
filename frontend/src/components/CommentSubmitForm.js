import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { addComment } from "../actions";

class CommentSubmitForm extends React.Component {
	state = {
		author: "",
		body: ""
	};

	handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = e => {
		const { parentId, addComment } = this.props;
		const details = {
			...this.state,
			parentId,
			id: shortid.generate(),
			timestamp: Date.now()
		};
		this.setState({
			author: "",
			body: ""
		});
		addComment(details);
		e.preventDefault();
	};

	render() {
		return (
			<div className="comment-submit">
				<h3>Add a comment</h3>
				<form onSubmit={this.handleSubmit} autoComplete="off">
					<label>
						<input
							required
							name="author"
							type="text"
							value={this.state.author}
							onChange={this.handleChange}
							placeholder="Author"
						/>
					</label>
					<br />
					<label>
						<textarea
							required
							name="body"
							type="text"
							value={this.state.body}
							onChange={this.handleChange}
							placeholder="Body"
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
	const { selectedCategory,  commentData } = state;
	return {
		...selectedCategory,
		parentId: commentData.parentId
	};
};

const mapDispatchToProps = dispatch => ({
	addComment: details => dispatch(addComment(details))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentSubmitForm);