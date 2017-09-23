import React from 'react';
import moment from 'moment';

const PostsList = (props) => {
	const { posts } = props;
	return (
		<div className='posts-list'>
			<ul>
				{posts && posts.map((post) =>
					<li>
						<span>{post.voteScore} </span> {post.title} - {post.category}<br/>
						<span>{post.author} at {moment(post.timestamp)}</span>
					</li>
				)}
			</ul>
		</div>
	)
}

export default PostsList