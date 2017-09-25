import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryData, pushToHistory } from '../actions';

class Categories extends Component {
	componentWillReceiveProps(nextProps) {
		const prevCategory = this.props.router.location.pathname
		const nextCategory = nextProps.router.location.pathname
		if (prevCategory !== nextCategory) {
			const category = nextCategory.substring(1)
			this.props.fetchCategoryData(category)
		}
	}

	componentDidMount() {
		const { selectedCategory, fetchCategoryData } = this.props;
		const categoryPathname = this.props.router.location.pathname
		const category = categoryPathname ? categoryPathname.substring(1) : selectedCategory.category;
		fetchCategoryData(category)
	}

	handleCategoryClick = (category) => {
		this.props.fetchCategoryData(category)
		this.props.pushToHistory(category)
	}

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
							onClick={e => this.handleCategoryClick(category.name)}
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
	const { categoryData, selectedCategory, router } = state;
	return {
		categories: categoryData.categories,
		selectedCategory: selectedCategory.category,
		router
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCategoryData: (category) => dispatch(fetchCategoryData(category)),
	pushToHistory: (category) => dispatch(pushToHistory(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)