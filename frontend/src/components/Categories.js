import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryData } from '../actions';

class Categories extends Component {
	render() {
		const { categories, selectedCategory } = this.props;
		return (
			<div className='categories'>
				<h2>Categories</h2>
				<ul>
				{categories.length && categories.map((category, i) => {
					return (
						<li
							key={i}
							className={ category.name === selectedCategory ? 'isActive' : ''}
							onClick={e => this.props.onClick(category.name)}
						>
							{category.name}
						</li>
					)
				})}
				</ul>
			</div>
		)
	}
}

// Passing state as props, from reducers
const mapStateToProps = (state) => {
	const { categoryData, selectedCategory } = state;
	return {
		categories: categoryData.categories,
		selectedCategory: selectedCategory.category
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCategoryData: (category) => dispatch(fetchCategoryData(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)