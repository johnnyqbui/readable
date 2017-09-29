import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TiArrowSortedUp from 'react-icons/lib/ti/arrow-sorted-up';
import TiArrowSortedDown from 'react-icons/lib/ti/arrow-sorted-down';
import { fetchPosts, fetchPostDetails, postUpVotes, postDownVotes, putEditPost, deletePost } from '../actions';

class PostsList extends Component {
	state = {
		id: null,
		title: '',
  		body: '',
  		edit: false
	}
	handleOpenPosts = (id) => {
		const { fetchPostDetails } = this.props;
		this.setState({
			id,
			edit: false
		})
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

	handleEditPost = (post) => {
		const { id, title, body } = post;
		this.setState({
			id,
			title,
			body,
			edit: !this.state.edit
		})
	}

	handleChange = (e) => {
		const name = e.target.name;
	  	const value = e.target.value;
		this.setState({
	  		[name]: value
	  	})
	}

	handleDeletePost = (id) => {
		const { fetchPosts, deletePost } = this.props;
		deletePost(id)
		fetchPosts()
	}

	handleSubmit = (e) => {
		const { id, title, body } = this.state;
		const { fetchPosts, putEditPost } = this.props;
	  	const details = {
	  		id,
	  		title,
	  		body
	  	}
	    this.setState({
			edit: false
		})
	    putEditPost(details)
		e.preventDefault();
	 }

	render() {
		const { postList, postDetails } = this.props;
		return (
			<div className='posts-list'>
				<h2 className='posts-header'>Posts</h2>
				<Link to='/submit'>Submit New Post</Link>
				{postList && postList.map((post, i) =>
					<div className='posts' key={i}>
						<button onClick={e => this.handleOpenPosts(post.id)}>Open</button>
						<br/>
						<button onClick={e => this.handleDeletePost(post.id)}>Delete</button>
						{post.id === postDetails.id ? <button onClick={e => this.handleEditPost(post)}>Edit Post</button> : ''}
						{this.state.edit && post.id === postDetails.id
							? <form onSubmit={this.handleSubmit}>
								<label>
						          	Title:
						          	<input
						          		name='title'
						          		type="text"
						          		value={this.state.title}
						          		onChange={this.handleChange}
						          	/>
						        </label>
						        <br/>
						        <label>
						          	Body:
						          	<textarea
		          						style={{'width': 300, 'height': 100}}
						          		name='body'
						          		type="text"
						          		value={this.state.body}
						          		onChange={this.handleChange}
						          	/>
						        </label>
						        <br/>
						        <input type="submit" value="Submit" />
							</form>
							: <div>
								<p className='post-title'>{post.title}</p>
							 	<p>{post.id === postDetails.id ? post.body : ''}</p>
							 </div>
						}
						<span><em>{post.author}</em> posted at {moment(post.timestamp).format('MMM-DD-YYYY hh:mm A').toString()}</span>
						<br/>
						<div>
							<TiArrowSortedUp className='vote-icon' onClick={e => this.handleUpVotes(post.id)} />
							{post.id === postDetails.id ? postDetails.voteScore : post.voteScore }
							<TiArrowSortedDown className='vote-icon' onClick={e => this.handleDownVotes(post.id)} />
						</div>
					</div>
				)}
			</div>
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
	postUpVotes: id => dispatch(postUpVotes(id)),
	postDownVotes: id => dispatch(postDownVotes(id)),
	putEditPost: details => dispatch(putEditPost(details)),
	fetchPostDetails: id => dispatch(fetchPostDetails(id)),
	deletePost: id => dispatch(deletePost(id)),
	fetchPosts: () => dispatch(fetchPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)