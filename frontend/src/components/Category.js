import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../actions/CategoryActions";

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
							onClick={() => this.handleClickCategory(name)}
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
const mapStateToProps = ({ categoryData }) =>({
	categories: categoryData.categories
});

export default withRouter(
	connect(mapStateToProps, actions)(Category)
);