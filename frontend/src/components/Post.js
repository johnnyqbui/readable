import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TiArrowSortedUp from 'react-icons/lib/ti/arrow-sorted-up';
import TiArrowSortedDown from 'react-icons/lib/ti/arrow-sorted-down';
import { fetchPostDetails, postUpVotes, postDownVotes } from '../actions';

class PostsList extends Component {
	state = {
		title: '',
  		body: '',
  		edit: false
	}
	handleGetPostDetails = (id) => {
		const { fetchPostDetails } = this.props;
		fetchPostDetails(id)
	}

	handleUpVotes = (id) => {
		const { postUpVotes } = this.props;
		postUpVotes(id)
	}

	handleDownVotes = (id) => {
		const { postDownVotes } = this.props;
		postDownVotes(id)
	}

	handleEditPost = (id) => {
		this.setState({
			edit: true
		})
	}

	render() {
		const { postList, postDetails } = this.props;
		return (
			{postList && postList.map((post, i) =>
				<div
					className='posts'
					key={i}
					onClick={e => this.handleGetPostDetails(post.id)}
				>
					<button onClick={e => this.handleEditPost(post.id)}>Edit Post</button>
					<p className='post-title'>{post.title}</p>
					<p>{post.id === postDetails.id ? postDetails.body : ''}</p>
					<p>{post.id}</p>
					<span><em>{post.author}</em> posted at {moment(post.timestamp).format('MMM-DD-YYYY hh:mm A').toString()}</span>
					<div>
						<TiArrowSortedUp className='vote-icon' onClick={e => this.handleUpVotes(post.id)} />
						{post.id === postDetails.id ? postDetails.voteScore : post.voteScore }
						<TiArrowSortedDown className='vote-icon' onClick={e => this.handleDownVotes(post.id)} />
					</div>
				</div>
			)}
		)
	}
}

// Passing state as props, from reducers
const mapStateToProps = (state) => {
	const { postListData, postDetails } = state;
	return {
		postList: postListData.posts,
		postDetails
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchPostDetails: id => dispatch(fetchPostDetails(id)),
	postUpVotes: id => dispatch(postUpVotes(id)),
	postDownVotes: id => dispatch(postDownVotes(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)