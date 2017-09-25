import React from 'react';
import moment from 'moment';

const PostsList = (props) => {
	const { posts } = props;
	return (
		<div className='posts-list'>
			<div className='posts-header'>
				<h2>Posts</h2>
			</div>
			<ul>
				{posts && posts.map((post, i) =>
					<li key={i}>
						<span>{post.voteScore} </span> {post.title}<br/>
						<span><em>{post.author}</em> posted at {moment(post.timestamp).format('MMM-DD-YYYY hh:mm A').toString()}</span>
					</li>
				)}
			</ul>
		</div>
	)
}

export default PostsList