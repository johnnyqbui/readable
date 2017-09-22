import React from 'react';

const PostsList = (props) => {
	const { posts } = props;
	return (
		<div className='posts-list'>
			<ul>
				{posts && posts.map((post) =>
					<li>{post.voteScore} {post.title}</li>
				)}
			</ul>
		</div>
	)
}

export default PostsList