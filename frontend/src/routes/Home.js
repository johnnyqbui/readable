import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsList from '../components/PostsList';
import Categories from '../components/Categories';
import { connect } from 'react-redux';
import { fecthInitialData, fetchCategoryData, } from '../actions';
import SubmitPost from '../routes/SubmitPost';

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
		const { postListData } = this.props;
		return (
			<div className='main'>
				<Categories onClickUpdateHistory={ this.handleUpdateHistory }/>
				<Switch>
					<Route path='/submit' component={SubmitPost} />
					<Route render={() => postListData.isFetching
						? <h2>Loading...</h2>
						: <PostsList />
					} />
				</Switch>
			</div>
		)
	}
}

// Passing state as props, from reducers
const mapStateToProps = (state) => {
	const { postListData } = state;
	return { postListData }
}

const mapDispatchToProps = (dispatch) => ({
	fecthInitialData: () => dispatch(fecthInitialData()),
	fetchCategoryData: category => dispatch(fetchCategoryData(category)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)