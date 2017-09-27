import React from 'react';
import moment from 'moment';
import MdStar from 'react-icons/lib/md/star';

import { connect } from 'react-redux';
import { fetchPostDetails, updateVotes } from '../actions';

const PostsList = (props) => {
	const { posts, postDetails, fetchPostDetails, updateVotes } = props;
	const handleGetPostDetails = (id) => {
		fetchPostDetails(id)
	}

	const handleUpdateVotes = (id) => {
		updateVotes(id)
	}

	return (
		<div className='posts-list'>
			<div className='posts-header'>
				<h2>Posts</h2>
			</div>
			<ul>
				{posts && posts.map((post, i) =>
					<li
						key={i}
						onClick={e => handleGetPostDetails(post.id)}
					>
						<MdStar onClick={e => handleUpdateVotes(post.id)} />
						<span>{post.id === postDetails.id ? postDetails.voteScore : post.voteScore }</span>
						{post.title}<br/>
						<span><em>{post.author}</em> posted at {moment(post.timestamp).format('MMM-DD-YYYY hh:mm A').toString()}</span>
						<p>{post.id === postDetails.id ? postDetails.body : ''}</p>
					</li>
				)}
			</ul>
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
	updateVotes: id => dispatch(updateVotes(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)