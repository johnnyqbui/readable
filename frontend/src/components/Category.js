import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchCategoryPosts, hideDetails } from "../actions";

const Category = props => {
	const { categories, onClickCategory } = props;
	const urlCategoryParam = props.match.params.category;

	const handleClickCategory = selectedCategory => {
		const { fetchCategoryPosts, hideDetails } = props;
		hideDetails();
		selectedCategory === "all"
			? fetchCategoryPosts()
			: fetchCategoryPosts(selectedCategory);
	};

	return (
		<div className='categoriesList'>
			{categories.map(({ name }, i) => (
				<Link
					to={`/${name}`}
					key={i}
					onClick={e => handleClickCategory(name)}
					className={name === urlCategoryParam ? "isActive" : ""}
				>
					{name}
				</Link>
			))}
		</div>
	);
};

// Passing state as props, from reducers
const mapStateToProps = state => {
	const { categoryData } = state;
	return {
		categories: categoryData.categories
	};
};

const mapDispatchToProps = dispatch => ({
	hideDetails: () => dispatch(hideDetails()),
	fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Category)
);