import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
	fetchCategories,
	fetchCategoryPosts,
	selectCategory
} from "../actions";

class Category extends Component {
	componentDidMount() {
		const { fetchCategories } = this.props;
		fetchCategories();
	}

	handleClickCategory = selectedCategory => {
		const { fetchCategoryPosts, selectCategory } = this.props;
		selectedCategory === "all"
			? fetchCategoryPosts()
			: fetchCategoryPosts(selectedCategory);
		selectCategory(selectedCategory);
	};

	render() {
		const { categories } = this.props;
		const urlCategoryParam = this.props.match.params.category;
		return (
			<div className="categories">
				<h2>Categories</h2>
				<div className="categoriesList">
					{categories.map(({ name }, i) => (
						<Link
							to={`/${name}/`}
							key={i}
							onClick={e => this.handleClickCategory(name)}
							className={name === urlCategoryParam ? "categoryIsActive" : ""}
						>
							{name}
						</Link>
					))}
				</div>
			</div>
		);
	}
}

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { categoryData } = state;
	return {
		categories: categoryData.categories
	};
};

const mapDispatchToProps = dispatch => ({
	fetchCategories: () => dispatch(fetchCategories()),
	fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category)),
	selectCategory: category => dispatch(selectCategory(category))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Category)
);