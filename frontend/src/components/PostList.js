import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import TiArrowSortedUp from "react-icons/lib/ti/arrow-sorted-up";
import TiArrowSortedDown from "react-icons/lib/ti/arrow-sorted-down";
import CommentList from "./CommentList";
import PostEditForm from "./PostEditForm";
import {
	fetchComments,
	updateVotePost,
	editPost,
	deletePost,
	showDetails,
	hideDetails
} from "../actions";

class PostList extends Component {
	state = {
		id: null,
		title: "",
		body: "",
		edit: false
	};

	componentDidMount() {
		const urlPostParam = this.props.match.params.post
		if (urlPostParam) {
			this.showMoreDetails(urlPostParam)
		}
	}

	handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleEditPost = (id, title, body) => {
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
		const { fetchComments, showDetails } = this.props;
		this.setState({
			id,
			edit: false
		});
		fetchComments(id);
		showDetails();
	};

	showLessDetails = () => {
		const { hideDetails } = this.props;
		this.setState({
			edit: false
		});
		hideDetails();
	};

	render() {
		const { postList, updateVotePost, deletePost, postVisibility } = this.props;
		const currentCategory = this.props.match.params.category;
		return (
			<div>
				{postList.map(({ id, author, title, body, voteScore, timestamp }) => {
					return (
						<div className="posts" key={id}>
							{id === this.state.id && postVisibility ? (
								<div className="post-options">
									<Link to={`/${currentCategory}/`} onClick={e => this.showLessDetails()}>
										Less
									</Link>
									<button onClick={e => this.handleEditPost(id, title, body)}>
										Edit Post
									</button>
									<button onClick={e => deletePost(id)}>Delete</button>
								</div>
							) : (
							<div className="post-options">
								<Link
									to={`${id}`}
									onClick={e => this.showMoreDetails(id)}>
									More
								</Link>
							</div>
							)}
							{id === this.state.id && this.state.edit ? (
								<PostEditForm
									title={this.state.title}
									body={this.state.body}
									onChange={this.handleChange}
									onSubmit={this.handleSubmit}
								/>
							) : (
								<div>
									<p className="post-title">{title}</p>
									<div className='post-details'>
										{id === this.state.id && postVisibility && (
											<div className='post-body'>{body}</div>
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
									{id === this.state.id && postVisibility && (
										<CommentList />
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { postData, postVisibility } = state;
	return {
		postList: postData.posts,
		postVisibility
	};
};

const mapDispatchToProps = dispatch => ({
	fetchComments: id => dispatch(fetchComments(id)),
	updateVotePost: (id, option) => dispatch(updateVotePost(id, option)),
	editPost: details => dispatch(editPost(details)),
	deletePost: id => dispatch(deletePost(id)),
	showDetails: () => dispatch(showDetails()),
	hideDetails: () => dispatch(hideDetails())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostList));