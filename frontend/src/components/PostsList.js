import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TiArrowSortedUp from 'react-icons/lib/ti/arrow-sorted-up';
import TiArrowSortedDown from 'react-icons/lib/ti/arrow-sorted-down';
import { fetchPostDetails, postUpVotes, postDownVotes, putEditPost } from '../actions';

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

	handleEditPost = (post) => {
		const { id, title, body } = post;
		console.log(this.props.postDetails)
		this.setState({
			id: this.props.postDetails.id,
			title: this.props.postDetails.title,
			body: this.props.postDetails.body,
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

	handleSubmit = (e) => {
		const { id, title, body } = this.state;
	  	const details = {
	  		id,
	  		title,
	  		body
	  	}
	    this.props.putEditPost(details)
	    e.preventDefault();
	    this.setState({
	    	edit: false
	    })
	 }

	render() {
		const { postList, postDetails } = this.props;
		return (
			<div className='posts-list'>
				<h2 className='posts-header'>Posts</h2>
				<Link to='/submit'>Create New Post</Link>
				{postList && postList.map((post, i) =>
					<div
						className='posts'
						key={i}
						onClick={e => {
							this.handleGetPostDetails(post.id)}
						}
					>
						<button onClick={e => this.handleEditPost(post)}>Edit Post</button>
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
							 	<p>{post.id === postDetails.id ? postDetails.body : ''}</p>
							 </div>
						}
						<p>{post.id}</p>
						<span><em>{post.author}</em> posted at {moment(post.timestamp).format('MMM-DD-YYYY hh:mm A').toString()}</span>
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
	fetchPostDetails: id => dispatch(fetchPostDetails(id)),
	postUpVotes: id => dispatch(postUpVotes(id)),
	postDownVotes: id => dispatch(postDownVotes(id)),
	putEditPost: details => dispatch(putEditPost(details))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)