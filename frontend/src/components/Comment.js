import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import TiArrowSortedUp from "react-icons/lib/ti/arrow-sorted-up";
import TiArrowSortedDown from "react-icons/lib/ti/arrow-sorted-down";
import {
	updateVoteComment,
	editComment,
	deleteComment
} from "../actions";

class Comment extends Component {
	state = {
		id: null,
		body: "",
		edit: false
	};

	handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleEditComment = comment => {
		const { id, body } = comment;
		this.setState({
			id,
			body,
			edit: !this.state.edit
		});
	};

	handleSubmit = e => {
		const { id, body } = this.state;
		const { editComment } = this.props;
		const details = {
			id,
			body,
			timestamp: Date.now()
		};
		this.setState({
			edit: false
		});
		editComment(details);
		e.preventDefault();
	};

	render() {
		const { commentList, isFetching, updateVoteComment, deleteComment } = this.props;
		return (
			<div>
				{isFetching ? '' :
					commentList.map((comment, i) => {
						const { id, parentId, author, body, voteScore, timestamp } = comment;
						return (
							<div className="comments" key={i}>
								<div className="comment-options">
									<button onClick={e => this.handleEditComment(comment)}>
										Edit comment
									</button>
									<br />
									<button onClick={e => deleteComment(id)}>Delete</button>
								</div>
								{this.state.edit && this.state.id === id ? (
									<form onSubmit={this.handleSubmit} autoComplete="off">
										<label>
											Body:
											<textarea
												style={{ width: 300, height: 100 }}
												name="body"
												type="text"
												value={this.state.body}
												onChange={this.handleChange}
											/>
										</label>
										<br />
										<input type="submit" value="Submit" />
									</form>
								) : (
									<div>
										<p>{body}</p>
									</div>
								)}
								<span>
									<em>{author}</em> commented at{" "}
									{moment(timestamp)
										.format("MMM-DD-YYYY hh:mm A")
										.toString()}
								</span>
								<br />
								<div>
									<TiArrowSortedUp
										className="vote-icon"
										onClick={e => {
											const option = "upVote";
											return updateVoteComment(id, option);
										}}
									/>
									{voteScore}
									<TiArrowSortedDown
										className="vote-icon"
										onClick={e => {
											const option = "downVote";
											return updateVoteComment(id, option);
										}}
									/>
								</div>
							</div>
						);
					})}
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { commentData } = state;
	return {
		commentList: commentData.comments,
		isFetching: commentData.isFetching
	};
};

const mapDispatchToProps = dispatch => ({
	updateVoteComment: (id, option) => dispatch(updateVoteComment(id, option)),
	editComment: details => dispatch(editComment(details)),
	deleteComment: id => dispatch(deleteComment(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);