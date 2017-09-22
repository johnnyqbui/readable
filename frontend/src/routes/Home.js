import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import * as ReadableApi from '../utils/ReadableApi';

class Home extends Component {
	componentDidMount() {
		this.props.fetchPosts()
	}

	render() {
		const { isFetching, posts } = this.props;
		return (
			isFetching ? <h2>Loading...</h2>
			: <PostsList posts={ posts } />
		)
	}
}

// Passing state as props, from reducers
const mapStateToProps = ({isFetching, posts}) => ({
	isFetching,
	posts
})

const mapDispatchToProps = (dispatch) => ({
	fetchPosts: () => dispatch(fetchPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)