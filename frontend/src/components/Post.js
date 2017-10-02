import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import TiArrowSortedUp from "react-icons/lib/ti/arrow-sorted-up";
import TiArrowSortedDown from "react-icons/lib/ti/arrow-sorted-down";
import CommentsList from "./CommentsList";

import {
	fetchComments,
	updateVotePost,
	editPost,
	deletePost
} from "../actions";

class Post extends Component {
	state = {
		id: null,
		title: "",
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

	handleEditPost = post => {
		const { id, title, body } = post;
		this.setState({
			id,
			title,
			body,
			edit: !this.state.edit
		});
	};

	handleSubmit = e => {
		const { id, title, body } = this.state;
		const { editPost } = this.props;
		const details = {
			id,
			title,
			body
		};
		this.setState({
			edit: false
		});
		editPost(details);
		e.preventDefault();
	};

	showMoreDetails = id => {
		const { fetchComments } = this.props;
		this.setState({
			id
		})
		fetchComments(id)
	}

	showLessDetails = () => {
		this.setState({
			id: null
		})
	}

	// pushToHistory = id => {
	// 	const categoryParam = this.props.match.url;
	// 	const locationPathname = this.props.location.pathname;
	// 	console.log(this.props)
	// 	this.props.history.push(`/${categoryParam}/${id}`)
	// }

	render() {
		const {
			postList,
			updateVotePost,
			deletePost
		} = this.props;
		const currentPath = this.props.match.url;
		return (
			<div>
				{postList &&
					postList.map((post, i) => {
						const {
							id,
							author,
							title,
							body,
							voteScore,
							timestamp
						} = post;
						return (
							<div className="posts" key={i}>
								{id === this.state.id ? (
									<div className="post-options">
										<button onClick={e => this.showLessDetails()}>Less</button>
										<br />
										<button onClick={e => this.handleEditPost(post)}>Edit Post</button>
										<br />
										<button onClick={e => deletePost(id)}>Delete</button>
									</div>
								) : (
									<Link to={`${currentPath}/${id}`} onClick={e =>
										this.showMoreDetails(id)
									}>More</Link>
								)}
								{id === this.state.id && this.state.edit ? (
									<form onSubmit={this.handleSubmit} autoComplete="off">
										<label>
											Title:
											<input
												name="title"
												type="text"
												value={this.state.title}
												onChange={this.handleChange}
											/>
										</label>
										<br />
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
										<p className="post-title">{title}</p>
										{id === this.state.id ? (
											<div>
												<p>{body}</p>
												<CommentsList />
											</div>
										) : (
											""
										)}
									</div>
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
						);
					})}
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { postData } = state;
	return {
		postList: postData.posts
	};
};

const mapDispatchToProps = dispatch => ({
	fetchComments: id => dispatch(fetchComments(id)),
	updateVotePost: (id, option) => dispatch(updateVotePost(id, option)),
	editPost: details => dispatch(editPost(details)),
	deletePost: id => dispatch(deletePost(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));