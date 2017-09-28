import React from 'react';
import { connect } from 'react-redux';
import { handleSelectedCategory } from '../actions'

const Categories = (props) => {
	const { categories, selectedCategory, onClickUpdateHistory, handleSelectedCategory } = props;
	return (
		<div className='categories'>
			<h2>Categories</h2>
			<ul>
			{categories.length && categories.map((category, i) => {
				return (
					<li
						key={i}
						className={ category.name === selectedCategory ? 'isActive' : ''}
						onClick={e => {
							onClickUpdateHistory(category.name)
							handleSelectedCategory(category.name)
						}}
					>
						{category.name}
					</li>
				)
			})}
			</ul>
		</div>
	)
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
	handleSelectedCategory: (category) => dispatch(handleSelectedCategory(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)