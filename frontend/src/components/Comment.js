import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import TiArrowSortedUp from "react-icons/lib/ti/arrow-sorted-up";
import TiArrowSortedDown from "react-icons/lib/ti/arrow-sorted-down";
import CommentEditForm from "./CommentEditForm";
import * as actions from "../actions/CommentActions";

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
					<button onClick={() => this.toggleEditComment(id, body)}>
						Edit comment
					</button>
					<button onClick={() => deleteComment(id)}>Delete</button>
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
						onClick={() => {
							const option = "upVote";
							return updateVoteComment(id, option);
						}}
					/>
					{voteScore}
					<TiArrowSortedDown
						className="vote-icon"
						onClick={() => {
							const option = "downVote";
							return updateVoteComment(id, option);
						}}
					/>
				</div>
			</div>
		);
	}
}

export default connect(null, actions)(Comment);