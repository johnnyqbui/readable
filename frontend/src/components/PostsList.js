import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPostDetails, postUpVotes, postDownVotes, postNewPost } from '../actions';
import moment from 'moment';
import TiArrowSortedUp from 'react-icons/lib/ti/arrow-sorted-up';
import TiArrowSortedDown from 'react-icons/lib/ti/arrow-sorted-down';

const PostsList = (props) => {
	const { posts, postDetails, fetchPostDetails, postUpVotes, postDownVotes } = props;
	const handleGetPostDetails = (id) => {
		fetchPostDetails(id)
	}

	const handleUpVotes = (id) => {
		postUpVotes(id)
	}

	const handleDownVotes = (id) => {
		postDownVotes(id)
	}

	const handleNewPost = (details) => {
		postNewPost(details)
	}

	return (
		<div className='posts-list'>
			<h2 className='posts-header'>Posts</h2>
			<Link to='/submit'>Create New Post</Link>
			{posts && posts.map((post, i) =>
				<div
					className='posts'
					key={i}
					onClick={e => handleGetPostDetails(post.id)}
				>
					<p className='post-title'>{post.title}</p>
					<p>{post.id === postDetails.id ? postDetails.body : ''}</p>
					<span><em>{post.author}</em> posted at {moment(post.timestamp).format('MMM-DD-YYYY hh:mm A').toString()}</span>
					<div>
						<TiArrowSortedUp className='vote-icon' onClick={e => handleUpVotes(post.id)} />
						{post.id === postDetails.id ? postDetails.voteScore : post.voteScore }
						<TiArrowSortedDown className='vote-icon' onClick={e => handleDownVotes(post.id)} />
					</div>
				</div>
			)}
		</div>
	)
}

// Passing state as props, from reducers
const mapStateToProps = (state) => {
	const { postListData, postDetails } = state;
	return {
		posts: postListData.posts,
		postDetails
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchPostDetails: id => dispatch(fetchPostDetails(id)),
	postUpVotes: id => dispatch(postUpVotes(id)),
	postDownVotes: id => dispatch(postDownVotes(id)),
	postNewPost: details => dispatch(postNewPost(details))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)