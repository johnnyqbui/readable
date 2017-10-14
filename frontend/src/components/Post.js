import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PostList from "./PostList";
import { fetchPosts } from "../actions";

class Post extends Component {
	componentDidMount() {
		const { fetchPosts } = this.props;
		const urlCategoryParam = this.props.match.params.category;
		if (urlCategoryParam === "all") {
			fetchPosts();
		}
	}

	render() {
		const { isFetching } = this.props;
		return (
			<div className="posts-list">
				<div className="posts-header">
					<h2>Posts</h2>
					<Link className='submitBtn' to="/submit">Submit New Post</Link>
				</div>
				{isFetching ? <h2>Loading...</h2> : <PostList /> }
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
	connect(mapStateToProps, mapDispatchToProps)(Post)
);