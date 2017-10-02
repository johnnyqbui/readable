import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PostsList from "../components/PostsList";
import Categories from "../components/Categories";
import { connect } from "react-redux";
import {
	fetchPosts,
	fetchCategoryPosts,
	handleSelectedCategory
} from "../actions";

class Home extends Component {
	componentDidMount() {
		// Fetch initial data
		const {
			fetchPosts,
			fetchCategoryPosts,
			handleSelectedCategory,
			categories
		} = this.props;
		const categoryParams = this.props.match.params.category;
		handleSelectedCategory(categoryParams)
		!categoryParams || categoryParams === "all"
			? fetchPosts()
			: fetchCategoryPosts(categoryParams);
	}

	render() {
		const { postData } = this.props;
		return (
			<div className="main">
				<Route path="/:category?" component={Categories} />
				<Route path="/:post" render={() =>
						postData.isFetching ? <h2>Loading...</h2> : <PostsList />}
				/>
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { postData, categoryData } = state;
	return {
		postData,
		categories: categoryData.categories
	};
};

const mapDispatchToProps = dispatch => ({
	fetchPosts: () => dispatch(fetchPosts()),
	fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category)),
	handleSelectedCategory: category => dispatch(handleSelectedCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);