import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Post from "./Post";

import { fetchPosts } from "../actions";

class PostList extends Component {
	componentDidMount() {
		const { fetchPosts } = this.props;
		const urlCategoryParam = this.props.match.params.category;
		if (urlCategoryParam === "all") {
			fetchPosts();
		}
	}

	render() {
		const { postData, isFetching } = this.props;
		return (
			<div className="posts-list">
				<h2 className="posts-header">Posts</h2>
				<Link to="/submit">Submit New Post</Link>
				{isFetching ? <h2>Loading...</h2> : <Post /> }
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { postData } = state;
	return {
		postData,
		isFetching: postData.isFetching,
	};
};

const mapDispatchToProps = dispatch => ({
	fetchPosts: () => dispatch(fetchPosts())
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PostList)
);