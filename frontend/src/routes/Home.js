import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';
import { connect } from 'react-redux';
import { fecthInitialData, fetchCategoryData, pushToHistory } from '../actions';

class Home extends Component {
	componentDidMount() {
		this.props.fecthInitialData()
	}

	render() {
		const { postsData } = this.props;
		return (
			<div className='main'>
				<Categories />
				{ postsData.isFetching ? <h2>Loading...</h2>
					: <PostsList posts={ postsData.posts } /> }
			</div>
		)
	}
}

// Passing state as props, from reducers
const mapStateToProps = (state) => {
	const { postsData } = state;
	return { postsData }
}

const mapDispatchToProps = (dispatch) => ({
	fecthInitialData: () => dispatch(fecthInitialData())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)