import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';

import { connect } from 'react-redux';
import { fecthInitialData, selectedCategory } from '../actions';

class Home extends Component {
	componentDidMount() {
		this.props.fecthInitialData()
	}

	handleCategoryClick = (category) => {
		this.props.selectedCategory(category)
	}

	render() {
		const { categoryData, postsData } = this.props;
		return (
			<div>
				<Categories
					categories={ categoryData.categories }
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
	const { categoryData, postsData } = state;
	return {
		categoryData,
		postsData
	}
}

const mapDispatchToProps = (dispatch) => ({
	fecthInitialData: () => dispatch(fecthInitialData()),
	selectedCategory: (category) => dispatch(selectedCategory(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)