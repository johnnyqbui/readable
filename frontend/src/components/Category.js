import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CategoryList from "./CategoryList";

import { fetchCategories, fetchCategoryPosts } from "../actions";

class Category extends Component {
	componentDidMount() {
		const { fetchCategoryPosts, fetchCategories } = this.props;
		const urlCategoryParam = this.props.match.params.category;
		fetchCategories();
		fetchCategoryPosts(urlCategoryParam);
	}
	render() {
		return (
			<div className="categories">
				<h2>Categories</h2>
				<CategoryList />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchCategories: () => dispatch(fetchCategories()),
	fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category)),
});

export default withRouter(connect(null, mapDispatchToProps)(Category));