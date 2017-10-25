import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import TiArrowSortedUp from "react-icons/lib/ti/arrow-sorted-up";
import TiArrowSortedDown from "react-icons/lib/ti/arrow-sorted-down";
import {
	fetchComments,
	updateVoteComment,
	editComment,
	deleteComment
} from "../actions";
import CommentEditForm from "./CommentEditForm";

class Comment extends Component {
	state = {
		id: null,
		body: "",
		openEdit: false,
		openSubmit: false
	};

	onChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	onSubmit = e => {
		const { id, body } = this.state;
		const { editComment } = this.props;
		const details = {
			id,
			body,
			timestamp: Date.now()
		};
		this.setState({
			openEdit: false
		});
		editComment(details);
		e.preventDefault();
	};

	toggleEditComment = (id, body) => {
		this.setState({
			id,
			body,
			openEdit: !this.state.openEdit
		});
	};

	render() {
		const {
			id,
			author,
			body,
			voteScore,
			timestamp,
			updateVoteComment,
			deleteComment
		} = this.props;
		return (
			<div className="comments">
				<div className="comment-options">
					<button
						onClick={e => {
							this.toggleEditComment(id, body);
						}}
					>
						Edit comment
					</button>
					<button onClick={e => deleteComment(id)}>Delete</button>
				</div>
				{this.state.openEdit && this.state.id === id ? (
					<CommentEditForm
						body={this.state.body}
						onChange={this.onChange}
						onSubmit={this.onSubmit}
					/>
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
	}
}

const mapDispatchToProps = dispatch => ({
	fetchComments: id => dispatch(fetchComments(id)),
	updateVoteComment: (id, option) => dispatch(updateVoteComment(id, option)),
	editComment: details => dispatch(editComment(details)),
	deleteComment: id => dispatch(deleteComment(id))
});

export default connect(null, mapDispatchToProps)(Comment);