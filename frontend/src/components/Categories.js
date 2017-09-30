import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	fetchPosts,
	fetchCategories,
	fetchCategoryPosts,
	handleSelectedCategory
} from "../actions";

class Categories extends Component {
	componentDidMount() {
		const { fetchCategories } = this.props;
		fetchCategories();
	}

	handleClickCategory(selectedCategory) {
		const {
			fetchPosts,
			fetchCategories,
			fetchCategoryPosts,
			handleSelectedCategory
		} = this.props;
		handleSelectedCategory(selectedCategory);
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
								<Link key={i} to={`${category.name}`}>
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
	handleSelectedCategory: category => dispatch(handleSelectedCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);