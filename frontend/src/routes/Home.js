import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';
import { connect } from 'react-redux';
import { fecthInitialData, fetchCategoryData, pushToHistory } from '../actions';

class Home extends Component {
	componentDidMount() {
		const category = this.props.match.params.category
		? this.props.match.params.category
		: this.props.selectedCategory.category;

		this.props.fecthInitialData()
		this.props.fetchCategoryData(category)
		this.props.pushToHistory(category)
	}

	handleCategoryClick = (category) => {
		this.props.fetchCategoryData(category)
		this.props.pushToHistory(category)
	}

	render() {
		const { categoryData, postsData, selectedCategory } = this.props;
		return (
			<div className='main'>
				<Categories
					categories={ categoryData.categories }
					selectedCategory={ selectedCategory.category }
					onSelect={ this.handleCategoryClick }
				/>
				{ postsData.isFetching ? <h2>Loading...</h2>
					: <PostsList posts={ postsData.posts } /> }
			</div>
		)
	}
}

// Passing state as props, from reducers
const mapStateToProps = (state) => {
	const { categoryData, postsData, selectedCategory } = state;
	return {
		categoryData,
		postsData,
		selectedCategory
	}
}

const mapDispatchToProps = (dispatch) => ({
	fecthInitialData: () => dispatch(fecthInitialData()),
	fetchCategoryData: (category) => dispatch(fetchCategoryData(category)),
	pushToHistory: (category) => dispatch(pushToHistory(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)