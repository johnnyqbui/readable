import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';

import * as ReadableApi from '../utils/ReadableApi';
import { addPost, removePost } from '../actions'

class App extends Component {
  async componentDidMount() {
    const CatsData = await ReadableApi.getCats();
    const PostsData = await ReadableApi.getPosts();
    console.log(CatsData)
    console.log(PostsData)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Posts and Comments</h2>
        </div>
      </div>
    );
  }
}

// Passing state as props, from reducers
const mapStateToProps = ({ calendar }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)