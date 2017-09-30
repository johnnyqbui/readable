import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import TiArrowSortedUp from "react-icons/lib/ti/arrow-sorted-up";
import TiArrowSortedDown from "react-icons/lib/ti/arrow-sorted-down";
import {
	postUpVotes,
	postDownVotes,
	putEditPost,
	deletePost,
	toggleVisibility
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
		const { putEditPost } = this.props;
		const details = {
			id,
			title,
			body
		};
		this.setState({
			edit: false
		});
		putEditPost(details);
		e.preventDefault();
	};

	render() {
		const {
			postList,
			postUpVotes,
			postDownVotes,
			deletePost,
			toggleVisibility
		} = this.props;
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
							timestamp,
							isVisible
						} = post;
						return (
							<div className="posts" key={i}>
								<button onClick={e => toggleVisibility(id)}>More</button>

								{isVisible ? (
									<div className="post-options">
										<button onClick={e => this.handleEditPost(post)}>Edit Post</button>
										<br />
										<button onClick={e => deletePost(id)}>Delete</button>
									</div>
								) : (
									""
								)}
								{this.state.edit && this.state.id === id ? (
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
										<p>{isVisible ? body : ""}</p>
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
										onClick={e => postUpVotes(id)}
									/>
									{voteScore}
									<TiArrowSortedDown
										className="vote-icon"
										onClick={e => postDownVotes(id)}
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
	postUpVotes: id => dispatch(postUpVotes(id)),
	postDownVotes: id => dispatch(postDownVotes(id)),
	putEditPost: details => dispatch(putEditPost(details)),
	deletePost: id => dispatch(deletePost(id)),
	toggleVisibility: id => dispatch(toggleVisibility(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);