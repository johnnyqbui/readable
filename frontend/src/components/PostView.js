import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Post from "./Post";
import * as CategoryActions from "../actions/CategoryActions";
import * as PostActions from "../actions/PostActions";

class PostView extends Component {
	state = {
		sortedPosts: [],
		selectedSort: ""
	};

	componentDidMount() {
		const { fetchPosts, fetchCategoryPosts } = this.props;
		const urlCategoryParam = this.props.match.params.category;
		urlCategoryParam === "all"
			? fetchPosts()
			: fetchCategoryPosts(urlCategoryParam);
	}

	sortByDate(posts, selectedSort) {
		const tempPost = posts.sort((a, b) => {
			if (a.timestamp < b.timestamp) {
				return 1;
			}

			if (a.timestamp > b.timestamp) {
				return -1;
			}

			return 0;
		});

		this.setState({
			sortedPosts: tempPost,
			selectedSort
		});
	}

	sortByScore(posts, selectedSort) {
		const tempPost = posts.sort((a, b) => {
			if (a.voteScore < b.voteScore) {
				return 1;
			}

			if (a.voteScore > b.voteScore) {
				return -1;
			}

			return 0;
		});

		this.setState({
			sortedPosts: tempPost,
			selectedSort
		});
	}

	clearSortedPosts = () => {
		this.setState({
			sortedPosts: [],
			selectedSort: ""
		});
	};

	render() {
		const { isFetching, fetchedPosts } = this.props;
		const { sortedPosts, selectedSort } = this.state;
		const posts = fetchedPosts !== sortedPosts ? fetchedPosts : sortedPosts;
		return (
			<div className="posts-list">
				<div className="posts-header">
					<h2>Posts</h2>
					<Link className="submitBtn" to="/submit">
						Submit New Post
					</Link>
					<button
						className={selectedSort === "byScore" ? "sortIsActive sortBtn" : "sortBtn"}
						value="byScore"
						onClick={e => this.sortByScore(posts, e.target.value)}>
						Sort By Highest Votes
					</button>
					<button
						className={selectedSort === "byDate" ? "sortIsActive sortBtn" : "sortBtn"}
						value="byDate"
						onClick={e => this.sortByDate(posts, e.target.value)}>
						Sort By Latest Posts
					</button>
				</div>
				{isFetching
					? ""
					: posts.map(
							({ id, author, category, title, body, voteScore, timestamp }) => (
								<Post
									key={id}
									id={id}
									author={author}
									category={category}
									title={title}
									body={body}
									voteScore={voteScore}
									timestamp={timestamp}
									clearSortedPosts={this.clearSortedPosts}
								/>
							)
						)}
			</div>
		);
	}
}

const mapStateToProps = ({ postData }) => {
	return {
		fetchedPosts: postData.posts,
		isFetching: postData.isFetching
	};
};

export default withRouter(connect(
	mapStateToProps,
	{
		...CategoryActions,
		...PostActions
	}
)(PostView));
