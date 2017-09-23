import React from 'react';
import moment from 'moment';

const PostsList = (props) => {
	const { posts } = props;
	return (
		<div className='posts-list'>
			<ul>
				{posts && posts.map((post, i) =>
					<li key={i}>
						<span>{post.voteScore} </span> {post.title} - <strong>{post.category}</strong><br/>
						<span><em>{post.author}</em> posted at {moment(post.timestamp).format('MMM-DD-YYYY hh:mm A').toString()}</span>
					</li>
				)}
			</ul>
		</div>
	)
}

export default PostsList