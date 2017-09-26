import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchPostDetails } from '../actions';

const PostsList = (props) => {
	const { posts, postDetails, fetchPostDetails } = props;
	const handleGetPostDetails = (id) => {
		fetchPostDetails(id)
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
						onClick={e => handleGetPostDetails(post.id)}>
						<span>{post.voteScore} </span> {post.title}<br/>
						<span><em>{post.author}</em> posted at {moment(post.timestamp).format('MMM-DD-YYYY hh:mm A').toString()}</span>
						{post.id === postDetails.id ? <p>{postDetails.body}</p> : ''}
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
	fetchPostDetails: id => dispatch(fetchPostDetails(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)