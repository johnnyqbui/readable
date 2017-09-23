import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';

import { connect } from 'react-redux';
import { fetchInfo } from '../actions';

import * as ReadableApi from '../utils/ReadableApi';

class Home extends Component {
	componentDidMount() {
		this.props.fetchInfo()
	}

	render() {
		const { categories, allPosts } = this.props;
		return (
			<div>
				<Categories categories={ categories }/>
				{ allPosts.isFetching ? <h2>Loading...</h2>
					: <PostsList posts={ allPosts.posts } /> }
			</div>
		)
	}
}

// Passing state as props, from reducers
const mapStateToProps = (state) => {
	const { categories, allPosts } = state;
	return {
		categories,
		allPosts
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchInfo: () => dispatch(fetchInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)