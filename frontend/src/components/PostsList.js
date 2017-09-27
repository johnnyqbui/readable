import React from 'react';
import moment from 'moment';
import TiArrowSortedUp from 'react-icons/lib/ti/arrow-sorted-up';
import TiArrowSortedDown from 'react-icons/lib/ti/arrow-sorted-down';

import { connect } from 'react-redux';
import { fetchPostDetails, upVotes, downVotes } from '../actions';

const PostsList = (props) => {
	const { posts, postDetails, fetchPostDetails, upVotes, downVotes } = props;
	const handleGetPostDetails = (id) => {
		fetchPostDetails(id)
	}

	const handleUpVotes = (id) => {
		upVotes(id)
	}

	const handleDownVotes = (id) => {
		downVotes(id)
	}

	return (
		<div className='posts-list'>
			<div className='posts-header'>
				<h2>Posts</h2>
			</div>
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
	const { postsData, postDetails } = state;
	return {
		posts: postsData.posts,
		postDetails
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchPostDetails: id => dispatch(fetchPostDetails(id)),
	upVotes: id => dispatch(upVotes(id)),
	downVotes: id => dispatch(downVotes(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)