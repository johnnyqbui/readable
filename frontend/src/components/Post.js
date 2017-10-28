import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import moment from "moment";
import TiArrowSortedUp from "react-icons/lib/ti/arrow-sorted-up";
import TiArrowSortedDown from "react-icons/lib/ti/arrow-sorted-down";
import PostEditForm from "./PostEditForm";
import Comment from "./Comment";
import CommentSubmitForm from "./CommentSubmitForm";
import * as PostActions from "../actions/PostActions";
import * as CommentActions from "../actions/CommentActions";

class Post extends Component {
	state = {
		title: "",
		body: "",
		edit: false,
		commentLengthObj: {}
	};

	componentWillReceiveProps(nextProps) {
		// Get comment length after comments have been fetched
		this.getCommentLength(nextProps);
	}

	componentDidMount() {
		const { match, id, getPostDetails, fetchComments, clearSortedPosts } = this.props;
		const urlPostParam = match.params.post;
		// Clear sorted posts on mount
		clearSortedPosts();

		// fetch each id's comments to get comment length
		fetchComments(id);

		// if url post id params is present
		if (urlPostParam) {
			// Check if post exists
			getPostDetails(urlPostParam)
			this.showPostDetails(urlPostParam);
		}
	}

	componentWillUnmount() {
		// When clicking to another category, hide post details to prevent
		// showing up again when remounting
		const { hideDetails, clearSortedPosts } = this.props;
		hideDetails();

		// Clear sorted posts on unmount
		clearSortedPosts();
	}

	getCommentLength = props => {
		if (props.comments.length && props.id === props.comments[0].parentId) {
			this.setState({
				commentLengthObj: {
					...this.state.commentLengthObj,
					[props.id]: props.comments.length
				}
			});
		}

		// If comment length is at zero after deletion, then put comment length to zero
		if (
			props.comments.length === 0 &&
			this.state.commentLengthObj[props.id] === 1
		) {
			this.setState({
				commentLengthObj: {
					...this.state.commentLengthObj,
					[props.id]: 0
				}
			});
		}
	};

	showPostDetails = id => {
		const { showDetails, fetchComments } = this.props;
		this.setState({
			edit: false
		});
		fetchComments(id);
		showDetails(id);
	};

	hidePostDetails = id => {
		const { hideDetails } = this.props;
		this.setState({
			edit: false
		});
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

	onDelete = id => {
		const { deletePost, history, match } = this.props;
		const urlCategoryParam = match.params.category;
		deletePost(id);
		history.replace(`/${urlCategoryParam}`)
	}

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
			match,
			id,
			author,
			category,
			title,
			body,
			voteScore,
			timestamp,
			updateVotePost,
			currentPostId,
			postError,
			comments
		} = this.props;
		const urlCategoryParam = match.params.category;
		const { commentLengthObj } = this.state;
		return (
			<div>
				{postError && <Redirect to="/404" />}
				<div className="posts" key={id}>
					{id === currentPostId ? (
						<div className="post-options">
							<Link
								to={`/${urlCategoryParam}/`}
								onClick={() => this.hidePostDetails(id)}
							>
								Hide
							</Link>
							<button onClick={() => this.editPost(id, title, body)}>
								Edit Post
							</button>
							<button onClick={() => this.onDelete(id)}>Delete</button>
						</div>
					) : (
						<div className="post-options">
							<Link to={`/${category}/${id}`} onClick={() => this.showPostDetails(id)}>
								Show
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
							<p className="post-title">
								{title} - <em>{category}</em>
							</p>
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
								<div className="post-subInfo">
									<TiArrowSortedUp
										className="vote-icon"
										onClick={() => {
											const option = "upVote";
											return updateVotePost(id, option);
										}}
									/>
									{voteScore}
									<TiArrowSortedDown
										className="vote-icon"
										onClick={() => {
											const option = "downVote";
											return updateVotePost(id, option);
										}}
									/>
									<p>
										{commentLengthObj[id]
											? `Comments (${commentLengthObj[id]})`
											: `Comments (0)`}
									</p>
								</div>
							</div>
							{id === currentPostId && (
								<div className="comments-list">
									<CommentSubmitForm />
									{comments.map(
										({ parentId, id, author, body, voteScore, timestamp }) => (
											<Comment
												key={id}
												parentId={parentId}
												id={id}
												author={author}
												body={body}
												voteScore={voteScore}
												timestamp={timestamp}
											/>
										)
									)}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = ({ postData, commentData }) => ({
	currentPostId: postData.currentPostId,
	postError: postData.error,
	comments: commentData.comments
});

export default withRouter(
	connect(mapStateToProps, {
		...PostActions,
		...CommentActions
	})(Post)
);