import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';

import { connect } from 'react-redux';
import { fetchInfo } from '../actions';

class Home extends Component {
	componentDidMount() {
		this.props.fetchInfo()
	}

	render() {
		const { categoryData, postsData } = this.props;
		return (
			<div>
				<Categories categories={ categoryData.categories }/>
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
	fetchInfo: () => dispatch(fetchInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)