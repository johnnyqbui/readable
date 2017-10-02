import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Post from "./Post";

import {
	fetchPosts,
	fetchCategories,
	fetchCategoryPosts,
	handleSelectedCategory,
	hideDetails
} from "../actions";

class Categories extends Component {
	componentDidMount() {
		const { categories, fetchPosts, fetchCategoryPosts, fetchCategories, handleSelectedCategory } = this.props;
		const urlCategoryParam = this.props.match.params.category;
		fetchCategories();
		handleSelectedCategory(urlCategoryParam)
		if (urlCategoryParam !== "all") {
			fetchCategoryPosts(urlCategoryParam);
		}
	}

	handleClickCategory = (selectedCategory) => {
		const {
			fetchPosts,
			fetchCategories,
			fetchCategoryPosts,
			handleSelectedCategory,
			hideDetails
		} = this.props;
		handleSelectedCategory(selectedCategory);
		hideDetails()
		selectedCategory === "all"
			? fetchPosts()
			: fetchCategoryPosts(selectedCategory);
	}

	render() {
		const { categories, selectedCategory } = this.props;
		return (
			<div className="categories">
				<h2>Categories</h2>
				<ul>
					{categories.length &&
						categories.map((category, i) => {
							return (
							<Link to={`/${category.name}`} key={i}>
								<li
									className={
										category.name === selectedCategory ? "isActive" : ""
									}
									onClick={e => {
										this.handleClickCategory(category.name);
									}}
								>
									{category.name}
								</li>
							</Link>
							);
						})}
				</ul>
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { categoryData, selectedCategory } = state;
	return {
		categories: categoryData.categories,
		...selectedCategory
	};
};

const mapDispatchToProps = dispatch => ({
	fetchPosts: () => dispatch(fetchPosts()),
	fetchCategories: () => dispatch(fetchCategories()),
	fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category)),
	handleSelectedCategory: category => dispatch(handleSelectedCategory(category)),
	hideDetails: () => dispatch(hideDetails())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));