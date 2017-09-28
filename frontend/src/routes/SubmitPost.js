import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { postNewPost } from '../actions';

class Submit extends React.Component {
  state = {
  	author: '',
  	title: '',
  	body: '',
  	category: ''
  };

  handleChange = (e) => {
  	const name = e.target.name;
  	const value = e.target.value;
  	const category = name === 'category' ? value : '';
  	this.setState({
  		[name]: value,
  		category
  	})
  }

  handleSubmit = (e) => {
  	const details = {
  		...this.state,
  		id: uuid(),
  		timestamp: Date.now()
  	}
    this.props.postNewPost(details)
    e.preventDefault();
  }

  render() {
  	const { categories, selectedCategory } = this.props;
    return (
	    <div className='form'>
	    	<h3>Submit a Post</h3>
	    	<form onSubmit={this.handleSubmit}>
	    		<label>
		          	Author:
		          	<input
		          		name='author'
		          		type="text"
		          		value={this.state.author}
		          		onChange={this.handleChange}
		          	/>
		        </label>
		        <br/>
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
		          		value={this.state.body}
		          		onChange={this.handleChange}
	          		/>
	        	</label>
	        	<br/>
	        	{ selectedCategory === 'all'
		        	? <label>
			          	Category:
			          	<select name='category' value={this.state.category} onChange={this.handleChange}>
			          		<option disabled value=''></option>
			          		{categories.map((category, i) =>  category.name === 'all' ? '' :
			          			<option key={i} value={category.name}>{category.name}</option>
			          		)}
			          	</select>
			          </label>
		          	: <label>
		          		Category: { selectedCategory }
		          	  </label>
		         }

	        	<br/>
	        	<input type="submit" value="Submit" />
	    	</form>
	    </div>
    );
  }
}


// Passing state as props, from reducers
const mapStateToProps = (state) => {
	const { categoryData, selectedCategory } = state;
	return {
		categories: categoryData.categories,
		selectedCategory: selectedCategory.category
	}
}

const mapDispatchToProps = (dispatch) => ({
	postNewPost: (details) => dispatch(postNewPost(details))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Submit)

