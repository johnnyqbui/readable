import React from 'react';
import { connect } from 'react-redux';

class Submit extends React.Component {
  state = {
  	author: 'Author name here',
  	title: 'Title here',
  	body: 'Please write an essay about your favorite DOM element.',
  	selectedCategory: ''
  };

  handleChange = (e) => {
  	const name = e.target.name;
  	const value = e.target.value;
  	this.setState({
  		[name]: value,
  		selectedCategory: value
  	})
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.body);
    event.preventDefault();
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
		          		name='body'
		          		value={this.state.body}
		          		onChange={this.handleChange}
	          		/>
	        	</label>
	        	<br/>

	        	{ selectedCategory === 'all'
		        	? <label>
			          	Category:
			          	<select value={this.state.selectedCategory} onChange={this.handleChange}>
			          		{categories.map((category, i) =>
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

export default connect(
  mapStateToProps,
)(Submit)

