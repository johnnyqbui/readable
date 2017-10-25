import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import TiArrowSortedUp from "react-icons/lib/ti/arrow-sorted-up";
import TiArrowSortedDown from "react-icons/lib/ti/arrow-sorted-down";
import Comment from "./Comment";
import PostEditForm from "./PostEditForm";
import CommentSubmitForm from './CommentSubmitForm'

import {
	fetchComments,
	updateVotePost,
	editPost,
	deletePost,
	showDetails,
	hideDetails
} from "../actions";

class Post extends Component {
	state = {
		title: "",
		body: "",
		edit: false,
		commentLengthObj: {}
	};

	componentWillReceiveProps(nextProps) {
		// Get comment length after comments have been fetched
		this.getCommentLength(nextProps)
	}

	componentDidMount() {
		const { fetchComments, id, clearSortedPosts } = this.props;
		const urlPostParam = this.props.match.params.post;
		// Clear sorted posts on mount
		clearSortedPosts()

		// fetch each id's comments to get comment length
		fetchComments(id)

		// if url post id params is present
		if (urlPostParam) {
			this.showMoreDetails(urlPostParam);
		}
	}

	componentWillUnmount() {
		// When clicking to another category, hide post details to prevent
		// showing up again when remounting
		const { hideDetails, clearSortedPosts } = this.props;
		hideDetails()

		// Clear sorted posts on unmount
		clearSortedPosts()
	}

	getCommentLength = props => {
		if (props.comments.length && props.id === props.comments[0].parentId) {
			this.setState({
				commentLengthObj: {
					...this.state.commentLengthObj,
					[props.id]: props.comments.length
				}
			})
		}

		// If comment length is at zero after deletion, then put comment length to zero
		if (props.comments.length === 0 && this.state.commentLengthObj[props.id] === 1) {
			this.setState({
				commentLengthObj: {
					...this.state.commentLengthObj,
					[props.id]: 0
				}
			})
		}
	}

	showMoreDetails = id => {
		const { showDetails, fetchComments } = this.props;
		this.setState({
			edit: false
		});
		fetchComments(id);
		showDetails(id);
	};

	showLessDetails = id => {
		const { hideDetails } = this.props;
		this.setState({
			edit: false
		});
		fetchComments(id);
		hideDetails();
	};

	editPost = (id, title, body) => {
		this.setState({
			title,
			body,
			edit: !this.state.edit
		});
	};

	onChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	onSubmit = e => {
		const { title, body } = this.state;
		const { currentPostId, editPost } = this.props;
		const details = {
			id: currentPostId,
			title,
			body
		};
		this.setState({
			edit: false
		});
		editPost(details);
		e.preventDefault();
	};

	render() {
		const {
			id,
			author,
			category,
			title,
			body,
			voteScore,
			timestamp,
			updateVotePost,
			deletePost,
			currentPostId,
			comments,
		} = this.props;
		const currentCategory = this.props.match.params.category;
		const { commentLengthObj } = this.state;
		return (
			<div>
				<div className="posts" key={id}>
					{id === currentPostId ? (
						<div className="post-options">
							<Link
								to={`/${currentCategory}/`}
								onClick={() => this.showLessDetails(id)}
							>
								Less
							</Link>
							<button onClick={e => this.editPost(id, title, body)}>
								Edit Post
							</button>
							<button onClick={e => deletePost(id)}>Delete</button>
						</div>
					) : (
						<div className="post-options">
							<Link to={`${id}`} onClick={() => this.showMoreDetails(id)}>
								{commentLengthObj[id]
									? `More (${commentLengthObj[id]})`
									: `More (0)`}
							</Link>
						</div>
					)}
					{id === currentPostId && this.state.edit ? (
						<PostEditForm
							title={this.state.title}
							body={this.state.body}
							onChange={this.onChange}
							onSubmit={this.onSubmit}
						/>
					) : (
						<div>
							<p className="post-title">{title} - <em>{category}</em></p>
							<div className="post-details">
								{id === currentPostId && (
									<div className="post-body">{body}</div>
								)}
								<span>
									<em>{author}</em> posted at{" "}
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
											return updateVotePost(id, option);
										}}
									/>
									{voteScore}
									<TiArrowSortedDown
										className="vote-icon"
										onClick={e => {
											const option = "downVote";
											return updateVotePost(id, option);
										}}
									/>
								</div>
							</div>
							{id === currentPostId &&
								<div className="comments-list">
									<CommentSubmitForm />
									{comments.map(({ parentId, id, author, body, voteScore, timestamp }) =>
										<Comment
											key={id}
											parentId={parentId}
											id={id}
											author={author}
											body={body}
											voteScore={voteScore}
											timestamp={timestamp}
										/>
									)}
								</div>
							}
						</div>
					)}
				</div>
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { postData, commentData } = state;
	return {
		currentPostId: postData.currentPostId,
		comments: commentData.comments,
	};
};

const mapDispatchToProps = dispatch => ({
	fetchComments: id => dispatch(fetchComments(id)),
	updateVotePost: (id, option) => dispatch(updateVotePost(id, option)),
	editPost: details => dispatch(editPost(details)),
	deletePost: id => dispatch(deletePost(id)),
	showDetails: id => dispatch(showDetails(id)),
	hideDetails: () => dispatch(hideDetails())
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Post)
);