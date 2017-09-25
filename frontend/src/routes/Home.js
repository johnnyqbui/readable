import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';

import { connect } from 'react-redux';
import { fecthInitialData, fetchCategoryData } from '../actions';

class Home extends Component {
	componentDidMount() {
		this.props.fecthInitialData()
	}

	handleCategoryClick = (category) => {
		this.props.fetchCategoryData(category)
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
	fetchCategoryData: (category) => dispatch(fetchCategoryData(category))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)