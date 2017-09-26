import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';
import { connect } from 'react-redux';
import { fecthInitialData, fetchCategoryData, } from '../actions';

class Home extends Component {
	componentWillReceiveProps(nextProps) {
		// handle history parems
		const prevCategory = this.props.match.params.category
		const nextCategory = nextProps.match.params.category
		if (prevCategory !== nextCategory) {
			this.props.fetchCategoryData(nextCategory)
		}
	}
	componentDidMount() {
		// Handle initial data load if params exist
		const { fecthInitialData, fetchCategoryData } = this.props;
		const categoryParams = this.props.match.params.category
		fecthInitialData()

		if (categoryParams) { fetchCategoryData(categoryParams) }
	}

	handleUpdateHistory = (category) => {
		this.props.history.push(category)
	}

	render() {
		const { postsData } = this.props;
		return (
			<div className='main'>
				<Categories onClickUpdateHistory={ this.handleUpdateHistory }/>
				{ postsData.isFetching ? <h2>Loading...</h2>
					: <PostsList /> }
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
	fecthInitialData: () => dispatch(fecthInitialData()),
	fetchCategoryData: category => dispatch(fetchCategoryData(category)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)